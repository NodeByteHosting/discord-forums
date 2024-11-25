

export interface Attachment {
    contentType?: string;
    id: string;
    messageId: string;
    name: string;
    snowflakeId: string;
    url: string;
    message: Message;
}

export interface Channel {
    id: string;
    name: string;
    snowflakeId: string;
    topic: string;
    type: number;
    posts: Post[];
}

export interface Message {
    content: string;
    createdAt: Date;
    editedAt?: Date;
    id: string;
    postId: string;
    replyToMessageId?: string;
    snowflakeId: string;
    userId: string;
    post: Post;
    user: User;
    attachments: Attachment[];
}

export interface Posts {
    answerId?: string;
    channelId?: string;
    createdAt: Date;
    editedAt?: Date;
    id: string;
    isIndexed: boolean;
    isLocked: boolean;
    lastActiveAt: Date;
    snowflakeId: string;
    title: string;
    userId?: string;
    channel?: Channel;
    user?: User;
    messages: Message[];
}

export interface ExtendedPost extends Post {
    hasAnswer: boolean;
    messagesCount: number;
    user: Pick<User, 'username' | 'avatarUrl'> | null;
    messages: Pick<Message, 'id'>[];
}

export interface User {
    answersCount: number;
    avatarUrl: string;
    discriminator: string;
    id: string;
    isModerator: boolean;
    isPublic: boolean;
    points: number;
    snowflakeId: string;
    username: string;
    joinedAt?: Date;
    posts: Post[];
    messages: Message[];
}