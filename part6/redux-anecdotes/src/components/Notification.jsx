import { useSelector } from 'react-redux';

const Notification = () => {
  const notificationMessage = useSelector(state => state.notification);
  if (!notificationMessage) return null;
  return (
    <div>
      {notificationMessage}
    </div>
  );
};

export default Notification;
