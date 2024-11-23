"use client";
import { Button } from "@/components/ui/button";
import Register from "@/components/shared/Register";
import Login from "@/components/shared/Login";
import { useState } from "react";

// Define the props for the Page component
const Page: React.FC = () => {
  const [formState, setFormState] = useState<"register" | "login">("register");

  const setForm = (state: "register" | "login") => {
    setFormState(state);
  };

  const registerUser = () => {
    setForm("register");
  };

  const loginUser = () => {
    setForm("login");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold capitalize text-center">
          User Authentication
        </h1>
        <section className="max-w-[500px] p-[10px] overflow-hidden">
          <header className="flex w-full p-2 bg-slate-200 rounded-lg">
            <Button
              onClick={registerUser}
              className={`w-1/2 text-black ${
                formState === "register" ? "bg-white" : ""
              }`}
              variant={"ghost"}
            >
              Register User
            </Button>
            <Button
              onClick={loginUser}
              className={`w-1/2 text-black ${
                formState === "login" ? "bg-white" : ""
              }`}
              variant={"ghost"}
            >
              Login User
            </Button>
          </header>
          <main
            className={`w-full p-2 flex gap-1 ${
              formState === "register" ? "" : "transform -translate-x-[500px]"
            } transition-transform duration-300 ease-in-out`}
          >
            <Register view={formState} setView={setForm} />
            <Login />
          </main>
        </section>
      </div>
    </div>
  );
};

export default Page;
