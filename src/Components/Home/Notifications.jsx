import React from "react"; 
import { useSocketContext } from "../../Socket";

const Notifications = () => {
  const { notifications } = useSocketContext();

  return (
    <div className="min-h-screen pt-[350px]">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <h3>{notification.title}</h3>
            <p>{notification.details}</p>
            <p>{notification.bookingId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
