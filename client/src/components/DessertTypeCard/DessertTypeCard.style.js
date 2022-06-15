import styled from "styled-components";
import { Paper } from "@mui/material";
import Typography from "@mui/material/node/Typography";

export const Card = styled(Paper)`
  background-color: ${(props) => props.theme.palette.primary.main};
  max-height: 140px;
  height: 100%;
  height: 140px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), -6px 9px 8px 5px rgb(0 0 0 / 12%);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 80px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

export const Title = styled(Typography)`
  padding: 3px 19px;
  width: 100%;
  border-radius: 5px;
  text-align: center;
  background-color: white;
`;
