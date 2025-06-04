import React from "react";
import styles from "./DevelopmentSection.module.css";
import ArrowRightIconSmall from './ResearchCard/icons/ArrowRightIconSmall';

const devItems = [
  {
    title: "H1 TITLE",
    content: "Main Content Main Contentmain Contentmain Contentmain Content",
  },
  {
    title: "H1 TITLE",
    content: "Main Content Main Contentmain Contentmain Contentmain Content",
  },
  {
    title: "H1 TITLE",
    content: "Main Content Main Contentmain Contentmain Contentmain Content",
  },
];

export default function DevelopmentSection() {
  return (
    <section className={styles.developmentSection}>
      <h2 className={styles.heading}>DEVELOPMENT</h2>
      <p className={styles.subheading}>
        Main Content Main Contentmain Contentmain Contentmain Content
      </p>
      <div className={styles.grid}>
        {devItems.map((item, idx) => (
          <div className={styles.card} key={idx}>
            <div className={styles.imagePlaceholder}></div>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.content}>{item.content}</div>
            <button
              className="inline-flex items-center justify-center w-auto max-w-xs px-4 py-3 border border-white text-sm font-medium rounded-4xl text-white hover:bg-white hover:text-black transition-colors duration-200"
            >
              LEARN MORE
              <ArrowRightIconSmall className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        ))}
      </div>
      <div className={styles.bottomButtonWrapper}>
        <a href="/development" className={styles.bottomButton}>
          Discover more our Development
          <ArrowRightIconSmall className={styles.arrowIcon} />
        </a>
      </div>
    </section>
  );
}