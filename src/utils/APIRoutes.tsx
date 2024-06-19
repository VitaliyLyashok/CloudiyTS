const host = "https://localhost:7258"
const endpoint = (path: string) => {return host + path}

const APIRoutes = {
    SignUp: endpoint("/Account/SignUp"),
    SignIn: endpoint("/Account/SignIn"),
    GetUser: endpoint("/Account/GetUser"),
    GetFiles: endpoint("/FileManagement/GetFolder"),
    UploadFile: endpoint("/FileManagement/UploadFile"),
    CreateFolder: endpoint("/FileManagement/CreateFolder"),
    DownloadFile: endpoint('/FileManagement/DownloadFile'),
    ToggleDelete: endpoint('/FileManagement/ToggleDeletedFile'),
    ToggleNoticed: endpoint('/FileManagement/ToggleNoticed'),
    FileSharing: endpoint('/FileManagement/NewSharing'),
    Search: endpoint('/FileManagement/Search'),
    DeleteFolder: endpoint('/FileManagement/DeleteFoler'),
    GetDeletedFiles: endpoint('/FileManagement/GetDeletedFiles'),
    GetSharingFiles: endpoint('/FileManagement/GetSharingFiles'),
    GetNoticedFiles: endpoint('/FileManagement/GetNoticedFiles'),
    GetRecentFiles: endpoint('/FileManagement/GetRecentFiles'),
    GetFileInfo: endpoint('/FileManagement/FileInfo'),
    DeleteFile: endpoint('/FileManagement/RemoveFilePermanently')
}

export default APIRoutes