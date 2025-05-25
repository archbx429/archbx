"use client";
import { useState } from "react";
import NextImage from 'next/image';
import { ResearchItem } from "@/lib/api"; // Assuming this path is correct
import { Link } from "@heroui/link";

// Import new Icon components
import ChevronLeftIcon from "@/Component/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/Component/icons/ChevronRightIcon";
import ArrowRightIconSmall from "@/Component/icons/ArrowRightIconSmall"; // For "Learn More"

// Import new UI component
import CircleIconButton from "@/Component/CircleIconButton";

// Updated ReadMoreButton to be outlined and match image
const ReadMoreButton = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => (
  <a
    href={href}
    target="_blank" // Good practice for external links
    rel="noopener noreferrer" // Security for target="_blank"
    className={`
      inline-flex items-center justify-center px-6 py-2.5 // Adjusted padding
      border-2 border-neutral-400     // Lighter border, consistent with card
      rounded-full
      text-sm font-medium text-neutral-200 // Lighter text
      bg-transparent                   // Transparent background
      hover:bg-white hover:text-black  // Hover effect from image
      transition-colors duration-300
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-sky-500
      ${className}
    `}
  >
    {children}
  </a>
);


// 1. ResearchCard Component (Single Card) - Adjusted to match image layout
const ResearchCard = ({ area }: { area: ResearchItem }) => {
  return (
    <div className="research-card bg-black border border-neutral-700 w-[380px] h-[545px] flex flex-col shrink-0 p-6 text-white rounded-lg shadow-md">
      {/* Image Area - Now at the top */}
      <div className="image-container w-full h-[350px] bg-neutral-800 mb-6 flex items-center justify-center rounded-md overflow-hidden">
        <NextImage
          src={area.imageUrl || "/placeholder-image.svg"}
          alt={area.title}
          width={330}
          height={350}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Text + Icon Area */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-gotham-book text-xl font-semibold text-neutral-100">
            {area.title}
          </h3>
          <div className="w-10 h-10 flex items-center justify-center shrink-0 ml-3 mt-1 border border-neutral-600 rounded-sm p-0.5">
            {area.icon || <div className="w-40px h-40px bg-neutral-700" />}
          </div>
        </div>
        <p className="font-gotham-exlight text-sm text-neutral-400 mb-6 leading-relaxed h-[60px] overflow-hidden text-ellipsis">
          {area.description}
        </p>
      </div>

      {/* Learn More Button - MODIFIED SECTION */}
      {/* The parent div for the button. 
          We ensure it takes full width, and then center the button within it.
          Adding 'text-center' is one way to center an inline-flex element,
          or you can make this div a flex container.
      */}
      <div className="mt-auto pt-4 border-t border-neutral-800 text-center"> {/* Added text-center to center the inline-flex button */}
        <Link
          href={area.link}
          className="inline-flex items-center justify-center px-6 py-3 border border-white text-sm font-medium rounded-4xl text-white hover:bg-white hover:text-black transition-colors duration-200 "
        >
          LEARN MORE
          <ArrowRightIconSmall className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
      {/* END OF MODIFIED SECTION */}

    </div>
  );
};


// 2. ResearchSection Component
export const ResearchSection = ({ researchItems }: { researchItems: ResearchItem[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 3;
  const totalSlides = Math.ceil(researchItems.length / itemsPerPage);

  console.log("Research Items:", researchItems); // Debugging line to check items
  if (!researchItems || researchItems.length === 0) {
    return (
      <section className="py-12 md:py-20 bg-black text-white text-center">
        <p>No research items to display.</p>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 uppercase tracking-wider text-neutral-100">
          RESEARCH
        </h2>

        <p className="text-base md:text-lg text-neutral-400 text-center mb-16 max-w-3xl mx-auto font-gotham-exlight leading-relaxed">
          Our Lab focuses on advancing Building Performance, Thermal Comfort, and Sustainability in the context of changing urban environments and cimate dynamics.
        </p>

        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[1200px] overflow-hidden">
              <div
                className="flex gap-6 md:gap-2 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
                  width: `${totalSlides * 100}%`
                }}
              >
                {researchItems.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="w-full min-w-0"
                    style={{ flexBasis: `${100 / (itemsPerPage * totalSlides)}%` }}
                  >
                    <ResearchCard area={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {totalSlides > 1 && (
            <>
              <CircleIconButton
                onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
                ariaLabel="Previous research items"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10"
              >
                <ChevronLeftIcon className="w-6 h-6" strokeWidth={3} />
              </CircleIconButton>

              <CircleIconButton
                onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
                ariaLabel="Next research items"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10"
              >
                <ChevronRightIcon className="w-6 h-6" strokeWidth={3} />
              </CircleIconButton>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// Example usage (assuming you have a Page component or similar)
// export default function MyPage() {
//   const mockResearchItems: ResearchItem[] = [
//     { id: '1', title: 'Building Performance', description: 'Optimizing Energy Efficiency And Environmental Performance Through Innovative Design Strategies.', imageUrl: 'https://via.placeholder.com/330x250/4B5563/FFFFFF?text=Building+Perf', link: '#', icon: null },
//     { id: '2', title: 'Climate Adaptation', description: 'Developing Solutions For Buildings And Cities To Adapt To Future Climate Challenges.', imageUrl: 'https://via.placeholder.com/330x250/4B5563/FFFFFF?text=Climate+Adapt', link: '#', icon: null },
//     { id: '3', title: 'AI & Machine Learning', description: 'Applying Advanced Computational Methods To Optimize Building Design And Operation.', imageUrl: 'https://via.placeholder.com/330x250/4B5563/FFFFFF?text=AI+ML', link: '#', icon: null },
//     { id: '4', title: 'Sustainable Materials', description: 'Researching and implementing eco-friendly materials for construction.', imageUrl: 'https://via.placeholder.com/330x250/4B5563/FFFFFF?text=Materials', link: '#', icon: null },
//   ];
//   return <ResearchSection researchItems={mockResearchItems} />;
// }