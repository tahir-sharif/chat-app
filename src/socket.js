import { io } from 'socket.io-client';
import { apiUrl } from './url';

export const socket = {
  io: null,
  connect(query) {
    const socket = io.connect(apiUrl(true), {
      query,
      withCredentials: true
    });
    socket.on('connect', this.onConnect);
    this.io = socket;
  },
  disconnect() {
    this.io?.disconnect();
    console.log('disconnected');
    this.io = null;
  },
  sendMessage(payload, cb = () => {}) {
    this.io.emit('send-message', payload, cb);
  },
  onReceiveMessage(fn = () => {}) {
    this.io.on('receive-message', fn);
  },
  onConnect() {
    console.log('connected !');
  }
};
