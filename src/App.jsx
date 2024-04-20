import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './app/context/AuthContextProvider';
import { Router } from './app/router/Router';

// import "./app/styles/reset.css";
// import "./app/styles/variables.scss";
// import "./app/styles/styles.scss";

import './app/styles/main_styles.css';


function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={Router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
