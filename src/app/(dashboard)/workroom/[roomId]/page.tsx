import JoinWorkroom from "@/components/pages/workroom/joingWorkroom/JoinWorkroom";
import React from "react";

const page = async ({ params }: { params: { roomId: string } }) => {
  const { roomId } = await params;
  return (
    <div>
      <JoinWorkroom roomId={roomId} />
    </div>
  );
};

export default page;
