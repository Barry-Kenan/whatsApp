import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function sendMessage(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { idInstance, apiTokenInstance, message, chatId } = req.body;

    const body = {
        chatId,
        message,
    };
    try {
        axios.post(
            `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        res.status(200).json({ message: "отправлено" });
    } catch (error) {
        res.json({ message: "не отправлено" });
    }
}
