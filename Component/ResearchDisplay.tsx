"use client";

import { useState } from "react";
import NextImage from 'next/image'; // 你可以叫它 NextImage 或其他名字以避免冲突
import { ResearchItem } from "@/lib/api";

 import ReadMoreButton from "./ReadMoreButton"; 
 import ArrowRightIcon from "@/components/icons/ArrowRightIcon"; 
 import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";

 const ReadMoreButton = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => (
  <a href={href} className={`inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-transparent hover:bg-white hover:text-black transition-colors duration-300 ${className}`}>
    {children}
  </a>
);
const ArrowRightIcon = () => <span className="ml-2">→</span>;
const ArrowLeftIcon = () => <span className="mr-2">←</span>;

// 1. ResearchCard 组件 (单个卡片)
const ResearchCard = ({ area }: { area: ResearchItem }) => {
  return (
    <div className="research-card bg-black border border-gray-700 w-[380px] h-[545px] flex flex-col shrink-0 p-6 text-white rounded-md">
      {/* 图片区域 - 根据图片，图片在标题和描述下面 */}
      <div className="image-container w-full h-[250px] bg-gray-800 mb-4 flex items-center justify-center rounded">
        {/* 你可以使用 @heroui/image 或者标准的 <img>标签 */}
        <NextImage
          src={area.imageUrl || "/placeholder-image.svg"} // 提供一个备用图片
          alt={area.title}
          width={330} // 容器宽度减去一些padding
          height={250}
          className="object-contain" // 或 object-cover, 取决于你的图片
        />
        {/* 如果不用 @heroui/image:
        <img
          src={area.imageUrl || "/placeholder-image.svg"}
          alt={area.title}
          className="object-contain w-full h-full"
        /> */}
      </div>

      {/* 文字+图标区域 */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-gotham-book text-xl font-semibold"> {/* 根据图片调整字体 */}
            {area.title}
          </h3>
          <div className="w-6 h-6 flex items-center justify-center shrink-0 ml-2">
            {area.icon || <div className="w-5 h-5 border border-gray-500" /> /* 占位符图标 */}
          </div>
        </div>
        <p className="font-gotham-exlight text-sm text-gray-400 mb-6 leading-relaxed h-[60px] overflow-hidden"> {/* 限制高度并允许溢出隐藏 */}
          {area.description}
        </p>
      </div>

      {/* Learn More 按钮 */}
      <div className="mt-auto"> {/* 将按钮推到底部 */}
        <ReadMoreButton
          href={area.link}
          className="w-full border-2 border-white text-white font-gotham-exlight text-base hover:bg-white hover:text-black"
        >
          Learn More
          <ArrowRightIcon />
        </ReadMoreButton>
      </div>
    </div>
  );
};

// 2. ResearchSection 组件 (整个区域，包括标题、描述、滑动卡片)
export const ResearchSection = ({ researchItems }: { researchItems: ResearchItem[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 3; // 图片中显示3个
  const totalSlides = Math.ceil(researchItems.length / itemsPerPage);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleItems = researchItems.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

  if (!researchItems || researchItems.length === 0) {
    return (
      <section className="py-12 md:py-20 bg-black text-white text-center">
        <p>No research items to display.</p>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* 标题 */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">RESEARCH</h2>
        
        {/* 描述 */}
        <p className="text-base md:text-lg text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Our Lab Focuses On Advancing Building Performance, Thermal Comfort, And Sustainability In The Context Of Changing Urban Environments And Climate Dynamics.
        </p>
        
        {/* 卡片容器和导航 */}
        <div className="relative">
          {/* 左箭头 */}
          {totalSlides > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300"
              aria-label="Previous slide"
            >
              <ArrowLeftIcon /> {/* 或者使用SVG图标 < */}
            </button>
          )}

          {/* 卡片列表 - 使用 flex 和 gap 来排列 */}
          <div className="flex gap-6 md:gap-8 justify-center overflow-hidden px-8 md:px-16"> {/* px 用于给箭头留空间 */}
            {/* 
              这里我们只渲染当前可见的卡片。
              如果你想要一个平滑的 CSS transform 滑动效果，
              你需要渲染所有卡片，并使用 transform: translateX。
              对于分页效果，只渲染可见的卡片更简单。
            */}
            {visibleItems.map((item) => (
              <ResearchCard key={item.id} area={item} />
            ))}
            {/* 如果 visibleItems 不足 itemsPerPage，可以添加占位符来保持布局 */}
            {Array(itemsPerPage - visibleItems.length).fill(null).map((_, index) => (
              <div key={`placeholder-${index}`} className="w-[380px] shrink-0" aria-hidden="true" />
            ))}
          </div>

          {/* 右箭头 */}
          {totalSlides > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300"
              aria-label="Next slide"
            >
              <ArrowRightIcon /> {/* 或者使用SVG图标 > */}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};