import { ReactChild, ReactFragment, ReactPortal } from "react";

export type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

export type link = {
  link: string;
  onClick: () => number | void;
};

export interface IPlayerCredentials {
  userName: string;
}

export interface INotificationsPayload {
  title: Notification;
}

export type Notification = string;

export interface NotificationsState {
  notifications: Notification[];
}
