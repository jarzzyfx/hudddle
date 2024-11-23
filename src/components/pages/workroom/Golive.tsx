import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, HeaderActions, HeaderTexts } from "./Header";
import { generateUniqueKey, getUsersInWorkroom } from "@/lib/utils";
import { Chip, ChipImage, ChipTitle } from "@/components/shared/Chip";
import { Button } from "@/components/ui/button";
import {
  Task,
  TaskActions,
  TaskDescription,
  TaskDueTime,
  TaskTitle,
} from "./Task";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";
import GoliveButton from "@/components/shared/golive-components/golive-button";
import Cookies from "js-cookie"; // Import js-cookie to get the token

type Props = {
  roomId: string;
};

const Golive = ({ roomId }: Props) => {
  const [tasks, setTasks] = useState<any[]>([]); // State to store tasks
  const [users, setUsers] = useState<any[]>([]); // State to hold the users in the workroom
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(""); // Error state

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = Cookies.get("user_token"); // Get the token from cookies

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await axios.get("http://localhost:4000/api/v1/tasks", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        // Ensure response data is in the expected format
        if (Array.isArray(response.data)) {
          const formattedTasks = response.data.map((task) => ({
            id: task._id,
            title: task.title,
            points: task.points,
            tools: task.tools,
            status: task.status,
            deadline: task.deadline,
            dueBy: task.dueBy,
            inWorkroom: task.inWorkroom,
            createdBy: task.createdBy,
          }));

          setTasks(formattedTasks); // Update state with formatted tasks
        } else {
          setError("Invalid response structure."); // Handle unexpected response
        }
      } catch (error: any) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
    getUsersInWorkroom(roomId, setUsers);
  }, [roomId]);

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <motion.div className="relative w-3/4 h-3/4 rounded-[6px] neo-effect border-[1px] border-[#091E4224] p-6 flex flex-col gap-8">
      <Header>
        <HeaderTexts>
          <h2 className="font-bold text-[18px] leading-[22px] text-[#262626]">
            Your team members
          </h2>
          <HeaderActions className="flex-wrap">
            {users.map((user) => {
              return (
                <Chip key={user._id}>
                  <ChipImage src={"/assets/images/member1.png"} />
                  <ChipTitle>{user.fullname}</ChipTitle>
                </Chip>
              );
            })}

            <Button
              className="text-[18px] leading-[20px] font-normal text-[#956FD699]"
              variant={"ghost"}
            >
              + 4 Others
            </Button>
          </HeaderActions>
        </HeaderTexts>
      </Header>

      <div className="flex flex-col gap-4 mt-8">
        <h2 className="font-bold text-[18px] leading-[22px] text-[#262626]">
          Workroom Tasks
        </h2>
        {tasks.length > 0 ? (
          tasks.map((task) => {
            const { _id } = generateUniqueKey(task.title);

            return (
              <Task key={_id}>
                <TaskDescription>
                  <TaskTitle>{task.title}</TaskTitle>
                  <TaskDueTime>{task.Due}</TaskDueTime>
                </TaskDescription>
                <TaskActions>
                  <span className="text-[#EEAE05] flex items-center">
                    +<Zap width={12} height={12} />
                    {task.points}
                  </span>
                </TaskActions>
              </Task>
            );
          })
        ) : (
          <div>No tasks available for this workroom.</div> // Display message if no tasks found
        )}
      </div>
      <GoliveButton />
    </motion.div>
  );
};

export default Golive;
