import React, { ReactPortal } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Notifications.Styles.scss";
import { useNotifications } from "./useNotifications";

/**
 * Notifications
 * @description simple notification message
 * @return ReactPortal
 * */
const Notifications = (): ReactPortal => {
  const { motionSettings, remove, notifications } = useNotifications();

  return createPortal(
    <div key={"notification"} className="notification">
      <div className="notification_container">
        <ul className="notification_container_list">
          <AnimatePresence initial={false}>
            {notifications &&
              notifications.map((notification, idx: number) => {
                remove(notification);
                return (
                  <motion.li
                    className="notification_container_list_item"
                    key={idx}
                    {...motionSettings}
                  >
                    <span className="notification_container_list_item_message">
                      {notification}
                    </span>
                  </motion.li>
                );
              })}
          </AnimatePresence>
        </ul>
      </div>
    </div>,
    document.getElementById("notifications") as Element | DocumentFragment
  );
};

export default Notifications;
