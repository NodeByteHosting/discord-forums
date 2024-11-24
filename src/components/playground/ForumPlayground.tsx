import React from 'react';
import { generatePlayground } from '@/utils/playground/generate';

interface Thread {
  title: string;
  description: string;
  tags: string[];
  replies: number;
  timeAgo: string;
  avatar?: string;
}

interface ForumSVGProps {
  threads: Thread[];
}

/**
 * This component renders a SVG representation of a discord forum with threads.
 * @param threads The threads to render.
 * @returns The SVG representation of the forum.
 */
const ForumSVG: React.FC<ForumSVGProps> = ({ threads }) => {
  const svgContent = generatePlayground(threads);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgContent }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
      }}
    />
  );
};

export default ForumSVG;