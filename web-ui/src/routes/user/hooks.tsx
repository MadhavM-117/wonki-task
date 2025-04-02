import React, { SetStateAction } from "react";
import { API_URL } from "@/constants";
import { FoodWasteEntry } from "@/models";
import { useState, useEffect } from "react";
import { getAllFoodWaste } from "@/utils/api";

export const FoodWasteContext = React.createContext<{
  data: FoodWasteEntry[] | undefined;
  setData:
    | React.Dispatch<SetStateAction<FoodWasteEntry[] | undefined>>
    | undefined;
}>({ data: undefined, setData: undefined });

export const FoodWasteContextProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [data, setData] = useState<FoodWasteEntry[] | undefined>();

  useEffect(() => {
    getAllFoodWaste().then(setData);
  }, []);

  return (
    <FoodWasteContext.Provider value={{ data, setData }}>
      {children}
    </FoodWasteContext.Provider>
  );
};

export const useFoodWasteData = () => {
  return React.useContext(FoodWasteContext);
};
