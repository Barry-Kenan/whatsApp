import { IMessage } from "@/interfaces/messages.interface";
import { IRNRequest } from "@/interfaces/receiveNotification.interface";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function receiveMessage(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { idInstance, apiTokenInstance, chatId } = req.body;

    try {
        const data = await axios
            .get<string, { data: IRNRequest }>(
                `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
            )
            .then((res) => res.data);
        if (!data) {
            res.json({ message: "новых сообщений нет" });
        } else {
            if (chatId == data.body.senderData.chatId) {
                const body: IMessage = {
                    id: data.body.timestamp,
                    createdAt: data.body.timestamp,
                    text: data.body.messageData.textMessageData.textMessage,
                    isMy: true,
                };
                if (data.body.instanceData.wid != data.body.senderData.chatId) {
                    data.body.senderData.chatId == data.body.senderData.sender
                        ? (body.isMy = false)
                        : body.isMy == true;
                }

                axios.delete(
                    `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${data.receiptId}`
                );

                res.status(200).json({
                    message: "получено сообщение",
                    body,
                });
            } else {
                axios.delete(
                    `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${data.receiptId}`
                );
            }
        }
    } catch (error) {
        res.json({ message: "что-то пошло не так" });
    }
}
