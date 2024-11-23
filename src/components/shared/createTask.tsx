import React, { useState } from "react";
import axios from "axios"; // Import Axios
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { toast } from "../ui/use-toast";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface User {
  token: string;
  email: string;
  fullname: string;
}

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const CreateTask = () => {
  const [tool, setTool] = useState<string>("");
  const [tools, setTools] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<Date>();
  const [title, setTitle] = useState<string>("");
  const [taskDuration, setTaskDuration] = useState<string>("");
  const [taskCategory, setTaskCategory] = useState<string>("");
  const [isRecurring, setIsRecurring] = useState<string>("no");
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // adding toll to task
  const handleAddTool = () => {
    if (tool.trim()) {
      setTools([...tools, tool]);
      setTool("");
    }
  };

  // removing tool from task
  const handleRemoveTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  // creating a task
  const handleCreateTask = async () => {
    setLoading(true); // Set loading state to true

    // Retrieve the user_token from cookies
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_token="));
    const token = cookies ? cookies.split("=")[1] : null;
    console.log(token);

    if (!token) {
      toast({
        variant: "destructive",
        title: "JWT token is missing. Please log in again.",
      });
      throw new Error("JWT token is missing. Please log in again.");
    }

    // Decode the token to get the user ID
    let userId: string | null = null;
    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(token); // Decode with custom type
      userId = decodedToken.userId; // Access the 'userId' field from the decoded token
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid JWT token. Please log in again.",
      });
      throw new Error("Invalid JWT token. Please log in again.");
    }

    if (!userId) {
      toast({
        variant: "destructive",
        title: "User ID not found in token.",
      });
      throw new Error("User ID not found in token.");
    }

    const taskData = {
      title,
      points: 10, // Adjust this as needed
      reoccuring: isRecurring,
      Task_category: taskCategory,
      tools,
      status: "In Progress", // Set a default status
      deadline: dueDate ? dueDate.toISOString() : null, // Convert to ISO string
      dueBy: dueDate ? dueDate.toISOString() : null, // Convert to ISO string
      inWorkroom: true, // Default value
      createdBy: userId, // Use actual user ID from token
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/tasks/create",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );

      toast({
        variant: "success",
        title: "Task was created successfully",
        description: "Check the task in your all tasks section on the sidebar",
      });
      console.log("Task created successfully:", response.data);
      // Handle success (e.g., show a success message or close the sheet)
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        variant: "destructive",
        title: "Failed to create task",
        description: error ? `${error}` : "Something went wrong",
      });
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button className="bg-indigo-700">Create A Task</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create task</SheetTitle>
          <SheetDescription>
            Keep up with your everyday tasks and schedules. Fill out these forms
            accurately.
          </SheetDescription>
        </SheetHeader>
        <main className="flex flex-col gap-4 mt-14">
          {/* Reoccurring task */}
          <div className="flex items-center gap-2" id="input_group">
            <h4>Reoccurring task?</h4>
            <RadioGroup
              className="grid-flow-col"
              defaultValue="no"
              onValueChange={setIsRecurring}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="r2" />
                <label htmlFor="r2">Yes</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="r3" />
                <label htmlFor="r3">No</label>
              </div>
            </RadioGroup>
          </div>
          {/* Task Name */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="task_name">Task name</label>
            <Input
              type="text"
              id="task_name"
              placeholder="Fix the website ui"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Task Duration */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="task_duration">Task Duration</label>
            <Input
              type="text"
              id="task_duration"
              placeholder="01:50:30"
              value={taskDuration}
              onChange={(e) => setTaskDuration(e.target.value)}
            />
          </div>
          {/* Deadline */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="task_deadline">Task Deadline</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {dueDate ? (
                    format(dueDate, "PPP")
                  ) : (
                    <span>Pick a dueDate</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Task Category */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="task_category">Task category</label>
            <Select onValueChange={setTaskCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="- Select category -" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="backend">Backend Development</SelectItem>
                <SelectItem value="app">Application Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Task Tools */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="task_tools">Task Tools</label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                id="task_tools"
                placeholder="Adobe XD"
                value={tool}
                onChange={(e) => setTool(e.target.value)}
              />
              {tool && (
                <Button
                  type="button"
                  onClick={handleAddTool}
                  className="bg-[#BFA7E5]"
                >
                  Add
                </Button>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 flex-wrap">
              {tools.map((t, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 px-2 rounded-lg bg-indigo-50 text-xs"
                >
                  <span className="capitalize">{t}</span>
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    onClick={() => handleRemoveTool(index)}
                    className="text-red-500 text-xs"
                  >
                    X
                  </Button>
                </span>
              ))}
            </div>
          </div>
          {/* Add assignee */}
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            <label htmlFor="assign" className="mb-5">
              Assign Task
            </label>
            <ContextMenu>
              <ContextMenuTrigger className="cursor-crosshair flex items-center justify-center gap-2 w-[150px] p-2 ring-1 ring-[#BFA7E5] rounded-full text-[#BFA7E5] text-xs">
                <Image
                  src="/assets/images/member1.png"
                  alt="avatar"
                  width={16}
                  height={16}
                />
                Assign to
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => alert("User assigned!")}>
                  User 1
                </ContextMenuItem>
                <ContextMenuItem onClick={() => alert("User assigned!")}>
                  User 2
                </ContextMenuItem>
                <ContextMenuItem onClick={() => alert("User assigned!")}>
                  User 3
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
          {/* Create Task Button */}
          <Button
            className="bg-indigo-700 mt-5"
            onClick={handleCreateTask}
            disabled={loading} // Disable button when loading
          >
            {loading ? <Loader2 className="animate-spin ease-linear" /> : null}{" "}
            {/* Change button text */}
            {loading ? "Creating..." : "Create Task"} {/* Change button text */}
          </Button>
        </main>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTask;
