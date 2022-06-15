import styled from "styled-components";
import { Paper, Box, Typography, Chip } from "@mui/material";

export const Card = styled(Paper)`
  max-height: 400px;
  height: 100%;
  padding: 20px 20px;
  background: white;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), -6px 9px 8px 5px rgb(0 0 0 / 12%);
  }
`;

export const CardHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardTitle = styled(Typography)`
  border-bottom: 2.5px solid ${(props) => props.theme.palette.primary.main};
  margin-top: 10px;
`;

export const Tag = styled(Chip)`
  border: 1.5px solid ${(props) => props.theme.palette.primary.main};
  font-size: 12px;
  height: 22px;
  margin: 3px;
  padding: 0 6px;
`;

export const Statistic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StatisticText = styled(Typography)`
  font-size: 14px;
`;
