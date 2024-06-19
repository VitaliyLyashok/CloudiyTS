import { IFilesData } from "pages/HomePage/index.types";

export interface IHeaderProps {
    userName: string,
    resultingData: (searchData: IFilesData[]) => void
}