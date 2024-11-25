import { LayoutWithSidebar } from '@/components/layouts/layout-with-sidebar';
import ForumSVG from '@/components/playground/ForumPlayground';
import { threads } from '@/utils/playground/threads';
import Balancer from 'react-wrap-balancer';
import { Thread } from '@/types/thread';
import { ReactNode } from 'react';

type HomeLayoutProps = { children: ReactNode };

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <div className="relative py-16 border-b border-neutral-800 bg-gray-800 overflow-hidden">
        <div className="container max-w-7xl mx-auto flex items-center">
          <div className="flex-1 flex flex-col px-4 space-y-4 z-10 text-center lg:text-left">
            <h2 className="font-semibold text-5xl lg:max-w-2xl leading-[1.1]">
              <Balancer ratio={0.75}>
                The NodeByte Hub for Hosting Discussions and Community Support!
              </Balancer>
            </h2>
            <a
              href="https://discord.gg/nodebyte"
              target="_blank"
              rel="noopener"
              className="mx-auto text-xl text-white w-fit hover:opacity-80 hover:no-underline transition-opacity lg:mx-0"
            >
              Join the server ➔
            </a>
          </div>

          <div
            className="hidden lg:flex absolute top-0 bottom-0 left-1/2"
            style={{
              WebkitMaskImage:
                'linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%)',
              maskImage:
                'linear-gradient(to top, rgba(0, 0, 0, 1.0) 0%, transparent 100%)',
            }}
          >
            <div style={{ padding: '20px', backgroundColor: '#202225', minHeight: '100vh', color: '#ffffff' }}>
              <ForumSVG threads={threads as Thread[]} />
            </div>
          </div>
        </div>
      </div>

      <LayoutWithSidebar>{children}</LayoutWithSidebar>
    </>
  );
}