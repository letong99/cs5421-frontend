import React from "react";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentUserRole, setCurrentUserRole] = React.useState(null);

  const pushCurrentUser = (user_id, role) => {
    setCurrentUser(user_id);
    setCurrentUserRole(role);
  };

  const popCurrentUser = () => {
    setCurrentUser(null);
    setCurrentUserRole(null);
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, currentUserRole, pushCurrentUser, popCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => React.useContext(CurrentUserContext);
