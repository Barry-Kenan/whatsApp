import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function logout(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const post = await axios.post(process.env.NEXT_DB + "/login", {});
        if (post.status == 201) {
            res.status(200).json({ success: true });
        }
    } catch (error) {
        res.json({ message: "unauthorized" });
    }
}
