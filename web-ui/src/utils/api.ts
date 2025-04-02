import { API_URL } from "@/constants";

export const login = async (form: FormData) => {
  form.set("grant_type", "password");

  return await fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(form as unknown as URLSearchParams).toString(),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw res;
    })
    .catch((error) => {
      console.error("There was an error logging in.", error);
      return undefined;
    });
};

export const signup = async (form: FormData) => {
  return await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(form.entries())),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw res;
    })
    .catch((error) => {
      console.error("There was an error signing up.", error);
      return undefined;
    });
};

export const whoAmI = async () => {
  const token = localStorage.getItem("token");

  if (!token) return undefined;

  return await fetch(`${API_URL}/auth/whoami`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw res;
    })
    .catch((e) => {
      console.error(`There was an error fetching user data. ${e}`);
      return undefined;
    });
};

export const getOwnedFoodWaste = async () => {
  const token = localStorage.getItem("token");

  if (!token) return undefined;

  return await fetch(`${API_URL}/food-waste/owned`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw res;
    })
    .catch((e) => {
      console.error(`There was an error fetching food waste data. ${e}`);
      return undefined;
    });
};

export const getAllFoodWaste = async () => {
  const token = localStorage.getItem("token");

  if (!token) return undefined;

  return await fetch(`${API_URL}/food-waste`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw res;
    })
    .catch((e) => {
      console.error(`There was an error fetching food waste data. ${e}`);
      return undefined;
    });
};

export const deleteFoodWaste = async (foodwasteId: number) => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  return await fetch(`${API_URL}/food-waste/${foodwasteId}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.ok;
    })
    .catch((e) => {
      console.error("There was an error while deleting a food waste entry", e);
      return false;
    });
};

export const createFoodWaste = async (form: FormData) => {
  const token = localStorage.getItem("token");

  if (!token) return undefined;
  const body = Object.fromEntries(form.entries());

  return await fetch(`${API_URL}/food-waste`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw res;
    })
    .catch((e) => {
      console.error(`There was an error fetching food waste data. ${e}`);
      return undefined;
    });
};
