"use client";

import React, { useEffect, useState } from "react";
import { Header, HeaderTexts } from "./Header";
import {
  Task,
  TaskActions,
  TaskDescription,
  TaskDueTime,
  TaskTitle,
} from "./Task";
import { Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tasks } from "@/data/workroom";
import { generateUniqueKey } from "@/lib/utils";
import { fetchWorkrooms } from "@/services/workroom";
import { RoomProps } from "../dashboard/todays-task";
import Link from "next/link";

type Props = {};

const Workrooms = (props: Props) => {
  const [workrooms, setWorkrooms] = useState<RoomProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch workrooms on component mount
  useEffect(() => {
    const getWorkrooms = async () => {
      try {
        const rooms: RoomProps[] | null = await fetchWorkrooms();

        setWorkrooms(rooms ?? []); // Use an empty array as a fallback if rooms is null
      } catch (error) {
        console.error("Error fetching workrooms:", error);
        setWorkrooms([]); // Set an empty array on error
      } finally {
        setLoading(false);
      }
    };

    getWorkrooms();
  }, []);
  return (
    <div className="mt-10 flex flex-col gap-2">
      <Header>
        <HeaderTexts className="text-[#707070] font-semibold text-[21px] leading-[24px]">
          Workrooms
        </HeaderTexts>
      </Header>
      <div className="neo-effect p-8 rounded-[16px] w-full h-fit flex flex-col gap-2">
        {workrooms.length !== 0 ? (
          workrooms.map((room) => {
            const { _id } = generateUniqueKey(room._id);
            return (
              <Task key={_id}>
                <TaskDescription>
                  <TaskTitle>{room.name}</TaskTitle>
                </TaskDescription>
                <TaskActions>
                  <div className="flex gap-1">
                    {/* for the users images */}
                    {/* {room.tasks.map((task) => (
                      <p key={task._id}>{task.title}</p>
                    ))} */}
                  </div>
                  <Link href={`/workroom/${room._id}`}>
                    <Button className="bg-[#956FD6] text-white">
                      <Plus className="w-[20px] h-[20px]" /> Add to workroom
                    </Button>
                  </Link>
                </TaskActions>
              </Task>
            );
          })
        ) : (
          <div className="flex flex-col w-full h-auto gap-8 items-center justify-center">
            <p className="text-2xl font-thin">
              No workrooms available,{" "}
              <Link
                className="py-2 px-3 ring-1 ring-yellow-500 text-yellow-500 font-medium"
                href={"/workroom/create"}
              >
                create a workroom
              </Link>{" "}
              to start
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workrooms;
