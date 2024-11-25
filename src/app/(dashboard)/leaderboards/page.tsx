import LeaderBoardPage from "@/components/pages/leaderboards";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Huddle io | Leaderboards",
  description: "Find out who is leading in your team",
};
const LeaderBoards: React.FC = () => {
  return (
    <main>
      <LeaderBoardPage />
    </main>
  );
};

export default LeaderBoards;
