import React from "react";
import Challenges from "./challenges";
import NotificationsMenu from "./notifications-menu";

type Props = {};

const Notificationbar: React.FC = (props: Props) => {
  return (
    <section className="col-span-1 ring-1 ring-[#999999] pt-10 h-screen flex flex-col gap-">
      {" "}
      <NotificationsMenu />
      <Challenges />
    </section>
  );
};

export default Notificationbar;
