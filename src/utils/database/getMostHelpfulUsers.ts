import { db } from "../pgClient";

export const getMostHelpfulUsers = async () => {
    const users = await db.user.findMany({
        select: {
            id: true,
            username: true,
            avatarUrl: true,
            answersCount: true,
            isPublic: true,
            snowflakeId: true,
        },
        orderBy: [
            { answersCount: 'desc' },
            { id: 'desc' }
        ],
        take: 15
    });

    return users;
};