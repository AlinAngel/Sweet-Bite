import styled from "styled-components";
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItemText,
  Typography,
} from "@mui/material";

export const ProfileContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  padding: 50px 0;
  
  /* height: calc(100vh - 70px); */
`;

export const StyledList = styled(List)``;

export const ListWrapper = styled(Box)`
  margin-top: 50px;
  background: ${(props) => props.theme.palette.secondary.gradient};
`;

export const StyledListItemText = styled(ListItemText)`
  .MuiTypography-root {
    font-style: normal;
    font-weight: ${(props) => (props.selected ? "700" : "500")};
    font-size: ${(props) => (props.selected ? "17px" : "16px")};
    line-height: 19px;
    color: ${(props) => props.theme.palette.text.menu};
    text-transform: capitalize;
    &::before {
      content: ${(props) => (props.selected ? `"•"` : "")};
      margin-right: 10px;
    }
  }
`;

export const StyledTitle = styled(Typography)`
  font-style: normal;
  margin-top: 10px;
  font-size: 28px;
  font-weight: 600;
`;

export const Image = styled.img`
  border: 1px solid ${(props) => props.theme.palette.primary.main};
  width: 100%;
  height: 198px;
  object-fit: cover;
  border-radius: 10px;
`;

export const StyledGridItem = styled(Grid)`
  padding-top: 0 !important;
`;

export const StyledDivider = styled(Divider)`
  margin: 10px 0 1px;
  background-color: ${(props) => props.theme.palette.primary.main};
`;
