import styled from "styled-components";
import { Paper, Box, Button, Typography } from "@mui/material";
import Slider from "react-slick";

export const Card = styled(Paper)`
  height: 360px;
  background: white;
  border-radius: 10px;
  position: relative;
  &:hover {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), -6px 9px 8px 5px rgb(0 0 0 / 12%);
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// height: 100%;
export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

export const CardContent = styled(Box)`
  display: flex;
  max-height: 150px;
  height: 100%;
  padding: 10px 15px 20px 15px;
  flex-direction: column;
  justify-content: space-between;
`;

export const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const IconButton = styled(Button)`
  width: 34px;
  min-width: 34px;
  height: 34px;
  padding: 6px 12px;
`;

export const CardTitle = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1;
  font-size: 16px;
`;

export const IconsForEdit = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  button {
    margin-top: 10px;
    margin-right: 10px;
    opacity: 0.9;
  }
`;

export const StyledSlider = styled(Slider)`
  height: 200px;
`;
