import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Grid, Typography } from "@mui/material";
import {
  StyledDivider,
  StyledGridItem,
} from "../../pages/Profile/Profile.styles";
import { StyledTextField } from "../../pages/Login/Login.styles";
import { StyledImage, StyledTextFieldLink } from "./AcceptModal.styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteModal({ open, setOpen, user }) {
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
        maxWidth="md"
      >
        <DialogTitle>Заявка #{user.id}</DialogTitle>
        <DialogContent>
          <Box>
            <Typography variant="subTitle">Личная информация</Typography>
            <StyledDivider />
            <Grid
              container
              rowSpacing={2}
              columnSpacing={4}
              sx={{ marginTop: "0" }}
            >
              <StyledGridItem item xs={3}>
                <Box>
                  <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={4}
                    sx={{ marginTop: "0" }}
                  >
                    <Grid item xs={12}>
                      <StyledImage src={user.img} />
                    </Grid>
                  </Grid>
                </Box>
              </StyledGridItem>
              <StyledGridItem item xs={9}>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={4}
                  sx={{ marginTop: "0" }}
                >
                  <Grid item xs={4}>
                    <StyledTextField
                      value={user.name}
                      fullWidth
                      multiline
                      id="outlined-basic"
                      disabled
                      label="Имя"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <StyledTextField
                      value={user.surname}
                      fullWidth
                      multiline
                      id="outlined-basic"
                      disabled
                      label="Фамилия"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <StyledTextField
                      value={user.patronymic}
                      fullWidth
                      multiline
                      id="outlined-basic"
                      disabled
                      label="Отчество"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <StyledTextField
                      value={user.login}
                      fullWidth
                      multiline
                      id="outlined-basic"
                      disabled
                      label="Логин"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <StyledTextField
                      value={user.city}
                      fullWidth
                      multiline
                      id="outlined-basic"
                      disabled
                      label="Город"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <StyledTextField
                      value={user.name}
                      fullWidth
                      multiline
                      id="outlined-basic"
                      disabled
                      label="education"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      value={user.description}
                      fullWidth
                      multiline
                      id="outlined-basic"
                      disabled
                      label="О себе"
                      rows={4}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </StyledGridItem>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "15px" }}>
            <Typography variant="subTitle">Контакты</Typography>
            <StyledDivider />
            <Grid
              container
              rowSpacing={2}
              columnSpacing={4}
              sx={{ marginTop: "0" }}
            >
              <>
                <Grid item xs={3}>
                  <a href={user.vk} rel="noreferrer" target="_blank">
                    <StyledTextFieldLink
                      value={user.vk}
                      fullWidth
                      multiline
                      id="outlined-basic"
                      disabled
                      label="ВКонтакте"
                      variant="outlined"
                    />
                  </a>
                </Grid>
                <Grid item xs={3}>
                  <a href={user.whatsApp} rel="noreferrer" target="_blank">
                    <StyledTextField
                      value={user.whatsApp}
                      fullWidth
                      multiline
                      id="outlined-basic"
                      disabled
                      label="What`sApp"
                      variant="outlined"
                    />
                  </a>
                </Grid>
                <Grid item xs={3}>
                  <a href={user.telegram} rel="noreferrer" target="_blank">
                    <StyledTextField
                      value={user.telegram}
                      fullWidth
                      multiline
                      id="outlined-basic"
                      disabled
                      label="Telegram"
                      variant="outlined"
                    />
                  </a>
                </Grid>
                <Grid item xs={3}>
                  <StyledTextField
                    value={user.telephone}
                    fullWidth
                    multiline
                    id="outlined-basic"
                    disabled
                    label="Номер телефона"
                    variant="outlined"
                  />
                </Grid>
              </>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="primary" onClick={handleClose}>
            Принять
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Отклонить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
