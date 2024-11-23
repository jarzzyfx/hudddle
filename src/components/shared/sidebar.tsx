"use client";

import { FC, HTMLAttributes } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store"; // Adjust path as necessary
import { useRouter } from "next/navigation";
import { clearUser } from "@/store/slice/userSlice";
import { Button } from "@/components/ui/button";
import { sideLinks } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

interface UserOnlineStatusProps extends HTMLAttributes<HTMLDivElement> {
  isOnline: boolean;
  statusText?: boolean | string;
}
const onlinestatusstyles = cva("flex items-center gap-2");

export const UserOnlineStatus: FC<UserOnlineStatusProps> = ({
  isOnline,
  statusText,
  className,
}) => {
  return (
    <div className={cn(onlinestatusstyles({ className }))}>
      {!isOnline ? (
        <span className="w-2 h-2 bg-slate-200 rounded-full" />
      ) : (
        <span className="w-2 h-2 bg-[#ADD359] rounded-full" />
      )}
      {statusText && (
        <h6
          className={`text-xs ${
            !isOnline ? "text-slate-200" : "text-[#ADD359]"
          }`}
        >
          {isOnline ? "Online" : statusText}
        </h6>
      )}
    </div>
  );
};
const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { fullname, email } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    // Clear the user token from cookies
    Cookies.remove("user_token");

    // Remove the user from localStorage
    localStorage.removeItem("user");

    // Dispatch the clearUser action to reset the Redux store
    dispatch(clearUser());

    // Redirect to the user authentication page
    router.push("/user_auth");
  };

  return (
    <section className="col-span-1 w-[232px] ring-1 ring-[#999999] flex items-start justify-center py-10 px-6 h-screen">
      <div className="w-full h-full flex flex-col gap-[40px] items-center">
        <Link href={"/"}>
          <Image src={"/assets/logo.svg"} alt="logo" width={100} height={50} />
        </Link>

        {/* User bar */}
        <div className="relative shadow-xl mt-[50px] w-full h-fit rounded-[10px] bg-[#956FD6] px-[14px] py-[4px]">
          <div className="-translate-y-[60%] w-full h-fit flex justify-center ">
            <Image
              className="rounded-full shadow-xl"
              width={100}
              height={100}
              src={"/assets/profileImage.svg"}
              alt="user image"
              loading="lazy"
            />
          </div>
          <header className="w-full -translate-y-[40%] flex flex-col items-center gap-[4px] px-8">
            <UserOnlineStatus isOnline statusText />
            <h1 className="text-[21px] text-[#FFFFFF] font-semibold text-center flex gap-2 items-end flex-wrap">
              {fullname.split(" ").slice(0, 1) || "Guest"}{" "}
              {fullname.split(" ").slice(1, 2) || "User"}
            </h1>
            <p className="font-normal text-[12px] leading-[16px] text-white text-center">
              {email || "No email available"}
            </p>
          </header>

          {/* Links */}
          <div className="flex flex-col w-full h-fit gap-[24px] pb-[14px]">
            {sideLinks.map((link, i) => (
              <Link key={i} href={link.url}>
                <Button
                  onClick={() => {
                    if (i === sideLinks.length - 1) {
                      handleLogout();
                    }
                  }}
                  className="text-white w-full hover:bg-[#EEAE05] hover:text-[#fff] text-[14px] gap-2 font-normal justify-start"
                  variant={"ghost"}
                >
                  <Image
                    width={20}
                    height={20}
                    alt={link.text}
                    src={`${link.icon}`}
                  />
                  <span>{link.text}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full p-[14px] flex flex-col gap-2">
          <p className="font-normal text-[14px] leading-[20px] text-[#707070]">
            Frequently used tools
          </p>
          <div className="flex items-center gap-2">
            {/* Replace with actual tool icons */}
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Sidebar;
