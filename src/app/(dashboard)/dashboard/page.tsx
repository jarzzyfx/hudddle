import PageDashboard from "@/components/pages/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Huddle io | Dashboard",
  description: "User dashboard interface",
};
const Dashboard: React.FC = () => {
  return (
    <main>
      <PageDashboard />
    </main>
  );
};

export default Dashboard;
