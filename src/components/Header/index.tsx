import React, { FC, HTMLInputTypeAttribute, memo, useState } from "react";
import styles from "./index.module.scss";
import cloudLogo from "../../assets/images/cloud.png";
import { IHeaderProps } from "./index.types";
import HTTPservice from "utils/HTTPService";
import APIRoutes from "utils/APIRoutes";
import { IFilesData } from "pages/HomePage/index.types";
import { getFiles } from "pages/HomePage";

const Header: FC<IHeaderProps> = ({
  userName,
  resultingData,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      HTTPservice.get(APIRoutes.GetUser).then(() => {
        HTTPservice.post(APIRoutes.Search, { fileName: searchValue }).then(
          (res) => {
            const files = res.data.map((el: IFilesData[]) => {
              return {
                ...el,
                isFile: true,
              };
            });
            searchValue == "" ?  getFiles().then(
              (res: IFilesData[]) => { 
                resultingData(res)
              }
            ) : resultingData(files)
           
          }
        );
      });
    }
  };


  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoAndTitle}>
          <img className={styles.logo} src={cloudLogo} alt="logo image" />
          <h1 className={styles.title}>Cloudiy</h1>
        </div>
        <div className={styles.fileSearch}>
          <input
            value={searchValue}
            onChange={handleChangeSearchValue}
            placeholder="Search..."
            className={styles.fileSearchInput}
            onKeyDown={onSearch}
          />
        </div>
        <div className={styles.userInfo}>
          <p className={styles.username}>{userName}</p>
          <div className={styles.userAvatar}>{userName.charAt(0)}</div>
        </div>
      </header>
    </>
  );
};

export default memo(Header);
