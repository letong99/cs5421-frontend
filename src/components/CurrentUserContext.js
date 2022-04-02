import React, { useEffect } from "react";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(
    localStorage.getItem("user")
  );
  const [currentUserRole, setCurrentUserRole] = React.useState(
    localStorage.getItem("role")
  );

  const pushCurrentUser = (user_id, role) => {
    setCurrentUser(user_id);
    setCurrentUserRole(role);
  };

  const popCurrentUser = () => {
    setCurrentUser(null);
    setCurrentUserRole(null);
  };

  useEffect(() => {
    localStorage.setItem("user", currentUser);
    localStorage.setItem("role", currentUserRole);
  }, [currentUserRole, currentUser]);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, currentUserRole, pushCurrentUser, popCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => React.useContext(CurrentUserContext);
