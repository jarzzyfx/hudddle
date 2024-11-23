/* eslint-disable react/no-unescaped-entities */
import React, { Suspense } from "react";
import LeaderBoardHeader from "./leaderboard-header";
import Ranks from "./ranks";
import TopRanking from "./top-ranking";
import { SlidersHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Head from "next/head";


const LeaderBoardPage: React.FC = () => {
  const users = [
    { rank: 1, stars: 3, image: "/assets/woman.svg", time: "4hrs :30min" },
    { rank: 2, stars: 4, image: "/assets/man.svg", time: "10hrs :30min" },
    { rank: 3, stars: 2, image: "/assets/woman.svg", time: "4hrs :30min" },
  ];
  return (
    <section className="pt-8 pb-10 px-12">
      <Head>
        <title>Huddle | Leaderboards</title>
      </Head>
      <LeaderBoardHeader
        companyName="Atlassian Incoporated"
        teamName="Design Team"
        points={1000}
        totalHours="200hr: 30min"
      />
      <Suspense fallback={<Skeleton />}>
        <Ranks users={users} />
      </Suspense>
      <div className="mt-10 flex justify-between items-center">
        <h1 className="font-bold text-slate-600 text-xl">Today's task</h1>
        <SlidersHorizontal
          size={18}
          color="#D9D9D9"
          className="cursor-pointer"
        />
      </div>
      <TopRanking />
    </section>
  );
};

export default LeaderBoardPage;
