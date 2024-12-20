import { db } from "../pgClient";
import { ExtendedPost } from "@/types/database";

export const getPostsByPage = async (pageNumber: number): Promise<ExtendedPost[]> => {
    const limit = 20;
    const offset = (pageNumber - 1) * limit

    const posts = await db.post.findMany({
        skip: offset,
        take: limit + 1,
        where: { isIndexed: true },
        orderBy: { createdAt: 'desc' },
        include: {
            user: {
                select: {
                    username: true,
                    avatarUrl: true
                }
            },
            messages: {
                select: {
                    id: true
                },
            },
        },
    });

    return posts.map((post) => ({
        ...post,
        hasAnswer: post.messages.length > 0,
        messagesCount: post.messages.length
    }));
};