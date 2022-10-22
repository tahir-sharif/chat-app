import Routes from "./Routes";
import "./App.css";
import UserAccess from "./access-control/UserAccess";

function App() {
  return (
    <div className="App">
      <UserAccess>
        <Routes />
      </UserAccess>
    </div>
  );
}

export default App;
