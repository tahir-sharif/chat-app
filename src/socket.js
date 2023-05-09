import { io } from 'socket.io-client';
import { apiUrl } from './url';

export const socket = {
  io: null,
  connect(query) {
    const socket = io.connect(apiUrl(true), {
      query
    });
    console.log(socket.on('connect', this.onConnect));
    this.io = socket;
  },
  disconnect() {
    this.io?.disconnect();
    this.io = null;
  },
  sendMessage(payload) {
    this.io.emit('send-message', payload, (ack) => {
      console.log('message sent', ack);
    });
  },
  onReceiveMessage(fn = () => {}) {
    this.io.on('receive-message', fn);
  },
  onConnect() {
    console.log('connected !');
  }
};
