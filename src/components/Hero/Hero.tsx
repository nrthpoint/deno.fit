import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const scrollToFirstSection = () => {
    document
      .querySelector('.section.image-left')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      <h1>Deno</h1>
      <p>Personalized fitness insights at your fingertips</p>
      <div className={styles.scrollIndicator} onClick={scrollToFirstSection}>
        <div className={styles.scrollArrow}></div>
      </div>
    </section>
  );
};

export default Hero;
