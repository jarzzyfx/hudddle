import WorkroomPage from "@/components/pages/workroom";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Huddle io | All workrooms",
  description: "View all your workrooms in one space",
};
const Workroom: React.FC = () => {
  return (
    <>
      <WorkroomPage />
    </>
  );
};

export default Workroom;
