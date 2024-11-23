import JoinWorkroom from "@/components/pages/workroom/joingWorkroom/JoinWorkroom";
import React from "react";

type Props = {};

const page = ({ params }: { params: { roomId: string } }) => {
  const { roomId } = params;
  return (
    <div>
      <JoinWorkroom roomId={roomId} />
    </div>
  );
};

export default page;
