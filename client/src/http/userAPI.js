import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (user) => {
  try {
    const { data } = await $host.post("api/user/registration", user);
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
  } catch (e) {
    return { errorMessage: e.response.data.message };
  }
};

export const confectionerRegistration = async (user) => {
  try {
    const { data } = await $host.post(
      "api/user/registration/confectioner",
      user
    );
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
  } catch (e) {
    return { errorMessage: e.response.data.message };
  }
};

export const login = async (user) => {
  try {
    const { data } = await $host.post("api/user/login", user);
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
  } catch (e) {
    return { errorMessage: e.response.data.message };
  }
};

export const getConfectionerByID = async (id) => {
  try {
    const { data } = await $host.get("api/user/confectioner/" + id);
    return data;
  } catch (e) {
    console.log(e.response.data);
  }
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const getSocialMediaTypes = async () => {
  const { data } = await $host.get("api/socialMediaType");
  return data;
};

export const getProfile = async () => {
  try {
    const { data } = await $authHost.get("api/user/profile");
    return data;
  } catch (e) {
    console.log(e.response.message);
  }
};

export const updateAvatar = async (formData) => {
  try {
    const { img } = await $authHost.put("api/user/profile/avatar", formData);
  } catch (e) {
    console.log(e.response.message);
  }
};

export const updateProfile = async (user) => {
  try {
    await $authHost.put("api/user/profile", user);
  } catch (e) {
    console.log(e.response.message);
  }
};

export const becomeConfectioner = async (user) => {
  try {
    const { data } = await $authHost.post("api/user/confectioner", user);
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
  } catch (e) {
    console.log(e.response.message);
  }
};
