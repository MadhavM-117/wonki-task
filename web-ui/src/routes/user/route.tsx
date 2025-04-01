import { API_URL } from "@/constants";
import { FoodWasteEntry } from "@/models";
import React, { useEffect, useState } from "react";
import { useFoodWasteData } from "./hooks";

export const UserHome: React.FC = () => {
  const data = useFoodWasteData();

  return <>user home - {data?.length}</>;
};
