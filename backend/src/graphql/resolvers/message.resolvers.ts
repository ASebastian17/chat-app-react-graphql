import { GraphQLError } from "graphql";
import { PubSub, withFilter } from "graphql-subscriptions";

import ChatRoomModel from "../../models/chatroom.model";
import MessageModel from "../../models/message.model";

const pubsub = new PubSub();

const MESSAGE_SENT = "MESSAGE_SENT";

export default {
  Query: {
    getMessages: async (_parent: any, args: any) => {
      const { chatRoomId } = args;

      const chatroom = await ChatRoomModel.findById(chatRoomId);

      if (!chatroom) {
        throw new GraphQLError("Chat room not found!");
      }

      const messages = await MessageModel.find({
        chatroom: chatRoomId,
      }).populate("chatroom");

      return messages;
    },
  },

  Mutation: {
    sendMessage: async (_parent: any, args: any) => {
      const { chatRoomId, sender, content } = args;

      const message = await MessageModel.create({
        chatroom: chatRoomId,
        sender,
        content,
      });

      await ChatRoomModel.findByIdAndUpdate(chatRoomId, {
        $push: { messages: message._id },
      });

      pubsub.publish(MESSAGE_SENT, {
        messageSent: message,
        chatRoomId: chatRoomId,
      });

      return message;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([MESSAGE_SENT]),
        (payload, variables) => {
          return payload.chatRoomId === variables.chatRoomId;
        },
      ),
      resolve: (payload: any) => payload.messageSent,
    },
  },
};
