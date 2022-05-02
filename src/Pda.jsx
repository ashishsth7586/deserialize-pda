import { useState } from 'react';
import styled from 'styled-components';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { NativeStream, NativeStreamSchema } from './schema';
import { deserializeUnchecked } from 'borsh';

const Wrappepr = styled.div`
    width: auto;
    height: 100vh;
`

const FlexWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`


const DeserializePDA = () => {

    const [pda, setPDA] = useState(null)

    const [deserializedData, setDeserializedData] = useState(null)

    const conn = new Connection(clusterApiUrl("devnet"), "confirmed");

    const handleChange = (e) => {
        e.preventDefault();
        setPDA(e.target.value);
        console.log(e.target.value)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const pdaPubKey = new PublicKey(pda)

        const accountInfo = await conn.getAccountInfo(pdaPubKey, "confirmed")
        const resp = deserializeUnchecked(NativeStreamSchema, NativeStream, accountInfo.data);

        const responseData = {
            start_time: resp.start_time.toString(),
            end_time: resp.end_time.toString(),
            paused: resp.paused.toString(),
            withdraw_limit: resp.withdraw_limit.toString(),
            amount: resp.amount.toString(),
            sender: resp.sender.toString(),
            recipient: resp.recipient.toString(),
            withdrawn: resp.withdrawn.toString(),
            paused_at: resp.paused_at.toString(),
        }

        setDeserializedData(responseData)

    }
    return (
        <Wrappepr>
            <div className="container">
                <FlexWrapper>
                    <div>
                        <form onSubmit={(e) => handleFormSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="pda">Enter PDA address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id='pda'
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                            </div>

                            <button className="btn btn-primary btn-sm mt-3">Deserialize</button>
                        </form>
                        {
                            deserializedData ? (
                                <div className='mt-4'>
                                    <h4>Deserialized Data:</h4>
                                    <hr />
                                    <p>Start Time: {deserializedData.start_time}</p>
                                    <p>End Time: {deserializedData.end_time}</p>
                                    <p>Amount: {deserializedData.amount}</p>
                                    <p>Sender: {deserializedData.sender}</p>
                                    <p>Recipient: {deserializedData.recipient}</p>
                                    <p>Paused: {deserializedData.paused}</p>
                                    <p>Paused At: {deserializedData.paused_at}</p>
                                    <p>withdrawn: {deserializedData.withdrawn}</p>
                                    <hr />
                                </div>
                            ) : ""
                        }
                        <p className='text-muted' style={{ fontSize: "10px" }}>Note: You might get the garbage value of `Paused at` and `Withdrawn` for PDA of earlier version.</p>
                    </div>
                </FlexWrapper>
            </div>
        </Wrappepr>
    )
}

export default DeserializePDA;