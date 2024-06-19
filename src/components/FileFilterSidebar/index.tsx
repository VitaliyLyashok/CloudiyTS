import { FC, memo, useState } from "react";
import CreateFolderButton from "./FileManagement/CreateFolderButton";
import UploadFileButton from "./FileManagement/UploadFileButton";
import FilterMenuItem from "./FilterMenuItem";
import { filterMenuButtons } from "./index.config";
import styles from "./index.module.scss";
import ProgressBar from "./ProgressBar";
import { IFileFilterSideBarProps } from "./index.types";
import APIRoutes from "utils/APIRoutes";

const FileFilterSidebar: FC<IFileFilterSideBarProps> = ({
  userSpace,
  onFilterSelect,
}) => {

  const [activeRoute, setActiveRoute] = useState(sessionStorage.getItem('HTTPRoute') || APIRoutes.GetFiles);

  const handleFilterSelect = (HTTPRoute: string) => {
    setActiveRoute(HTTPRoute);
    onFilterSelect(HTTPRoute);
  };

  return (
    <>
      <div className={styles.fileFilterSidebar}>
        <div className={styles.filterMenuWrapper}>
          <ProgressBar userSpace={userSpace} />
          <nav className={styles.navigation}>
            <ul className={styles.list}>
              {filterMenuButtons.map(({ id, HTTPRoute, label, icon }) => {
                return (
                  <FilterMenuItem
                    onFilterSelect={handleFilterSelect}
                    id={id}
                    HTTPRoute={HTTPRoute}
                    activeRoute={activeRoute}
                    label={label}
                    icon={icon}
                  />
                );
              })}
            </ul>
          </nav>
          <div className={styles.fileManagementButtons}>
            <UploadFileButton />
            <CreateFolderButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(FileFilterSidebar);
