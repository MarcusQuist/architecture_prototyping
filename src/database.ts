export interface message {
    text: string,
    chatroomID: number
}

export interface database {
    saveMessage: (message: message) => Promise<string>,
    getMessages: (chatroomID: number) => Promise<Array<message>>
}