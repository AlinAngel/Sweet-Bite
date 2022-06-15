import styled from "styled-components";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const StyledAppBar = styled(AppBar)`
  height: 70px;
`;

export const StyledToolbar = styled(Toolbar)`
  position: relative;
  display: flex;
  justify-content: space-between;
`;
export const Logo = styled.img`
  width: 180px;
  height: 70px;
`;

export const StyledIconButton = styled(IconButton)`
  width: 33px;
  height: 33px;
  margin: 0 5px;
`;

export const CityTypography = styled(Typography)`
  text-decoration: underline;
`;

export const Pages = styled(Box)`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  float: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
