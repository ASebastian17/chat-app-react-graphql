import ChatRoomModel from "../../models/chatroom.model";

export default {
  Query: {
    getChatRoom: async (_parent: any, args: any) => {
      const { id } = args;

      const chatroom = await ChatRoomModel.findById(id).populate("messages");

      return chatroom;
    },
  },

  Mutation: {
    createChatRoom: async (_parent: any, args: any) => {
      const { name } = args;

      const chatroom = await ChatRoomModel.create({ name });

      return chatroom;
    },
  },
};
