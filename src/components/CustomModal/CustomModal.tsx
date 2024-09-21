import { Modal } from "@mui/material";
import { CustomModalProps } from "./interface";
import "./CustomModal.css"

const CustomModal: React.FC<CustomModalProps> = ({
  openModal,
  handleCloseModal,
}: CustomModalProps) => {
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <div className="modal-container">
        <input type="text" name="wineName" />
        <input type="number" name="price" />
      </div>
    </Modal>
  );
};

export default CustomModal;
