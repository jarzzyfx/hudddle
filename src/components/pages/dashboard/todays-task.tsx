import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Clock4, Plus, Zap } from "lucide-react";
import { TaskTodayProps } from "@/lib/@types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchWorkrooms } from "@/services/workroom";
import { addToWorkroom } from "@/lib/utils";

interface TodaysTaskProps {
  task: TaskTodayProps;
}

export interface RoomProps {
  _id: string;
  name: string;
  tasks: Array<{
    _id: string;
    title: string;
    points: number;
    dueBy: string;
  }>;
}

const TodaysTask: React.FC<TodaysTaskProps> = ({ task }) => {
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
    <Card className="rounded-none shadow-none py-4 border-x-0 border-t-0 hover:bg-custom-whitesmoke hover:border-b-custom-purple px-0 items-center grid grid-cols-9 border-b-[1px] border-b-slate-300">
      <CardContent className="col-span-6 flex justify-between items-center p-0">
        <div className="space-y-1 p-0">
          <CardTitle className="text-slate-600 text-lg p-0">
            {task.title}
          </CardTitle>
          <CardDescription className="flex p-0">
            <Clock4 size={18} className="mr-2" />
            Due by {task.dueBy}
          </CardDescription>
        </div>
        <div className="flex gap-1 items-center p-0 text-custom-yellow">
          +{task.points} <Zap size={18} />
        </div>
      </CardContent>
      <div className="col-span-3 flex items-center justify-end p-0">
        <Popover>
          <PopoverTrigger>
            <Button className="bg-custom-purple">
              <Plus size={18} className="mr-2" /> Add to workroom
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {loading ? (
              <p>Loading...</p>
            ) : workrooms.length > 0 ? (
              workrooms.map((room) => (
                <div
                  key={room._id}
                  onClick={() => addToWorkroom(room._id, task)}
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                >
                  <p className="font-medium">{room.name || "Unnamed Room"}</p>
                  <p className="text-sm text-gray-500">
                    Tasks: {room.tasks.length}
                  </p>
                </div>
              ))
            ) : (
              <p>No workrooms available.</p>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
};

export default TodaysTask;
