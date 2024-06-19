export interface IProps {
  id: string;
  name: string;
  isFile: boolean;
  isDeleted: boolean;
  isNoticed?: boolean;
  preventDeleteIcon?: boolean;
  onToggleProperty: (id: string, prop: string) => void;
  onShareFile: (id: string) => void;
  onFolderOpen: (id: string, isFile: boolean) => void;
  onDeleteFolder: (id: string) => void;
  onDeleteFile: (id: string) => void;
}
