import { FC, memo } from "react";
import styles from "./index.module.scss";
import { IProgressBarProps } from "./index.types";

const ProgressBar: FC<IProgressBarProps> = ({userSpace}) => {

  let spaceAvailable = userSpace.spaceAvailable /1024/1024/1024;
  let spaceUsed = `${userSpace.spaceUsed /1024/1024/1024}`;
  let progress = (userSpace.spaceUsed / userSpace.spaceAvailable) * 100;

  return (
    <>
      <div className={styles.progressBar}>
        <label className={styles.storageTitle}>Storage</label>  
        <div className={styles.storageProgressBar}>
          <div style={{width: `${progress}%`}} className={styles.storageProgress}></div>
        </div>
        <span className={styles.storageCapacity}>{spaceUsed.slice(0,3)} GB/ {spaceAvailable} GB</span>
      </div>
    </>
  );
};

export default ProgressBar;
