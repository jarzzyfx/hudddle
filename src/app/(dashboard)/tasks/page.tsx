import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Huddle io | Tasks",
  description: "Manage your tasks all in one space",
};
const page = (props: Props) => {
  return <div>Task page</div>;
};

export default page;
