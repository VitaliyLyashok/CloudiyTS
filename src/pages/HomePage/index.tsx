import FileFilterSidebar from "components/FileFilterSidebar";
import FileInfo from "components/FileInfo";
import FileList from "components/FileList";
import Footer from "components/Footer";
import Header from "components/Header";
import { FC, memo, useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss";
import axios from "axios";
import APIRoutes from "utils/APIRoutes";
import HTTPservice from "utils/HTTPService";
import { IFilesData } from "./index.types";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";

const Cloudiy: FC = () => {
  useEffect(() => {
    HTTPservice.get(APIRoutes.GetUser).then(() => getFiles().then((res) => setFilesData(res)));
  }, []);
  

  useEffect(() => {
    HTTPservice.get(APIRoutes.GetUser).then((res) => {
      const user = res.data;
      setUserName(user.name);
      setUserSpace({
        spaceAvailable: user.spaceAvaliable,
        spaceUsed: user.spaceUsed,
      });
    });
  }, []);

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userSpace, setUserSpace] = useState({
    spaceAvailable: 0,
    spaceUsed: 0,
  });
  const [filesData, setFilesData] = useState<IFilesData[]>([]);

  const onToggleProperty = useCallback((id: string, property: string) => {
    HTTPservice.post(property, { fileId: id }).then(() => {
      getFiles().then((res) => setFilesData(res));
    });
  },[]);

  const onFolderOpen = useCallback((id: string, isFile: boolean) => {
    isFile ? navigate(`/Home/${id}`) : (() => {
      sessionStorage.setItem("currentFolderId", id);
      getFiles(id).then((res) => setFilesData(res));
    })();
  },[]);

  const onDataSearch = useCallback((searchData: IFilesData[]) => {
    setFilesData(searchData);
  },[]);

  const onDeleteFolder = useCallback((id: string) => {
    HTTPservice.delete(`${APIRoutes.DeleteFolder}/${id}`).then(() => {
      getFiles().then((res) => setFilesData(res));
    });
  },[]);

  const onDeleteFile = useCallback((id: string) => {
    HTTPservice.post(`${APIRoutes.DeleteFile}/${id}`).then(() => {
      getFiles().then((res) => setFilesData(res))
    })

  },[]);

  const onFilterSelect = useCallback((HTTPRoute: string) => {
    sessionStorage.setItem("HTTPRoute", HTTPRoute);
    getFiles("", HTTPRoute).then((res) => setFilesData(res));
  }, []);



  return (
    <>
      <Header resultingData={onDataSearch} userName={userName} />
      <div className={styles.mainPage}>
        <FileFilterSidebar
          onFilterSelect={onFilterSelect}
          userSpace={userSpace}
        />
        <FileList
          data={filesData}
          onToggleProperty={onToggleProperty}
          onFolderOpen={onFolderOpen}
          onDeleteFolder={onDeleteFolder}
          onDeleteFile={onDeleteFile}
        />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default memo(Cloudiy);

export const getFiles = async (id?: string, HTTPRoute?: string) :Promise<IFilesData[]> => {
  const Route = HTTPRoute ? HTTPRoute : sessionStorage.getItem("HTTPRoute");
  const currentFolderId = id ? id : sessionStorage.getItem("currentFolderId");
  if (Route !== APIRoutes.GetFiles && Route !== null) {
      const res: IFilesData[] = await getSelectedFiles(Route);
      return res
  } else {
    const res: IFilesData[] = await getFolderFiles(currentFolderId);
    return res
  }
};

const getFolderFiles = async (id: string | null) :Promise<IFilesData[]> => {
  try {
    const { data } = await HTTPservice.get(APIRoutes.GetFiles, {
      folderId: id,
    });

    const { folderMetadataId, folderFiles, childFolders } = data;

    const files = folderFiles.map((el: object) => ({ ...el, isFile: true }));
    const folders = childFolders.map((el: object) => ({
      ...el,
      isFile: false,
    }));

    if (folderMetadataId) {
      folders.unshift({
        isFile: false,
        name: "...",
        id: folderMetadataId,
        preventDeleteIcon: true,
      });
    }

    const resultingData  = folders.concat(files);
    return resultingData;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getSelectedFiles = async (HTTPRoute: string) => {
  try {
    const { data } = await HTTPservice.get(HTTPRoute);

    const files = data.map((el: IFilesData[]) => {
      return {
        ...el,
        isFile: true,
      };
    });

    return files;
  } catch (e) {}
};
