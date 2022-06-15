import NavBar from "./components/Header";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import DessertPage from "./pages/DessertPage";
import ProfileWrapper from "./pages/Profile";
import Favourite from "./pages/Profile/Favourite";
import Profile from "./pages/Profile/Profile";
import MyDesserts from "./pages/Profile/MyDesserts";
// import Dashboard from "./pages/Dashboard";
import DessertsCatalog from "./pages/DessertsCatalog";
import ConfectionersCatalog from "./pages/ConfectionersCatalog";
import ConfectionerPage from "./pages/ConfectionerPage";
import { useEffect, useState } from "react";
import { check } from "./http/userAPI";
import Create from "./pages/CreateAndEdit/Create";
import Edit from "./pages/CreateAndEdit/Edit";
import BecomeConfectioner from "./pages/Profile/BecomeConfectioner";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [city, setCity] = useState(localStorage.getItem("city") || "Таганрог");

  useEffect(() => {
    const checkUser = async () => {
      if (localStorage.getItem("token")) {
        const user = await check();
        if (user) setIsAuth(user);
      }
    };
    checkUser();
    if (!localStorage.getItem("city")) localStorage.setItem("city", "Таганрог");
  }, []);

  return (
    <Router>
      <NavBar isAuth={isAuth} setCity={setCity} setIsAuth={setIsAuth} />
      <Routes>
        <Route
          path="/login"
          element={<Auth isLoginPage={true} setIsAuth={setIsAuth} />}
        />
        <Route
          path="/registration"
          element={<Auth isLoginPage={false} setIsAuth={setIsAuth} />}
        />
        <Route path="/dessert/:id" element={<DessertPage />} />
        <Route
          path="/desserts/:typeId"
          element={<DessertsCatalog city={city} />}
        />
        <Route path="/desserts" element={<DessertsCatalog city={city} />} />
        <Route
          path="/confectioners"
          element={<ConfectionersCatalog city={city} />}
        />
        <Route
          path="/confectioner/:confectionerId"
          element={<ConfectionerPage />}
        />
        <Route
          path="/confectioner/:confectionerId/:isContact"
          element={<ConfectionerPage />}
        />
        <Route
          path="/profile"
          element={
            <ProfileWrapper isAuth={isAuth}>
              <Profile />
            </ProfileWrapper>
          }
        />
        <Route
          path="/profile/favourite"
          element={
            <ProfileWrapper isAuth={isAuth}>
              <Favourite />
            </ProfileWrapper>
          }
        />
        <Route
          path="/profile/my-desserts"
          element={
            <ProfileWrapper isAuth={isAuth}>
              <MyDesserts />
            </ProfileWrapper>
          }
        />
        <Route
          path="/profile/become-confectioner"
          element={
            <ProfileWrapper isAuth={isAuth}>
              <BecomeConfectioner setIsAuth={setIsAuth} />
            </ProfileWrapper>
          }
        />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit edit={true} />} />
        <Route path="/" exact element={<Main city={city} />} />
      </Routes>
    </Router>
  );
}

export default App;
