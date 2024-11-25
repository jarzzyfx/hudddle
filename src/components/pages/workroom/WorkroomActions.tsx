import React, { FC, HTMLAttributes } from "react";
import { Header, HeaderActions, HeaderTexts } from "./Header";
import { workroomMembers } from "@/data/workroom";
import { generateUniqueKey } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserOnlineStatus } from "@/components/shared/sidebar";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import Link from "next/link";

interface WorkroomActionsProps extends HTMLAttributes<HTMLDivElement> {}

const WorkroomActions: FC<WorkroomActionsProps> = ({ ...props }) => {
  return (
    <div className="w-full h-fit p-8 neo-effect rounded-[16px]" {...props}>
      <Header>
        <HeaderTexts>
          <HeaderTexts>
            <div className="flex gap-[1px] items-center">
              {workroomMembers.map((member) => {
                const { _id } = generateUniqueKey(member.name);
                return (
                  <Avatar className="w-[24px] h-[24px]" key={_id}>
                    <AvatarImage src={`${member.img}`} />
                    <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                );
              })}

              <UserOnlineStatus isOnline className="ml-4" />
            </div>
            <small>Your team mates are waiting for you</small>
          </HeaderTexts>
          <div className="flex gap-4 items-end">
            <Button className=" bg-transparent border-[1px] border-[#EEAE05] text-[#EEAE05] text-[21px] font-semibold leading-[24px] disabled:border-[#C4C4C4] disabled:text-[#C4C4C4] hover:bg-[#EEAE05] hover:text-white neo-btn">
              <Link href={"/workroom/create"}>Create Workroom </Link>
            </Button>
          </div>
        </HeaderTexts>
      </Header>
    </div>
  );
};

export default WorkroomActions;
