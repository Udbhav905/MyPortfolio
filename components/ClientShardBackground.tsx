'use client';

import dynamic from 'next/dynamic';

const ShardBackground = dynamic(() => import('@/components/ShardBackground'), { ssr: false });

export default function ClientShardBackground() {
  return <ShardBackground />;
}
