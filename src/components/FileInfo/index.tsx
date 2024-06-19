import { FC, memo, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Outlet, useParams } from "react-router-dom";
import HTTPservice from "utils/HTTPService";
import APIRoutes from "utils/APIRoutes";
import { IFilesInfoData } from "./index.types";

const FileInfo: FC = () => {
  const [filesInfoData, setFileInfoData] = useState<IFilesInfoData>();

  const params = useParams();

  useEffect(() => {
    HTTPservice.get(`${APIRoutes.GetFileInfo}/${params.id}`).then((res) =>
      setFileInfoData(res.data)
    );
  }, [params.id]);

  const date: Date = new Date(
    filesInfoData?.createdOn ?? "2024-01-01T00:00:00.000Z"
  );

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const formattedDate: string = new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(date);

  const convertBytes = (bytes: number): string => {
    if (bytes < 0) {
        return "Incorrect value";
    }

    const units = [
        { name: "TB", value: 1024 ** 4 },
        { name: "GB", value: 1024 ** 3 },
        { name: "MB", value: 1024 ** 2},
        { name: "kB", value: 1024 },
        { name: "B", value: 1 },
    ];

    for (let i = 0; i < units.length; i++) {
        const unit = units[i];
        if (bytes >= unit.value) {
            const value = bytes / unit.value;
            return `${value.toFixed(2)} ${unit.name}`;
        }
    }

    return `${bytes} B`;
};


  let fileSize = convertBytes(filesInfoData?.weight ?? 0)


  return (
    <>
      <aside className={styles.fileInfo}>
        <div className={styles.fileDetails}>
          <p>Name: {filesInfoData?.name}</p>
          <p>File extension: {filesInfoData?.extension.substring(1)}</p>
          <p>Weight: {fileSize}</p>
          <p>Date of creation: {formattedDate}</p>
        </div>
      </aside>
    </>
  );
};

export default FileInfo;
