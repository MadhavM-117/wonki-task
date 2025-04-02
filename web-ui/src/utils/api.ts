import { API_URL } from "@/constants";

export const whoAmI = async () => {
  const token = localStorage.getItem("token");

  if (!token) return undefined;

  return await fetch(`${API_URL}/auth/whoami`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.error(`There was an error fetching user data. ${e}`);
      return undefined;
    });
};

export const getAllFoodWaste = async () => {
  return await fetch(`${API_URL}/food-waste`)
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.error(`There was an error fetching food waste data. ${e}`);
      return undefined;
    });
};

export const deleteFoodWaste = async (foodwasteId: number) => {
  return await fetch(`${API_URL}/food-waste/${foodwasteId}`, {
    method: "delete",
  })
    .then((res) => {
      return res.ok;
    })
    .catch((e) => {
      console.error("There was an error while deleting a food waste entry", e);
      return false;
    });
};
