interface IFileSystemEntity {
  id: string,
  isDeleted: boolean,
  name: string,
  userId: string,
  creationTime: string,
  folderMetadataId: string | null,
  isFile: boolean,
}

interface IFolder extends IFileSystemEntity {
  childFolders: IFolder[] | null,
  folderFiles: IFolderFile[] | null,
  path: string,
  preventDeleteIcon?: boolean,
}

interface IFolderFile extends IFileSystemEntity {
  isNoticed: boolean,
  weight: number,
}

export interface IFilesData extends IFileSystemEntity {
  childFolders?: IFolder[],
  folderFiles?: IFolderFile[],
  path?: string,
  isNoticed?: boolean,
  weight?: number,
}
