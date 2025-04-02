import { API_URL } from "@/constants";
import { FoodWasteEntry } from "@/models";
import { useState, useEffect } from "react";

export const useFoodWasteData = () => {
  const [data, setData] = useState<FoodWasteEntry[] | undefined>();

  useEffect(() => {
    fetch(`${API_URL}/food-waste`)
      .then((res) => {
        return res.json();
      })
      .then(setData)
      .catch((e) =>
        console.error(`There was an error fetching food waste data. ${e}`),
      );
  }, []);

  return data;
};
