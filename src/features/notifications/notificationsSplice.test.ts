import notificationsReducer, {
  requestAddNotification,
  requestRemoveNotification,
} from "./notificationsSlice";
import { NotificationsState } from "./types";

describe("notifications reducer", () => {
  const initialState: NotificationsState = {
    notifications: [],
  };
  it("should handle initial state", () => {
    expect(notificationsReducer(undefined, { type: "unknown" })).toEqual({
      notifications: [],
    });
  });

  it("should handle add notification", () => {
    let actual = notificationsReducer(
      initialState,
      requestAddNotification("test")
    );
    expect(actual.notifications).toEqual(["test"]);
  });

  it("should handle remove notification", () => {
    let actual = notificationsReducer(
      initialState,
      requestAddNotification("test")
    );
    expect(actual.notifications).toEqual(["test"]);
    actual = notificationsReducer(
      initialState,
      requestRemoveNotification("test")
    );
    expect(actual.notifications).toEqual([]);
  });
});
