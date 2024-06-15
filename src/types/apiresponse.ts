import { Message } from "@/model/User";

export interface apiResponse {
    sucess: boolean;
    message: string;
    isAcceptingMessage?: boolean;
    messages?: [Message];

}