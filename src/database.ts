export interface message {
    text: string,
    chatroomID: number
}

export interface database {
    saveMessage: (message: message) => string,
    getMessages: (chatroomID: number) => Array<message>
}