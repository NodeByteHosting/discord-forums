import { NextApiRequest, NextApiResponse } from 'next'
import { getPostsByPage } from '@/utils/database/getPostsByPage';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    const { page } = req.query;

    if (req.method !== "GET") {
        return res.status(400).send({
            status: "OK",
            message: '[INVALID_METHOD]: please try a valid GET request.',
            code: 400
        })
    }

    const pageNumber = parseInt(page as string, 10) || 1;
    const posts = await getPostsByPage(pageNumber);

    if (posts.length <= 1) return res.status(404).send({
        status: "NOT_FOUND",
        message: "Whoops, looks like we haven't indexed any posts yet, please check back later!",
        code: 404
    });

    return res.status(200).json(posts)
}