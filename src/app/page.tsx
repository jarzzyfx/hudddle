import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full  h-screen grid place-content-center">
      <Link href={"/user_auth"}>
        <Button>Dashboard</Button>
      </Link>

      <br />
    </div>
  );
}
