import {
  Button,
  Container,
  Grid,
  Paper,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  TextField,
  Typography,
} from "@mui/material";
import styled from "styled-components";

export const AuthContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

export const StyledPaper = styled(Paper)`
  width: 85%;
  /* height: 60vh; */
  min-height: 340px;
  max-height: 500px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${(props) => (props.right ? "0 4px 4px 0" : "4px 0 0 4px")};
`;

export const FormGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export const StyledTextField = styled(TextField)`
  border-radius: 8px;
  & label.Mui-focused {
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

export const StyledButton = styled(Button)`
  padding: 16.5px 20px;
  width: 100%;
`;

export const ButtonsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const RegText = styled(Typography)`
  text-align: center;
`;

export const RegButton = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.palette.text.secondary};
  &:hover {
    text-decoration: underline;
  }
`;

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: theme.palette.primary.gradient,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: theme.palette.primary.gradient,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#bfbbbb",
    borderRadius: 1,
  },
}));

export const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: theme.palette.primary.gradient,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: theme.palette.primary.gradient,
  }),
}));

export const StyledStepLabel = styled(StepLabel)`
  .MuiStepLabel-alternativeLabel {
    margin-top: 5px;
  }
`;
