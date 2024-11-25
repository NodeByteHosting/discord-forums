export interface Thread {
    title: string;
    description: string;
    tags: string[];
    replies: number;
    timeAgo: string;
    avatar?: string;
}