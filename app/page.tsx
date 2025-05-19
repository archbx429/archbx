import React from 'react'
import { ResearchSection } from '@/Component/ResearchDisplay';
import { getResearchData, ResearchItem } from '@/lib/api';

export default async function ResearchPage() {
  // 在服务器组件中获取数据
  const researchItems: ResearchItem[] = await getResearchData();

  return (
    <div className="page-container" style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      {/* 你可以在这里添加页面的其他部分，如导航栏等 */}
      
      {/* 渲染 ResearchSection 并传入获取到的数据 */}
      <ResearchSection researchItems={researchItems} />
      
      {/* 页脚等 */}
    </div>
  );
}
