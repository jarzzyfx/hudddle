"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/store/slice/userSlice";
import { useToast } from "../ui/use-toast";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const [useremail, setUseremail] = useState<string>("");
  const [userpassword, setUserpassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { toast } = useToast();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when the login process starts
    setError(null); // Reset any previous error
    setSuccessMessage(""); // Clear success message

    try {
      const response = await axios.post(
        "https://huddle-api.onrender.com/api/v1/user/login",
        {
          email: useremail,
          password: userpassword,
        }
      );

      const { user_token } = response.data;
      const { fullname, email } = response.data.data;

      // Fetch tasks for the logged-in user
      const tasksResponse = await axios.get(
        "https://huddle-api.onrender.com/api/v1/tasks", // Adjust endpoint if needed
        {
          headers: {
            Authorization: `Bearer ${user_token}`, // Pass token in headers
          },
        }
      );

      const tasks = tasksResponse.data; // Adjust based on API response structure

      // Dispatch user and tasks information to Redux and save to localStorage
      dispatch(setUser({ fullname, email, token: user_token }));
      localStorage.setItem("user_tasks", JSON.stringify(tasks));
      Cookies.set("user_token", user_token, { expires: 1, path: "/" });
      setSuccessMessage("Huddle up"); // Set success message

      toast({
        variant: "success",
        title: "Huddle up",
        description: "You are successfully signed in",
      });

      // Redirect to dashboard after successful login
      setTimeout(() => {
        setLoading(false); // Stop loading
        router.push("/dashboard");
      }, 500); // Optional delay for UX
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Email or Password was incorrect ",
        description: "Try signing into your account again",
      });
      setError("Login failed. Please check your credentials.");
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="min-w-[500px] h-auto flex flex-col gap-4 p-2"
    >
      <div className="flex flex-col gap-2">
        <h2>Your Email</h2>
        <Input
          type="email"
          placeholder="johndoe@gmail.com"
          value={useremail}
          onChange={(e) => setUseremail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2>Your Password</h2>
        <Input
          type="password"
          placeholder="demopass"
          value={userpassword}
          onChange={(e) => setUserpassword(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Login to your account"}
      </Button>
    </form>
  );
};

export default Login;
