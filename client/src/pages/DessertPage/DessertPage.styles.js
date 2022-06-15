import styled from "styled-components";
import { Chip, Container, Divider, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

export const Picture = styled.img`
  width: 100%; /* or any custom size */
  height: 400px;
  max-height: 500px;
  object-fit: cover;
`;

export const DessertPageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const Title = styled(Typography)`
  font-size: 34px;
  line-height: 41px;
  margin: 50px 0;
`;

export const StyledCarousel = styled(Carousel)`
  .carousel .slider-wrapper {
    height: 300px !important;
  }
  .thumbs-wrapper {
    ul {
      padding: 0;
      display: flex;
      justify-content: center;
    }
  }
  .carousel .slide div {
    height: 100%;
  }
  .carousel .slide img {
    object-fit: contain;
    height: 100%;
  }

  .carousel .slider-wrapper.axis-horizontal .slider {
    height: 100%;
  }
  .carousel .thumb.selected,
  .carousel .thumb:hover {
    border: 3px solid ${(props) => props.theme.palette.primary.main};
  }
  .carousel .thumb {
    max-height: 50px;
  }
  .carousel .thumb img {
    height: 100%;
    object-fit: contain;
  }
`;

export const TagChip = styled(Chip)`
  padding: 0 13px;
  background-color: ${(props) => props.theme.palette.primary.main};
`;

export const CurvedDescription = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

export const StyledDivider = styled(Divider)`
  margin: 10px 0;
  background-color: ${(props) => props.theme.palette.primary.main};
`;

export const Price = styled.span`
  color: ${(props) => props.theme.palette.text.secondary};
`;
