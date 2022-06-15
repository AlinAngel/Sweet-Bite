import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import cities from "../../json/cities.json";
import { Autocomplete, DialogContent } from "@mui/material";
import { StyledTextField } from "../../pages/Auth/Auth.styles";
import { StlyedDialog } from "./SelectCityModal.styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SelectCityModal({ open, setOpen }) {
  const [city, setCity] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleChoose = () => {
    localStorage.setItem("city", city);
    setOpen(false);
  };

  return (
    <StlyedDialog
      open={open}
      xs={{ height: "400px" }}
      maxWidth="xs"
      fullWidth
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Выберите город</DialogTitle>
      <DialogContent sx={{ pt: "20px" }}>
        <Autocomplete
          getOptionLabel={(option) => option.city}
          disablePortal
          id="combo-box-demo"
          options={cities}
          onChange={(e, value) => setCity(value.city)}
          renderInput={(params) => (
            <StyledTextField {...params} label="Город" />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="primary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleChoose}>
          Выбрать
        </Button>
      </DialogActions>
    </StlyedDialog>
  );
}
