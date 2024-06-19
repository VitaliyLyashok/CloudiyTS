import { FC, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IFilterMenuItemProps } from "./index.types";
import styles from "./index.module.scss";

const FilterMenuItem: FC<IFilterMenuItemProps> = ({
  id,
  HTTPRoute,
  label,
  icon,
  onFilterSelect,
  activeRoute,
}) => {

  const handleFilterClick = ( HTTPRoute: string) => {
    onFilterSelect(HTTPRoute);
  };


  return (
    <>
      <li
        className={styles.listItem}
        onClick={() => handleFilterClick( HTTPRoute)}
        key={id}
      >
        <div className={activeRoute === HTTPRoute ? styles.linkActive : styles.link }>
          <div className={styles.linkButton}>
            <div className={styles.icon}>{icon}</div>
            <span className={styles.label}>{label}</span>
          </div>
        </div>
      </li>
    </>
  );
};

export default memo(FilterMenuItem);
