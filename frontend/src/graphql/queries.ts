import { gql } from "@apollo/client";

export const GET_CHATROOM = gql`
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      _id
      name
      messages {
        _id
        content
        sender
        createdAt
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($chatRoomId: ID!, $content: String!, $sender: String!) {
    sendMessage(chatRoomId: $chatRoomId, content: $content, sender: $sender) {
      _id
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageSent($chatRoomId: ID!) {
    messageSent(chatRoomId: $chatRoomId) {
      _id
      content
      sender
      createdAt
    }
  }
`;
