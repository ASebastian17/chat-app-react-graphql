import mongoose, { Types, Schema } from "mongoose";

export interface IMessage extends Document {
  chatroom: Types.ObjectId;
  sender: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    chatroom: {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
