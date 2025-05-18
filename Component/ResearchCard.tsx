"use client";
import { useState } from "react";
import { Image } from "@heroui/image";
import ReadMoreButton from "./ReadMoreButton";
import { ResearchItem } from "@/lib/api";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon"; // 假设已有箭头图标组件

const ResearchCard = ({ area }: { area: ResearchItem }) => {
  return (
    <div className="research-card bg-black border-2 border-white w-[380px] h-[545px] flex flex-col">
      {/* 图片区域 */}
      <div className="p-[33px] pb-0 flex justify-center">
        <Image
          src={area.imageUrl}
          alt={area.title}
          width={314}
          height={314}
          className="object-cover"
        />
      </div>

      {/* 文字+图标区域 */}
      <div className="px-[33px] py-[24px] flex flex-col">
        <div className="flex justify-between items-start">
          <div className="w-[255px]">
            <h3 className="text-white font-gotham-book text-[18px] mb-[17px]">
              {area.title}
            </h3>
            <p className="text-white font-gotham-exlight text-[12px] h-[42px] leading-[1.5]">
              {area.description}
            </p>
          </div>
          <div className="w-[24px] h-[24px] flex items-center justify-center">
            {/* 引入图标 */}
            {area.icon}
          </div>
        </div>
      </div>

      {/* Learn More 按钮 */}
      <div className="px-[33px] flex justify-center mt-[25px]">
        <ReadMoreButton
          href={area.link}
          className="w-[157px] h-[40px] rounded-full border-2 border-white text-white font-gotham-exlight text-[16px] flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white hover:text-black"
        >
          Learn More
          <ArrowRightIcon />
        </ReadMoreButton>
      </div>
    </div>
  );
};

const ResearchSection = ({ researchItems }: { researchItems: ResearchItem[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 3;
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

  return (
    <section className="py-[21px] max-w-[1440px] mx-auto">
      {/* 标题 */}
      <h2 className="text-[50px] font-gotham-black text-center mb-[42px]">RESEARCH</h2>
      
      {/* 描述 */}
      <p className="text-[14px] font-gotham-light text-center mb-[42px] max-w-3xl mx-auto">
        Our lab focuses on advancing building performance, thermal comfort, and sustainability in the context of changing urban environments and climate dynamics.
      </p>
      
      {/* 卡片容器 */}
      <div className="relative">
        {/* 左箭头 */}
        <button
          onClick={handlePrev}
          className="absolute left-[44px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full border-2 border-white flex items-center justify-center text-white z-10 hover:bg-white hover:text-black transition-all"
        >
          ＜
        </button>
        
        {/* 卡片列表 */}
        <div className="flex gap-[29px] overflow-hidden px-[117px]">
          {visibleItems.map((item) => (
            <ResearchCard key={item.id} area={item} />
          ))}
        </div>
        
        {/* 右箭头 */}
        <button
          onClick={handleNext}
          className="absolute right-[44px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full border-2 border-white flex items-center justify-center text-white z-10 hover:bg-white hover:text-black transition-all"
        >
          ＞
        </button>
      </div>
    </section>
  );
};

export default ResearchCard;  