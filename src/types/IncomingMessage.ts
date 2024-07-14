export interface IncomingMessage {
    type: "connectedUsers" | "ping";
    connectedUsers: {[key:string]: string} | undefined;
    sender: string | undefined
}
