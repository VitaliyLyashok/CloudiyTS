import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ShareIcon from "@mui/icons-material/Share";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HTTPservice from "utils/HTTPService";
import APIRoutes from "utils/APIRoutes";

export const filterMenuButtons = [
  {
    id: "1",
    HTTPRoute: APIRoutes.GetFiles, 
    label: "My Files",
    icon: <FolderOpenIcon />,
  },
  {
    id: "2",
    HTTPRoute: APIRoutes.GetSharingFiles, 
    label: "Shared Files",
    icon: <ShareIcon />,
  },
  {
    id: "3",
    HTTPRoute: APIRoutes.GetRecentFiles,
    label: "Recent Files",
    icon: <AccessTimeIcon />,
  },
  {
    id: "4",
    HTTPRoute: APIRoutes.GetNoticedFiles, 
    label: "Noticed Files",
    icon: <StarBorderIcon />,
  },
  {
    id: "5",
    HTTPRoute: APIRoutes.GetDeletedFiles, 
    label: "Trash",
    icon: <DeleteOutlineIcon />,
  },
];
