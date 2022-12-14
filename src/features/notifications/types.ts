export type link = {
  link: string;
  onClick: () => number | void;
};

export interface INotificationsPayload {
  title: Notification;
}

export type Notification = string;

export interface NotificationsState {
  notifications: Notification[];
}
