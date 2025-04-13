import mongoose, { Schema, Types } from "mongoose";

export interface IChatRoom extends Document {
  name: string;
  messages?: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const chatRoomSchema = new Schema<IChatRoom>(
  {
    name: {
      type: String,
      required: true,
      default: "New Chat room",
    },
    messages: [{
      type: Schema.Types.ObjectId,
      ref: "Message",
    }],
  },
  {
    timestamps: true,
  },
);

const ChatRoomModel = mongoose.model<IChatRoom>("ChatRoom", chatRoomSchema);

export default ChatRoomModel;
