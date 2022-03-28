import "./App.css";
import AppRouter from "./appRouter";
import { withRouter } from "react-router-dom";
import { CurrentUserProvider } from "./components/CurrentUserContext"

function App() {
  return (
    <CurrentUserProvider>
      <AppRouter />
    </CurrentUserProvider>
  );
}

export default withRouter(App);
