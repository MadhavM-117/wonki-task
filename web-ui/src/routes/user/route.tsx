import React from "react";
import { useFoodWasteData } from "./hooks";
import { DataTable } from "@/components/custom/data-table";
import { columns } from "./columns";

export const UserHome: React.FC = () => {
  const data = useFoodWasteData();

  if (!data) return <>no data</>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
