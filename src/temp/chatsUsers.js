import { conversation } from "./conversation";
const getLastMessage = (index) => {
  const userConversation = conversation[index];
  let lastMsg = {
    message: "",
  };
  if (userConversation) {
    lastMsg = userConversation[userConversation.length - 1];
  }
  return lastMsg;
};
export const users = [
  {
    name: "Tahir Shareef",
    profileImage:
      "https://1fid.com/wp-content/uploads/2022/02/boy-dp-image-77-1024x1002.jpg",
    seen: true,
    status: "Online",
    lastMsg: getLastMessage(0),
    id: 0,
  },
  {
    name: "Shahrukh King",
    profileImage:
      "https://1fid.com/wp-content/uploads/2022/02/boy-dp-image-75-1024x1003.jpg",
    tick: true,
    status: "12 : 01 PM",
    lastMsg: getLastMessage(1),
    id: 1,
  },
  {
    name: "Haseeb Khan",
    profileImage:
      "https://cdn.statusqueen.com/dpimages/thumbnail/Mask_boy_dp_-2599.jpg",
    delivered: true,
    status: "Online",
    lastMsg: getLastMessage(2),
    id: 2,
  },
  {
    name: "Arsal Malik",
    profileImage:
      "https://ienglishstatus.com/wp-content/uploads/2022/02/Stylish-Standard-Whatsapp-DP-Boy.jpg",
    status: "Online",
    id: 3,
    lastMsg: getLastMessage(3),
  },
];
