import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Review from "../../components/Review";
import { StyledPaper } from "../../components/Review/Review.styles";
import { Grid, Rating } from "@mui/material";
import DessertCard from "../../components/DessertCard";
import { StyledLink, StyledTab } from "./ConfectionerPage.styles";

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

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ tab, setTab, user }) {
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  let reviews = [];

  user?.desserts?.forEach((dessert) => {
    if (dessert?.reviews) {
      dessert.reviews.forEach((review) => {
        reviews.push(review);
      });
    }
  });

  const vkLink = user?.confectioner_info?.social_media.find(
    (item) => item?.social_media_type?.name === "vk"
  )?.link;

  const whatsAppLink = user?.confectioner_info?.social_media.find(
    (item) => item?.social_media_type?.name === "whatsApp"
  )?.link;

  const telegramLink = user?.confectioner_info?.social_media.find(
    (item) => item?.social_media_type?.name === "telegram"
  )?.link;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          aria-label="basic tabs example"
          centered
        >
          <StyledTab label="Десерты" {...allyProps(0)} />
          <StyledTab label="Контакты" {...allyProps(1)} />
          <StyledTab label="О себе" {...allyProps(2)} />
          <StyledTab label="Отзывы" {...allyProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <Grid container rowSpacing={4} columnSpacing={8}>
          {user.desserts?.map((dessert) => {
            return (
              <Grid key={dessert.id} item xs={3}>
                <DessertCard dessert={dessert} />
              </Grid>
            );
          })}
        </Grid>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Typography>
          <b>Номер телефона:</b> {user.confectioner_info.phone}
        </Typography>
        {vkLink && (
          <Typography>
            <b>ВКонтакте:</b>{" "}
            <StyledLink href={vkLink} target="_blank">
              {vkLink}
            </StyledLink>
          </Typography>
        )}
        {telegramLink && (
          <Typography>
            <b>Telegram:</b>{" "}
            <StyledLink href={telegramLink} target="_blank">
              {telegramLink}
            </StyledLink>
          </Typography>
        )}
        {whatsAppLink && (
          <Typography>
            <b>WhatsApp:</b>{" "}
            <StyledLink href={whatsAppLink} target="_blank">
              {whatsAppLink}
            </StyledLink>
          </Typography>
        )}
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Typography>{user.confectioner_info.description}</Typography>
      </TabPanel>
      <TabPanel value={tab} index={3}>
        {reviews.map((review) => {
          return <Review key={review.id} review={review} />;
        })}
      </TabPanel>
    </Box>
  );
}
