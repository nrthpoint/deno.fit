import React, { useEffect, useRef } from 'react';
import styles from './Section.module.css';
import animationStyles from './Animation.module.css';

interface SectionProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  imagePosition: 'left' | 'right';
  fadeInOnLoad?: boolean;
}

const Section: React.FC<SectionProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  imagePosition,
  fadeInOnLoad = false,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 769);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

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

    window.addEventListener('scroll', handleScroll);
    updateImageScale(); // Initial update

    if (fadeInOnLoad && isMobile) {
      const timer = setTimeout(() => {
        imgRef?.current?.classList.remove(animationStyles.hidden);
      }, 300);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', checkMobile);

        clearTimeout(timer);
      };
    } else {
      imgRef?.current?.classList.remove(animationStyles.hidden);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [fadeInOnLoad, isMobile]);

  const sectionClasses = `${styles.section} ${
    imagePosition === 'left' ? styles.imageLeft : styles.imageRight
  }`;

  const imgClasses = `${styles.image} ${animationStyles.hidden}`;

  return (
    <section ref={sectionRef} className={sectionClasses}>
      <div className={styles.imageContainer}>
        <img
          ref={imgRef}
          src={imageSrc}
          alt={imageAlt}
          className={imgClasses}
        />
      </div>

      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default Section;
