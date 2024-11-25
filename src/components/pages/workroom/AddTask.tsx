import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { tasks } from "@/data/workroom"; // Assuming this is just a placeholder for initial task data
import { addToWorkroom, generateUniqueKey } from "@/lib/utils";
import {
  Task,
  TaskActions,
  TaskDescription,
  TaskDueTime,
  TaskTitle,
} from "./Task";
import { Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateTask from "@/components/shared/createTask";

const AddTask = ({ roomId }: { roomId: string }) => {
  const [tasks, setTasks] = useState<any[]>([]); // Ensure tasks is an array
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = Cookies.get("user_token"); // Get the token from cookies

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await axios.get(
          "https://huddle-api.onrender.com/api/v1/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );

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
  }, []);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full px-16">
      {tasks.length > 0 ? (
        tasks.map((task) => {
          const { _id } = generateUniqueKey(task.title);
          return (
            <Task key={task._id}>
              <TaskDescription>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDueTime>{task.dueBy}</TaskDueTime>
              </TaskDescription>
              <TaskActions>
                <span className="text-[#EEAE05] flex items-center">
                  +<Zap width={12} height={12} />
                  {task.points}
                </span>
                <Button
                  onClick={() => addToWorkroom(roomId, task.__id)}
                  className="bg-[#956FD6] text-white"
                >
                  <Plus className="w-[20px] h-[20px]" /> Add to workroom
                </Button>
              </TaskActions>
            </Task>
          );
        })
      ) : (
        <div>No tasks available</div>
      )}

      <footer className="w-full flex flex-col gap-1 ">
        <Link
          className="underline self-end text-[#999999] font-normal text-[14px] leading-[20px]"
          href={"/tasks"}
        >
          See all
        </Link>

        {/* <Button className="bg-[#956FD6] text-white mx-auto px-16 ">
          Create a new Task
        </Button> */}
        <CreateTask />
      </footer>
    </div>
  );
};

export default AddTask;
