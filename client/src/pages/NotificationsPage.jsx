import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "../components/NotificationItem";
import {
  getAllNotifications,
  readNotification,
} from "../store/notificationSlice";
import { useEffect } from "react";
function NotificationsPage() {
  const dispatch = useDispatch();

  const { notifications, loading, err } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  return (
    <div className="w-full max-h-screen  bg-light-background dark:bg-dark-background md:col-span-7 lg:col-span-4 overflow-y-auto hide-scrollbar text-light-primaryText dark:text-dark-primaryText">
      <h1 className="text-3xl font-bold mx-[30px] my-[25px] mb-[25px] text-light-primaryText dark:text-dark-primaryText">
        Notifications
      </h1>
      {loading && (
        <div className="w-full h-full flex items-center justify-center text-light-primaryText dark:text-dark-primaryText opacity-80">
          Loading...
        </div>
      )}
      {err && (
        <div className="w-full h-full flex items-center justify-center text-light-primaryText dark:text-dark-primaryText opacity-80">
          Error: {err}
        </div>
      )}

      {notifications.length == 0 && !loading && !err ? (
        <div className="w-full h-full flex items-center justify-center text-light-primaryText dark:text-dark-primaryText opacity-80">
          <p>You have no notifications yet!</p>
        </div>
      ) : (
        notifications.map((notification, index) => {
          return (
            <NotificationItem
              key={index}
              from={notification.username}
              read={notification.read}
              type={notification.type}
              toggleRead={() => {
                dispatch(readNotification(index));
              }}
            />
          );
        })
      )}
    </div>
  );
}

export default NotificationsPage;
