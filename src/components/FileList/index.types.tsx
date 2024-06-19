import { IFilesData} from "pages/HomePage/index.types";

export interface IProps {
  data: IFilesData[],
  onToggleProperty: (id: string, prop: string) => void,
  onFolderOpen: (id: string, isFile: boolean) =>void,
  onDeleteFolder: (id: string) => void,
  onDeleteFile: (id: string) => void,

}

