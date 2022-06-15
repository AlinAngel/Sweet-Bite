import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Review from "../../components/Review";
import { StyledTab } from "../ConfectionerPage/ConfectionerPage.styles";
import { Button, Rating } from "@mui/material";
import { StyledPaper } from "./../../components/Review/Review.styles";
import { StyledTextField } from "./../Auth/Auth.styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ tab, setTab, dessert, handleAddReview }) {
  const [isReview, setIsReview] = useState(false);
  const [rating, setRating] = useState();
  const [review, setReview] = useState("");

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          aria-label="basic tabs example"
          centered
        >
          <StyledTab label="О десерте" {...a11yProps(0)} />
          <StyledTab label="Отзывы" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <Typography>{dessert.dessert_info.description}</Typography>
        {dessert.dessert_info?.ingredients && (
          <Typography>
            <b>Состав:</b> {dessert.dessert_info?.ingredients}{" "}
          </Typography>
        )}
        {dessert.dessert_info?.storageTemp && (
          <Typography>
            <b>Температура хранения:</b> {dessert.dessert_info?.storageTemp}
          </Typography>
        )}
        {dessert.dessert_info?.shelfLife && (
          <Typography>
            <b>Срок хранения:</b> {dessert.dessert_info?.shelfLife}
          </Typography>
        )}
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Box>
          {!isReview ? (
            <Button
              sx={{ mb: "15px" }}
              variant="primary"
              onClick={() => setIsReview(true)}
            >
              Оставить отзыв
            </Button>
          ) : (
            <StyledPaper elevation={5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Typography sx={{ fontSize: "18px" }} component={"span"}>
                  Новый отзыв
                </Typography>
                <Rating
                  name="read-only"
                  sx={{ mt: "10px" }}
                  // value={user.rating || 0}
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
                <StyledTextField
                  fullWidth
                  sx={{ mt: "10px" }}
                  multiline
                  id="outlined-basic"
                  label="Отзыв"
                  variant="outlined"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <Button
                  sx={{ mt: "10px", mb: "5px" }}
                  variant="primary"
                  onClick={() => {
                    handleAddReview(rating, review);
                    setIsReview(false);
                  }}
                >
                  Оставить отзыв
                </Button>
              </Box>
            </StyledPaper>
          )}
          {dessert.reviews.map((item) => (
            <Review key={item.id} review={item} />
          ))}
        </Box>
      </TabPanel>
    </Box>
  );
}
