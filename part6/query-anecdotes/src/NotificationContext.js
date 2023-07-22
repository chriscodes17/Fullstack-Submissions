import { useReducer, createContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "display":
      return `${action.content}`;
    case "hide":
      return "";
    default:
      return state;
  }
};

const notificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "");

  return (
    <notificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </notificationContext.Provider>
  );
};

export const notificationActionHandler = (content) => {
  return (dispatch) => {
    dispatch({ type: "display", content });
    setTimeout(() => {
      dispatch({ type: "hide" });
    }, 5000);
  };
};

export default notificationContext;
