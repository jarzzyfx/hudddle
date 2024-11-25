import CreateWorkroom from "@/components/pages/workroom/createWorkroom/CreateWorkroom";
import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Huddle io | Create Workroom",
  description: "Create a new Workroom",
};
const page = (props: Props) => {
  return (
    <div>
      <CreateWorkroom></CreateWorkroom>
    </div>
  );
};

export default page;
