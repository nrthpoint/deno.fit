import React, { useEffect, useRef } from "react";
import styles from "./Section.module.css";

interface SectionProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  imagePosition: "left" | "right";
}

const Section: React.FC<SectionProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  imagePosition,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const updateImageScale = () => {
      if (!sectionRef.current || !imgRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate visibility percentage (0 to 1)
      const visibleTop = Math.max(0, -rect.top);
      const visibleBottom = Math.min(rect.height, windowHeight - rect.top);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibilityRatio = visibleHeight / windowHeight;

      // Map visibility ratio to scale (1 to 1.05)
      const scale = 1 + visibilityRatio * 0.05;

      imgRef.current.style.transform = `scale(${Math.min(
        1.05,
        Math.max(1, scale)
      )})`;
    };

    const handleScroll = () => {
      updateImageScale();
    };

    window.addEventListener("scroll", handleScroll);
    updateImageScale(); // Initial update

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sectionClasses = `${styles.section} ${
    imagePosition === "left" ? styles.imageLeft : styles.imageRight
  }`;

  return (
    <section ref={sectionRef} className={sectionClasses}>
      <div className={styles.imageContainer}>
        <img ref={imgRef} src={imageSrc} alt={imageAlt} />
      </div>

      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default Section;
