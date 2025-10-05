import React from "react";
import styles from "./DownloadSection.module.css";

const DownloadSection: React.FC = () => {
  return (
    <section className={styles.downloadSection}>
      <h2>Want to dive in?</h2>
      <p>
        We're still busy perfecting the first version, hang tight and keep
        checking back here for when it's released.
      </p>
      <div className={styles.comingSoon}>
        Coming soon to <i>i</i>OS
      </div>
    </section>
  );
};

export default DownloadSection;
