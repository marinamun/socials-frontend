import { io } from 'socket.io-client';

let socket = null;

export const initializeSocket = () => {
  if (!socket) {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const userId = currentUser?._id;

    socket = io(import.meta.env.VITE_API_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
      query: { userId },
    });

    socket.on('connect', () => {
      console.log('Connected to server with socket ID:', socket.id);
      if (userId) {
        console.log('Joining room for user:', userId);
        socket.emit('join_room', userId);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

export default getSocket;
//