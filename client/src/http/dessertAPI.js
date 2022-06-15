import { $authHost, $host } from "./index";

export const getDesserts = async (
  searchQuery = "",
  typeId,
  page,
  limit = 3,
  direction,
  column,
  city
) => {
  const { data } = await $authHost.get("api/dessert", {
    params: {
      searchQuery,
      typeId,
      page,
      limit,
      direction,
      column,
      city,
    },
  });
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const getFafouriteDesserts = async (typeId, page, limit = 3) => {
  const { data } = await $authHost.get("api/dessert/favourite/", {
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const getDessert = async (dessertId) => {
  const { data } = await $authHost.get("api/dessert/" + dessertId);
  return data;
};

export const getMyDesserts = async (page, limit = 2) => {
  const { data } = await $authHost.get("api/dessert/myDesserts", {
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const createNewDessert = async (formData) => {
  try {
    await $authHost.post("api/dessert", formData);
  } catch (err) {
    return { error: err.response.data.message };
  }
};

export const editDessert = async (formData) => {
  try {
    const { data } = await $authHost.put("api/dessert/edit", formData);
  } catch (err) {
    return { error: err.response.data.message };
  }
};

export const deleteDessert = async (dessertId) => {
  try {
    const { data } = await $authHost.delete("api/dessert/delete/" + dessertId);
  } catch (err) {
    console.log(err.response.message);
  }
};

export const getConfectioners = async (city = "", page, limit) => {
  const { data } = await $host.get("api/user/confectioners", {
    params: {
      city,
      page,
      limit,
    },
  });
  return data;
};

export const addOrDeleteFavorite = async (dessertId) => {
  try {
    const { data } = await $authHost.post("api/dessert/favourite", {
      dessertId,
    });
  } catch (err) {
    console.log(err.response.message);
  }
};

export const addReview = async (rating, review, dessertId) => {
  try {
    const { data } = await $authHost.post("api/dessert/review", {
      dessertId,
      rating,
      review,
    });
  } catch (err) {
    console.log(err.response.message);
  }
};
