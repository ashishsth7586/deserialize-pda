// pub start_time: u64,
// pub end_time: u64,
// pub paused: u64,
// pub withdraw_limit: u64,
// pub amount: u64,
// pub sender:   Pubkey,
// pub recipient: Pubkey,
// pub withdrawn: u64,
// pub paused_at: u64

class Stream {
    constructor(properties) {
        Object.keys(properties).map((key) => {
            return (this[key] = properties[key]);
        });
    }
}

export class NativeStream extends Stream { }

export const NativeStreamSchema = new Map([
    [
        NativeStream,
        {
            kind: "struct",
            fields: [
                ["start_time", "u64"],
                ["end_time", "u64"],
                ["paused", "u64"],
                ["withdraw_limit", "u64"],
                ["amount", "u64"],
                ["sender", ["u8", 32]], // "u8" can be omit because each element in fixed size array are assumed to be 1 byte by default.
                ["recipient", ["u8", 32]],
                ["withdrawn", "u64"],
                ["paused_at", "u64"]
            ]
        }
    ]
])