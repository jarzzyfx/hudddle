import JoinWorkroom from "@/components/pages/workroom/joingWorkroom/JoinWorkroom";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Huddle io | Workroom",
  description: "View every information about your workroom",
};

const page = async ({ params }: { params: { roomId: string } }) => {
  const { roomId } = await params;
  return (
    <div>
      <JoinWorkroom roomId={roomId} />
    </div>
  );
};

export default page;
