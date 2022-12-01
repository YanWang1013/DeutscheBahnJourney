import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const jsonBody = JSON.parse(req.body);
    const response = await fetch(`https://v5.db.transport.rest/locations?poi=false&addresses=false&query=${jsonBody.searchTerm}`);
    // const response = await fetch(`https://v5.db.transport.rest/locations?query=${jsonBody.searchTerm}`);
    const json = await response.json();
    res.json(json);
}
