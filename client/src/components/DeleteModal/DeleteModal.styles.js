import styled from "styled-components";
import { Paper, Box, Button, Typography } from "@mui/material";
import Slider from "react-slick";

export const StyledCancelButton = styled(Button)`
    color:${(props) => props.theme.palette.text.menu};
    border-color: ${(props) => props.theme.palette.text.menu};
    &:hover{
        background-color: ${(props) => props.theme.palette.text.menu};
    }
`