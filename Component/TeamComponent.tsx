import React from "react";
import styles from "./TeamComponent.module.css";
import ArrowRightIconSmall from "@/Component/ResearchCard/icons/ArrowRightIconSmall";

interface TeamComponentProps {
  title: string;
  description: string;
  buttonText: string;
  image?: string;
  imagePlaceholderColor?: string;
}

const TeamComponent: React.FC<TeamComponentProps> = ({
  title,
  description,
  buttonText,
  image,
  imagePlaceholderColor,
}) => (
  <div className={styles.container}>
    <div
      className={styles.imageContainer}
      style={{ background: image ? undefined : imagePlaceholderColor || "#eee" }}
    >
      {image ? (
        <img src={image} alt={title} className={styles.image} />
      ) : (
        <span className={styles.imagePlaceholderText}>No Image</span>
      )}
    </div>
    <div className={styles.contentContainer}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-flex items-center justify-center px-6 py-2.5
          border border-white
          rounded-full
          text-sm font-medium text-neutral-200
          bg-transparent
          hover:bg-white hover:text-black
          transition-colors duration-300
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-sky-500
          mt-6 ${styles.teamButton}
        `}
      >
        {buttonText}
        <ArrowRightIconSmall className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
      </a>
    </div>
  </div>
);

export default TeamComponent;