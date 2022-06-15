import styled from "styled-components";
import { Image } from "../../pages/Profile/Profile.styles";
import { StyledTextField } from "../../pages/Login/Login.styles";

export const StyledImage = styled(Image)`
  height: 189px;
`;

export const StyledTextFieldLink = styled(StyledTextField)`
  .MuiOutlinedInput-input {
    cursor: pointer;
  }
`;
