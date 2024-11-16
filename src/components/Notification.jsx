// Notification Component Example
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL);

const Notification = ({ currentUserId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      if (data.recipientId === currentUserId) {
        setNotifications((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [currentUserId]);

  return (
    <div>
      {notifications.length > 0 && (
        <div className="notification">
          You have {notifications.length} new message(s)!
        </div>
      )}
    </div>
  );
};

export default Notification;
