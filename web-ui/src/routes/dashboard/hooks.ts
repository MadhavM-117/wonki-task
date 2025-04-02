import { FoodWasteEntry } from "@/models";
import { getAllFoodWaste } from "@/utils/api";
import { useState, useEffect } from "react";

export const useFoodWasteData = () => {
  const [data, setData] = useState<FoodWasteEntry[] | undefined>();

  useEffect(() => {
    getAllFoodWaste()
      .then(setData)
      .catch((e) =>
        console.error(`There was an error fetching food waste data. ${e}`),
      );
  }, []);

  return data;
};
