import { useDispatch, useSelector } from "react-redux";
import {
  requestRemoveNotification,
  selectNotifications,
} from "./notificationsSlice";
import { Notification } from "./types";

export const useNotifications = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector(selectNotifications);

  /**
   * remove
   * @param id
   */
  function remove(id: Notification) {
    setTimeout(() => {
      dispatch(requestRemoveNotification(id));
    }, 2500);
  }

  const motionSettings = {
    initial: { opacity: 0, y: 50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: {
      x: 50,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return { motionSettings, remove, notifications };
};
