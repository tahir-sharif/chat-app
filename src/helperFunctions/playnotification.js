import audio from '../assets/audio/notification.mp3';

export const playNotification = (type) => {
  if (type === 'receive-message') {
    new Audio(audio).play();
  }
};
