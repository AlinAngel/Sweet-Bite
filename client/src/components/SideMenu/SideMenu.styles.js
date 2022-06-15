import { Box, ListItemText } from "@mui/material";
import styled from "styled-components";

export const ListWrapper = styled(Box)`
  margin-top: 50px;
  background: ${(props) => props.theme.palette.secondary.gradient};
  width: 100%; 
  max-width: 360px
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