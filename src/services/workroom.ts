import axios from "axios";
import Cookies from "js-cookie";

// Define the correct structure for the task objects
interface Task {
  _id: string;
  title: string;
  points: number;
  dueBy: string;
}

// Modify the Workroom interface to include tasks as an array of Task objects
interface Workroom {
  _id: string;
  name: string;
  users: string[];
  tasks: Task[]; // Updated type for tasks
  createdBy: string;
  [key: string]: any; // Add more fields as necessary
}

interface FetchWorkroomsResponse {
  message: string;
  data: Workroom[];
}

export const fetchWorkrooms = async (): Promise<Workroom[] | null> => {
  try {
    // Retrieve token from cookies
    const token = Cookies.get("user_token");

    if (!token) {
      throw new Error("JWT token is missing. Please log in again.");
    }

    // Make the API request
    const response = await axios.get<FetchWorkroomsResponse>(
      "https://huddle-api.onrender.com/api/v1/workroom/rooms",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      }
    );

    console.log(response.data); // Debugging: Log the API response

    // Return the data array from the response
    return response.data.data || [];
  } catch (error: any) {
    console.error("Error fetching workrooms:", error.message || error);
    return null; // Return null if there's an error
  }
};
