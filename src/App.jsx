import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./app/context/AuthProvider";
import { Router } from "./app/router/Router";

import "./app/styles/reset.css";
import "./app/styles/variables.scss";
import "./app/styles/styles.scss";


function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={Router} />

        
      </AuthProvider>
    </>
  );
}

export default App;
