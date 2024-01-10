import { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { message: action.message, visible: true };
    case 'HIDE_NOTIFICATION':
      return { ...state, visible: false };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotification = () => {
  const [notificationState, dispatch] = useContext(NotificationContext);
  return (message) => dispatch({ type: 'SHOW_NOTIFICATION', message });
};

export const NotificationContextProvider = ({ children }) => {
  const initialState = { message: '', visible: false };
  const [notificationState, notificationDispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={[notificationState, notificationDispatch]}> {children} </NotificationContext.Provider>
  );
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default NotificationContext;
