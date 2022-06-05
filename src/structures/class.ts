export class DBGuild {
    id: string
    logChannel: string
    members: DBguildMember[]
    blacklist: {
        channels: string[]
        users: string[]
    }
}

export class DBguildMember {
    id: string
    exp: number
    level: number
}

export class DBModeration {
    id: number
    blacklist: {
        guild: string[]
        users: string[]
    }
}