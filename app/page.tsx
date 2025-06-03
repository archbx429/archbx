import React from 'react'
import { ResearchSection } from '@/Component/ResearchCard/ResearchDisplay';
import { getResearchData, ResearchItem } from '@/lib/api';
import TeamComponent from '@/Component/TeamComponent';

// 定义团队数据类型
interface TeamApiData {
  title: string;
  description: string;
  buttonText: string;
  image?: string;
  imagePlaceholderColor?: string;
}

// 获取团队数据的函数
async function getTeamData(): Promise<TeamApiData> {
  return {
    title: "OUR TEAM",                // 修改这里
    description: "Team description",   // 修改这里
    buttonText: "KNOW ABOUT US",      // 修改这里
    image: "https://www.cribelab.org/wp-content/uploads/2025/02/placeholder-1.svg",
    imagePlaceholderColor: "#eee",
  };
}

// 只保留一个 default 导出
export default async function Page() {
  const researchItems: ResearchItem[] = await getResearchData();
  const teamData = await getTeamData();

  return (
    <div className="page-container" style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      {/* 研究部分 */}
      <ResearchSection researchItems={researchItems} />

      {/* 团队部分 */}
      <div style={{ marginTop: 80 }}>
        <TeamComponent
          title={teamData.title}
          description={teamData.description}
          buttonText={teamData.buttonText}
          image={teamData.image}
          imagePlaceholderColor={teamData.image ? undefined : (teamData.imagePlaceholderColor || '#333')}
        />
      </div>
    </div>
  );
}