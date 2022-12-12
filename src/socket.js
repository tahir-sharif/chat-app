import { io } from "socket.io-client";
import { apiUrl } from "./url";

export const socket = {
  io: null,
  connect() {
    const socket = io.connect(apiUrl(true));
    socket.on("connect", this.onConnect);
    this.io = socket;
  },
  disconnect() {
    this.io?.disconnect();
    this.io = null;
  },
  onConnect() {
    console.log("connected !");
  },
};
