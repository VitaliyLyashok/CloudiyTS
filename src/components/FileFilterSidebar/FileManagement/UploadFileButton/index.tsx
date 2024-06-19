import { FC, memo, useRef, useState } from "react";
import styles from "./index.module.scss";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Modal, TextField, Button } from "@mui/material";
import cloudLogo from "../../../../assets/images/cloud.png";
import axios from "axios";

const UploadFileButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadBtnDisabled, setIsUploadBtnDisabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const uploadChunk = async (file: File, start: number, end: number) => {
    const chunk = file.slice(start, end);
    const formData = new FormData();
    const currentFolderId = sessionStorage.getItem("currentFolderId");
    const userId = sessionStorage.getItem("userId");

    if (currentFolderId && userId) {
      formData.append("FolderId", currentFolderId);
      formData.append("UserId", userId);
      formData.append("Filename", file.name);
      formData.append("Chunk", chunk);

      await axios.post(
        "https://localhost:7258/FileManagement/UploadFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }
  };

  const handleUpload = async () => {
    setIsUploadBtnDisabled(true);
    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const chunkSize = 1024 * 1024 * 10; // 1 MB
      for (let start = 0; start < file.size; start += chunkSize) {
        const end = start + chunkSize;
        await uploadChunk(file, start, end);

        const progress = Math.round((end / file.size) * 100);
        setUploadProgress(Math.min(progress, 100));
      }

      alert("File uploaded successfully.");
      window.location.reload();
    }
  };

  return (
    <>
      <div>
        <button onClick={handleToggleOpen} className={styles.uploadBtn}>
          <UploadFileIcon className={styles.uploadIcon} />
        </button>
        <Modal
          open={isOpen}
          onClose={handleToggleOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modalWindow}>
            <div className={styles.modal}>
              <div className={styles.modalImg}>
                <img
                  src={cloudLogo}
                  alt="Cloudiy Logo"
                  width="60"
                  height="60"
                />
              </div>
              <h1 className={styles.title}>Cloudiy</h1>
            </div>
            <div className="sendFileBtn">
              <div className={styles.upload}>
                {uploadProgress === 0 && (
                  <label htmlFor="files" className={styles.fileInputLabel}>
                    Choose file:
                  </label>
                )}
                <input
                  id="files"
                  className={styles.fileInput}
                  type="file"
                  ref={fileInputRef}
                />
                {uploadProgress !== 0 && (
                  <div className={styles.uploadInfo}>
                    <span className={styles.progress}>
                      Upload progress: {uploadProgress}%
                    </span>
                    <progress
                      className={styles.progressBar}
                      value={uploadProgress}
                      max="100"
                    />
                  </div>
                )}
              </div>

              <Button
                onClick={handleUpload}
                fullWidth
                disabled={isUploadBtnDisabled}
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
              >
                Upload
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default UploadFileButton;
