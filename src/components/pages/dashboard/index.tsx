"use client";

import React, { useEffect, useState } from "react";
import Header from "./header";
import ProductivitySection from "./productivity-section";
import StatsCard from "./stats-card";
import { statsCardsData } from "@/data/data";
import { SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import TodaysTask from "./todays-task";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CreateTask from "@/components/shared/createTask";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const PageDashboard: React.FC = () => {
  const { fullname } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const [tasks, setTasks] = useState<any[]>([]); // Store fetched tasks
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = Cookies.get("user_token");

        if (!token) {
          throw new Error("JWT token is missing. Please log in again.");
        }

        // Fetch tasks from API
        const response = await axios.get(
          "https://huddle-api.onrender.com/api/v1/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );

        console.log(response.data); // Debugging: Log API response

        // Update tasks state directly since the API returns an array
        setTasks(response.data || []);
      } catch (error: any) {
        console.error("Error fetching tasks:", error);
        setError(error.message || "Failed to fetch tasks");
        setTasks([]); // Ensure tasks is empty on error
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const token = Cookies.get("user_token");
    if (!token) {
      router.push("/user_auth");
    }
  }, [router]);

  return (
    <section className="pt-8 pb-10 px-12">
      <Head>
        <title>Huddle | Dashboard</title>
      </Head>
      <Header
        name={fullname}
        isInWorkroom={false}
        teamName="Design Team"
        companyName="Atlassian Incorporated"
      />
      <div className="mt-10">
        <p className="text-custom-semiBlack font-semibold text-right">
          Streaks <span className="text-custom-yellow">5 days</span>
        </p>
        <ProductivitySection />
        <h1 className="mt-10 font-bold text-slate-600 text-xl">Weekly Stats</h1>
        <div className="grid grid-cols-2 mt-2 gap-x-10 gap-y-5">
          {statsCardsData.map((stat, index) => (
            <StatsCard
              key={index}
              image={stat.image}
              title={stat.title}
              description={stat.description}
              progressValue={stat.progressValue}
              progressColor={stat.progressColor}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-between items-center">
          <h1 className="font-bold text-slate-600 text-xl">
            Today&apos;s Task
          </h1>
          <SlidersHorizontal
            size={18}
            color="#D9D9D9"
            className="cursor-pointer"
          />
        </div>
        <Card className="mt-5 p-4 border-none max-h-60 overflow-y-auto neo-effect justify-center items-center">
          {loading ? (
            <div>Loading tasks...</div>
          ) : error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : tasks.length > 0 ? (
            tasks.map((task) => <TodaysTask key={task._id} task={task} />)
          ) : (
            <CreateTask />
          )}
        </Card>
      </div>
    </section>
  );
};

export default PageDashboard;
