import styled from "styled-components";
import { Container, Typography } from "@mui/material";

export const Picture = styled.img`
  width: 100%; /* or any custom size */
  height: 100%;
  max-height: 400px;
  object-fit: cover;
`;

export const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  justify-content: center;
  
`;

export const MainWrapper = styled.div`
  background: ${(props) => props.theme.palette.primary.gradient};
`;

export const Title = styled(Typography)`
  line-height: 41px;
  margin: 50px 0;
`;
