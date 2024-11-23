import React from "react";
import { Header, HeaderActions, HeaderTexts } from "./Header";
import WorkroomActions from "./WorkroomActions";
import Workrooms from "./WorkroomTasks";
import Head from "next/head";

type Props = {};

const WorkroomPage = (props: Props) => {
  return (
    <main className="py-12 px-10 flex flex-col gap-4">
      <Head>
        <title>Huddle | Workrooms</title>
      </Head>
      <Header>
        <HeaderTexts>
          <h3 className="text-[18px] font-bold text-[#4D4D4D] leading-[22px]">
            Atlassian Incorporated
          </h3>
          <HeaderActions>
            <h1 className="text-[#4D4D4D] text-[37px] font-bold leading-[50px]">
              Design Team{" "}
            </h1>
            <span className="ml-2 font-normal text-[16px] leading-[22px] space-x-[6.85px] text-[#4D4D4D]">
              Monday 1st April
            </span>
          </HeaderActions>
        </HeaderTexts>
      </Header>
      <WorkroomActions isInWorkroom />
      <Workrooms />
    </main>
  );
};

export default WorkroomPage;
