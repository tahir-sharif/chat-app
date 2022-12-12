import Routes from "./Routes";
import "./App.css";
import UserAccess from "./access-control/UserAccess";
import { useEffect } from "react";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    console.log("Application started on", process.env.NODE_ENV, "mode");
  }, []);

  const connectSocket = () => {
    socket.connect();
  };

  const disconnectSocket = () => {
    socket.disconnect();
  };

  return (
    <div className="App">
      <UserAccess onLoad={connectSocket} onError={disconnectSocket}>
        <Routes />
      </UserAccess>
    </div>
  );
}

export default App;
