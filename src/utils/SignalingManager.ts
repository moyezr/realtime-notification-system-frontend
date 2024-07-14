
// export const BASE_URL = "wss://ws.backpack.exchange/"
export const BASE_URL = "ws://localhost:8080"

export class SignalingManager {
    private ws: WebSocket;
    private static instance: SignalingManager;
    private bufferedMessages: any[] = [];
    private callbacks: any = {};
    private id: number;
    public initialized: boolean = false;

    private constructor() {
        this.ws = new WebSocket(BASE_URL);
        this.bufferedMessages = [];
        this.id = 1;
        this.init();
    }

    public static getInstance() {
        if (!this.instance)  {
            this.instance = new SignalingManager();
        }
        return this.instance;
    }

    init() {
        this.ws.onopen = () => {
            this.initialized = true;
            this.bufferedMessages.forEach(message => {
                this.ws.send(JSON.stringify(message));
            });
            this.bufferedMessages = [];
        }


        this.ws.onmessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data as string);
            console.log("message", message)
        }
    }
}

