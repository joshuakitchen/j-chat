import { type WebSocket } from 'ws';
import { Request } from 'express';
export type Client = WebSocket & {
    id?: string;
    name?: string;
    is_admin?: boolean;
};
export declare const socketHandler: (ws: Client, req: Request) => void;
export default socketHandler;
