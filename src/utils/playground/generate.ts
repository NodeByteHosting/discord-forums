interface Thread {
  title: string;
  description: string;
  tags: string[];
  replies: number;
  timeAgo: string;
  avatar?: string; // Optional avatar URL for small icons/images
}

export const generatePlayground = (threads: Thread[] = []): string => {
  if (!Array.isArray(threads) || threads.length === 0) {
    return '';
  }

  const width = 800;
  const height = 600;
  const headerHeight = 60;
  const threadHeight = 90;
  const threadSpacing = 10;

  const totalHeight = headerHeight + threads.length * (threadHeight + threadSpacing) + 20;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${totalHeight}" width="${width}" height="${totalHeight}" style="font-family: Arial, sans-serif; background-color: #2c2f33;">
  <!-- Forum Header -->
  <rect x="0" y="0" width="${width}" height="${headerHeight}" fill="#23272a" />
  <text x="20" y="35" fill="#ffffff" font-size="20" font-weight="bold"># community-thoughts</text>

  <!-- Threads Section -->
  ${threads
      .map((thread, index) => {
        const yPosition = headerHeight + threadSpacing + index * (threadHeight + threadSpacing);
        return `
        <!-- Thread Background -->
        <rect x="20" y="${yPosition}" width="${width - 40}" height="${threadHeight}" fill="#2f3136" rx="10" />

        <!-- Thread Title -->
        <text x="40" y="${yPosition + 30}" fill="#ffffff" font-size="16" font-weight="bold">${thread.title}</text>

        <!-- Thread Description -->
        <text x="40" y="${yPosition + 50}" fill="#b9bbbe" font-size="14">${thread.description}</text>

        <!-- Tags -->
        ${thread.tags
            .map(
              (tag, tagIndex) => `
          <rect x="${40 + tagIndex * 80}" y="${yPosition + 60}" width="70" height="20" fill="#5865f2" rx="5" />
          <text x="${75 + tagIndex * 80}" y="${yPosition + 75}" fill="#ffffff" font-size="12" text-anchor="middle">${tag}</text>
        `
            )
            .join('')}

        <!-- Replies and Time Ago -->
        <text x="${width - 200}" y="${yPosition + 50}" fill="#b9bbbe" font-size="14" text-anchor="end">${thread.replies} replies · ${thread.timeAgo}</text>

        ${thread.avatar
            ? `<image href="${thread.avatar}" x="${width - 60}" y="${yPosition + 20}" width="40" height="40" clip-path="circle(20px)" />`
            : ''
          }
      `;
      })
      .join('')}
</svg>`;
};