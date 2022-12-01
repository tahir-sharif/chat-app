import Routes from "./Routes";
import "./App.css";
import UserAccess from "./access-control/UserAccess";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Application started on", process.env.NODE_ENV, "mode");
  }, []);

  return (
    <div className="App">
      <UserAccess>
        <Routes />
      </UserAccess>
    </div>
  );
}

export default App;
