/* NOTIFICATION TYPES*/
export interface INotificationsPayload {
  title: Notification;
}

export type Notification = string;

export interface NotificationsState {
  notifications: Notification[];
}
