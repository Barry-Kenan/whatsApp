import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function logout(
    req: NextApiRequest,
    res: NextApiResponse
) {
    axios.post(process.env.NEXT_DB + "/login", {});

    res.status(200).json({ success: true });
}
