import { NextApiRequest, NextApiResponse } from 'next';
import { getMostHelpfulUsers } from '@/utils/database/getMostHelpfulUsers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(400).json({
            status: 'OK',
            message: '[INVALID_METHOD]: please try a valid GET request.',
            code: 400,
        });
    }

    const users = await getMostHelpfulUsers();

    if (!users || users.length <= 1) {
        return res.status(404).send({
            status: 'NOT_FOUND',
            message: 'Whoops, seems like there are no users registered here yet!',
            code: 404
        })
    }

    return res.status(200).json(users);
}