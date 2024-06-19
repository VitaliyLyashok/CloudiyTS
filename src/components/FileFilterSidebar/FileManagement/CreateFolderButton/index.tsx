import { FC, memo, useState } from "react";
import styles from "./index.module.scss";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { Box, Modal, TextField, Button } from "@mui/material";
import cloudLogo from "../../../../assets/images/cloud.png";
import HTTPservice from "utils/HTTPService";
import APIRoutes from "utils/APIRoutes";

const CreateFolderButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const createFolder = () => {
    HTTPservice.post(APIRoutes.CreateFolder, {
      masterFolderId: sessionStorage.getItem("currentFolderId"),
      name: folderName,
    }).then(() => window.location.reload());
  };

  return (
    <>
      <div>
        <button onClick={handleToggleOpen} className={styles.createFolderBtn}>
          <CreateNewFolderIcon className={styles.folderIcon} />
        </button>
        <Modal
          open={isOpen}
          onClose={handleToggleOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modalWindow}>
            <div className={styles.modal}>
              <div className={styles.img}>
                <img
                  src={cloudLogo}
                  alt="Cloudiy Logo"
                  width="60"
                  height="60"
                />
              </div>
              <span className={styles.title}>Cloudiy</span>
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Create folder"
              name="name"
              value={folderName}
              autoComplete="off"
              autoFocus
              onChange={(e) => setFolderName(e.target.value)}
              sx={{ marginTop: 5 }}
            />
            <Button
              onClick={createFolder}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create folder
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CreateFolderButton;
