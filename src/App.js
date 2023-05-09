import Routes from './Routes';
import UserAccess from './access-control/UserAccess';
import { useEffect } from 'react';
import cookie from 'react-cookies';
import { socket } from './socket';
import './App.css';

function App() {
  const jwt = cookie.load('jwt');

  useEffect(() => {
    console.log('Application started on', process.env.NODE_ENV, 'mode');
  }, []);

  const connectSocket = () => {
    socket.connect({ token: `Bearer ${jwt}` });
  };

  const disconnectSocket = () => {
    socket.disconnect();
  };

  return (
    <div className="App">
      <UserAccess jwt={jwt} onLoad={connectSocket} onError={disconnectSocket}>
        <Routes />
      </UserAccess>
    </div>
  );
}

export default App;
