import './App.css';
import AppRouter from './appRouter';
import { withRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default withRouter(App);
