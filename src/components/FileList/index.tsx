import React, { FC, memo, useState } from "react";
import FileListItem from "./FileListItem";
import styles from "./index.module.scss";
import cloudLogo from "../../assets/images/cloud.png";
import { IProps } from "./index.types";
import { Box, Modal, TextField, Button } from "@mui/material";
import HTTPservice from "utils/HTTPService";
import APIRoutes from "utils/APIRoutes";

const FileList: FC<IProps> = ({ data, onToggleProperty, onFolderOpen, onDeleteFolder, onDeleteFile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fileId: "",
  });

  const onToggleModal = () => {
    setIsModalOpen(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onShareFileModalOpen = (id: string) => {
    setIsModalOpen(true);
    setFormData({ ...formData, fileId: id });
  };

  const onShareFile = () => {
    HTTPservice.post(APIRoutes.FileSharing, {
      emailAddres: formData.email,
      fileId: formData.fileId,
    });
  };


  return (
    <>
      <main className={styles.fileList}>
        <div className={styles.scroll}>
        {data.map((item) => {
          const { id, ...itemProps } = item;

          return (
            <FileListItem
              id={id}
              key={id}
              {...itemProps}
              onToggleProperty={onToggleProperty}
              onShareFile={onShareFileModalOpen}
              onFolderOpen={onFolderOpen}
              onDeleteFolder={onDeleteFolder}
              onDeleteFile={onDeleteFile}

            />
          );
        })}   
        </div>
        <Modal
          open={isModalOpen}
          onClose={onToggleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            component="form"
            onSubmit={onShareFile}
            className={styles.modalWindow}
          >
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
              label="Enter user email"
              name="name"
              autoComplete="off"
              value={formData.email}
              onChange={handleEmailChange}
              autoFocus
              sx={{ marginTop: 5 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Share file
            </Button>
          </Box>
        </Modal>
      </main>
    </>
  );
};

export default memo(FileList);
