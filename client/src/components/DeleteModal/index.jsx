import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { StyledCancelButton } from "./DeleteModal.styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteModal({ open, setOpen, dessert, handleDelete }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          Вы уверены, что хотите удалить "{dessert.dessert_info.name}"?
        </DialogTitle>
        <DialogActions sx={{ padding: "8px 24px 16px" }}>
          <StyledCancelButton variant="primary" onClick={handleClose}>
            Отмена
          </StyledCancelButton>
          <Button variant="primary" onClick={() => handleDelete(dessert.id)}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
