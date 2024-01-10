import React, { useContext, useEffect } from 'react';
import NotificationContext from '../notificationContext';

const Notification = () => {
  const notificationStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notifState, dispatchNotif] = useContext(NotificationContext);

  useEffect(() => {
    if (notifState.visible) {
      const hideTimer = setTimeout(() => {
        dispatchNotif({ type: 'HIDE_NOTIFICATION' });
      }, 5000);
      return () => clearTimeout(hideTimer);
    }
  }, [notifState.visible, dispatchNotif]);

  if (!notifState.visible) return null;

  return (
    <div className="notification" style={notificationStyle}>
      {notifState.message}
    </div>
  );
};

export default Notification;
