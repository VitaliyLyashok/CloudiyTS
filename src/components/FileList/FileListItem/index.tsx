import React, { FC } from "react";
import { IProps } from "./index.types";
import styles from "./index.module.scss";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderIcon from "@mui/icons-material/Folder";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import APIRoutes from "utils/APIRoutes";
import { Link } from "react-router-dom";

const FileListItem: FC<IProps> = ({
  id,
  name,
  isFile,
  isDeleted,
  isNoticed,
  onToggleProperty,
  onShareFile,
  onFolderOpen,
  preventDeleteIcon,
  onDeleteFolder,
  onDeleteFile
}) => {
  const handleDownloadClick  = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const handleButtonClick = (handler: Function, toggleValue?: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handler(id, toggleValue);
  };

  const handleDeleteClick  = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isFile) {
      isDeleted ? onDeleteFile(id) : handleButtonClick(onToggleProperty, APIRoutes.ToggleDelete)(e);
    } else {
      handleButtonClick(onDeleteFolder)(e);
    }
  };

  const renderButton = (icon: JSX.Element, handler: (e: React.MouseEvent<HTMLButtonElement>) => void, className: string, toggleValue?: string) => (
    <button
      onClick={handler}
      data-toggle={toggleValue}
      className={`${styles.btnGroup} ${className}`}
    >
      {icon}
    </button>
  );


  



  return (
    <>
      <div onClick={() => onFolderOpen(id, isFile)} className={styles.fileListItem}>
        <div className={styles.fileAndIconWrapper}>
          <div className={styles.fileFolderIconWrapper}>
            {isFile ? <InsertDriveFileIcon /> : <FolderIcon />}
          </div>
          <span className={styles.fileName}>{name}</span>
        </div>
        <div className={styles.iconButtons}>
          {isFile ? (
            <>
              {renderButton(<ShareIcon />, handleButtonClick(onShareFile), styles.shareBtn)}
              <a
                onClick={handleDownloadClick}
                href={`${APIRoutes.DownloadFile}/${id}`}
                className={`${styles.btnGroup} ${styles.downloadBtn}`}
              >
                <DownloadIcon />
              </a>
              {renderButton(
              <StarIcon />,
              handleButtonClick(onToggleProperty, APIRoutes.ToggleNoticed),
              isNoticed ? styles.noticedBtnActive : styles.noticedBtn
            )}
            </>
          ) : null}
          {isDeleted && renderButton(<RestoreFromTrashIcon/>, handleButtonClick(onToggleProperty, APIRoutes.ToggleDelete), styles.restoreBtn)}
          {preventDeleteIcon ? <></> : renderButton(<DeleteIcon/>, handleDeleteClick, styles.deleteBtn)}
        </div>
      </div>
    </>
  );
};

export default FileListItem;


