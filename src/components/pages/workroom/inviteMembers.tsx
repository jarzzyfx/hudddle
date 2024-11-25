"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Chip, ChipImage, ChipTitle } from "@/components/shared/Chip";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchWorkrooms } from "@/services/workroom"; // Update with the actual service to fetch workrooms
import { toast } from "@/components/ui/use-toast"; // Import toast for notifications
import axios from "axios";
import Cookies from "js-cookie";
import { getUsersInWorkroom } from "@/lib/utils";

const InviteMembers = ({ roomId }: { roomId: string }) => {
  const [workrooms, setWorkrooms] = useState<any[]>([]); // Adjust type based on your response
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any[]>([]); // State to hold the users in the workroom
  const [email, setEmail] = useState<string>(""); // Input state for email
  const [error, setError] = useState<string | null>(null); // Error state

  const addUserToWorkroom = async (email: string) => {
    try {
      const token = Cookies.get("user_token"); // Get the token from cookies

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await axios.post(
        "https://huddle-api.onrender.com/api/v1/workroom/room/add-user",
        {
          roomId: roomId, // Pass the roomId
          email: email, // Pass the email of the user to add
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      // Show a toast notification on success
      toast({
        variant: "success",
        title: "User has been invited.",
      });

      // Refresh the users in the workroom
      getUsersInWorkroom(roomId, setUsers);
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        variant: "destructive",
        title: "There was an error inviting this user.",
      });
    }
  };

  // Fetch workrooms
  useEffect(() => {
    const getWorkrooms = async () => {
      try {
        const rooms = await fetchWorkrooms();
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

  // Fetch users when the roomId is available
  useEffect(() => {
    if (roomId) {
      getUsersInWorkroom(roomId, setUsers); // Fetch users when roomId is available
    }
  }, [roomId]); // This ensures that the users are fetched whenever roomId changes

  if (loading) {
    return <div>Loading workrooms...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="addTeamMembers"
          className="font-normal text-[16px] leading-[16px] text-[#44546F]"
        >
          Add team members
        </label>
        <span className="flex gap-8 items-center">
          <Input
            className="w-[336px] h-[60px] neo-effect ring-1 ring-[#091E4224] text-[#626F86] text-[18px] leading-[20px] font-normal outline-none"
            placeholder="Email address"
            name="addTeamMembers"
            id="addTeamMembers"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
          <Button
            variant={"ghost"}
            onClick={() => addUserToWorkroom(email)} // Call function to add user on button click
          >
            <Plus className="text-[#956FD666] w-[14px] h-[14px] text-[14px]" />
          </Button>
        </span>
      </div>

      <div className="w-[550px] flex flex-wrap h-fit gap-2">
        {users.length === 0 ? (
          <p>No members in this workroom.</p>
        ) : (
          users.map((user) => (
            <Chip key={user._id}>
              <ChipImage src="/assets/images/member1.png" />
              <ChipTitle>{user.fullname}</ChipTitle>
            </Chip>
          ))
        )}
      </div>

      <Button className="w-[330px] bg-[#956FD699] mt-10">
        Invite team members
      </Button>
    </main>
  );
};

export default InviteMembers;
