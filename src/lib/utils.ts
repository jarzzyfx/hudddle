import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";
import { TaskTodayProps } from "./@types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = () => {
  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];

  const getOrdinal = (num: number) => {
    const s = ["th", "st", "nd", "rd"],
      v = num % 100;
    return num + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${dayOfWeek} ${getOrdinal(dayOfMonth)} ${month}`;
};

export function generateUniqueKey(token: string) {
  let _id: string;
  // Generate a unique key using a combination of the token and some Math functions
  _id = `_id_${token.slice(0, 3)}-sqidcd${token.slice(
    2,
    token.length - 2
  )}--v${Math.round(Math.random() * 100)}`;

  // getting back the generated unique id
  return { _id };
}

export const addToWorkroom = async (roomId: string, task: TaskTodayProps) => {
  try {
    // Retrieve token from cookies
    const token = Cookies.get("user_token");

    if (!token) {
      throw new Error("JWT token is missing. Please log in again.");
    }

    // Make the API request to add the task to the workroom
    const response = await axios.post(
      "https://huddle-api.onrender.com/api/v1/workroom/room/add-task",
      {
        roomId,
        taskId: task._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast({
      variant: "success",
      title: "Task successfully added to workroom!",
    });
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: `Error adding task to workroom:,
     ${error.response?.data || error.message}`,
    });
  }
};

// get users in workroom
export const getUsersInWorkroom = async (
  roomId: string,
  setUsers: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (!roomId) return; // Don't proceed if roomId is not available

  try {
    // Get the token from cookies
    const token = Cookies.get("user_token");

    if (!token) {
      throw new Error("Authentication token not found.");
    }

    // Make the GET request with the token in the Authorization header
    const response = await axios.get(
      `https://huddle-api.onrender.com/api/v1/workroom/room/users/${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    // Extract the user data from the response
    const usersData = Array.isArray(response.data.data)
      ? response.data.data
      : [];
    setUsers(usersData); // Set the users in state
  } catch (error) {
    console.error("Error fetching users:", error);
    setUsers([]); // Reset to empty array on error
  }
};
