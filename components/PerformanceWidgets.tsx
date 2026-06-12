'use client';

import dynamic from 'next/dynamic';

const AiChat = dynamic(() => import('@/components/AiChat'), {
  ssr: false,
  loading: () => null,
});

const BackToTop = dynamic(() => import('@/components/BackToTop'), {
  ssr: false,
  loading: () => null,
});

const ClientShardBackground = dynamic(
  () => import('@/components/ClientShardBackground'),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function PerformanceWidgets() {
  return (
    <>
      <ClientShardBackground />
      <AiChat />
      <BackToTop />
    </>
  );
}
