"use client";

import React, { ButtonHTMLAttributes, FC, HTMLAttributes } from "react";
import { Button } from "../ui/button";
import {
  setNotification,
  triggerNotification,
} from "@/store/slice/NotificationsSlice";
import { useDispatch } from "react-redux";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Notifications: FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={className + ""} {...props}>
      {children}
    </div>
  );
};

interface TriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick?: () => void;
}

// Trigger Notification Button
function NotificationTrigger({
  children,
  className,
  handleClick,
  ...props
}: TriggerProps) {
  const dispatch = useDispatch();

  const handleNotify = () => {
    // handle other outside functions

    handleClick && handleClick();
    // Update the notification data
    dispatch(
      setNotification({
        // title: "New Notification Title",
        // body: "This is the updated body of the notification",
        data: { customKey: "Custom Data" }, // Ensure all values are serializable
      })
    );

    // Trigger the notification
    dispatch(triggerNotification());
  };

  return (
    <Button className={className + ""} {...props} onClick={handleNotify}>
      {children ? children : "Trigger Notification"}
    </Button>
  );
}

interface NotificationTitleProps {
  className?: string;
  title: string; // Pass in the title as a prop
}

const NotificationTitle: FC<NotificationTitleProps> = ({
  className,
  title,
}) => {
  const dispatch = useDispatch();

  // Dispatch the title when the component renders
  React.useEffect(() => {
    dispatch(setNotification({ title }));
  }, [title, dispatch]);

  return <h3 className={className + " hidden"}>{title}</h3>;
};

interface NotificationBodyProps {
  className?: string;
  body: string; // Pass in the body as a prop
}
const NotificationBody: FC<NotificationBodyProps> = ({ className, body }) => {
  const dispatch = useDispatch();

  // Dispatch the body when the component renders
  React.useEffect(() => {
    dispatch(setNotification({ body }));
  }, [body, dispatch]);

  return <p className={className + " hidden"}>{body}</p>;
};

export {
  Notifications,
  NotificationTrigger,
  NotificationBody,
  NotificationTitle,
};
