'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AnimateLayoutProps {
  children: React.ReactNode;
}

export function AnimateLayout({ children }: AnimateLayoutProps) {
  const pathname = usePathname();
  const [mainContent, setMainContent] = useState<React.ReactNode>(null);

  // 메인 페이지('/')일 때 컨텐츠 저장
  useEffect(() => {
    if (pathname === '/') {
      setMainContent(children);
    }
  }, [pathname, children]);

  return (
    <>
      {/* 메인 페이지 컨텐츠 */}
      <div className="min-h-screen">
        {pathname === '/' ? children : mainContent}
      </div>
      
      {/* 2depth 페이지는 오버레이로 표시 */}
      {pathname !== '/' && (
        <div
          className="fixed inset-0 z-10 bg-white"
          style={{ 
            height: '100dvh',
            overflowY: 'auto'
          }}
        >
          {children}
        </div>
      )}
    </>
  );
} 