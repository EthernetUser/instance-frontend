
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const path: string = req.body.path;
    const body = req.body.data !== null ? JSON.stringify(req.body.data) : null;
    const result = await fetch(`http://localhost:8000/api/${path}`, {
        method: req.method,
        body,
        headers:
            req.method !== "GET" ? [["Content-Type", "application/json"]] : [],
    });

    const data = await result.json();

    res.status(data.status).send(data);
}