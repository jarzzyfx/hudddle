"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

const CreateWorkroom = () => {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateWorkroom = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // Prevent form submission
    setLoading(true);

    try {
      // Retrieve the token from cookies
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_token="))
        ?.split("=")[1];

      if (!token) {
        alert("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }

      // Make the POST request to create a workroom
      const response = await axios.post(
        "http://localhost:4000/api/v1/workroom/room/create",
        { name: roomName }, // Payload
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        }
      );

      // Handle success
      toast({
        variant: "success",
        title: "Workroom has been created",
        description: "You can now add task to your workroom",
        action: (
          <ToastAction altText="Goto schedule to undo">
            <Link href={"/workroom"}>View rooms</Link>
          </ToastAction>
        ),
      });
      setRoomName("");
    } catch (error) {
      // Handle error
      console.error("Error creating workroom:", error);
      toast({
        variant: "destructive",
        title: "Workroom couldn't be created",
        description: "Try creating it again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleCreateWorkroom}
        className="flex flex-col w-[600px] h-auto p-6"
      >
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Create a Workroom</h1>
          <p className="text-sm font-normal text-custom-purple">
            Handle tasks efficiently with your friends and co-workers
          </p>
        </header>

        <div className="flex gap-4 pt-10 w-full h-auto">
          <div className="flex flex-col gap-2 w-full" id="group">
            <label htmlFor="roomName" className="text-sm font-medium">
              Room Name
            </label>
            <Input
              id="roomName"
              type="text"
              className="w-full"
              placeholder="Alphonso's work room"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)} // Update state on input
              required
            />
          </div>
        </div>

        <footer className="pt-10 w-full">
          <Button
            className="bg-custom-purple w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Workroom..." : "Create Workroom"}
          </Button>
        </footer>
      </form>
    </div>
  );
};

export default CreateWorkroom;
