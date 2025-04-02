import { FoodWasteEntry, FoodWasteFilter } from "@/models";
import { getAllFoodWaste } from "@/utils/api";
import { useState, useEffect } from "react";

export const useFoodWasteData = (filter?: FoodWasteFilter) => {
  const [data, setData] = useState<FoodWasteEntry[] | undefined>();

  useEffect(() => {
    const urlFilter = filter
      ? new URLSearchParams(
          Object.entries(filter).filter(([_, value]) => value !== undefined),
        )
      : undefined;
    getAllFoodWaste(urlFilter)
      .then(setData)
      .catch((e) =>
        console.error(`There was an error fetching food waste data. ${e}`),
      );
  }, [filter]);

  return data;
};
