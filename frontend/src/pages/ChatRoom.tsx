import { useSubscription, useQuery, useMutation } from "@apollo/client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import {
  GET_CHATROOM,
  SEND_MESSAGE,
  MESSAGE_SUBSCRIPTION,
} from "../graphql/queries";

const ChatRoom = () => {
  const { roomId } = useParams();

  const username = localStorage.getItem("username") || "Unknown";
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { data, loading, error } = useQuery(GET_CHATROOM, {
    variables: { id: roomId },
  });

  const { data: subData } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { chatRoomId: roomId },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    if (data?.getChatRoom?.messages) {
      setMessages(data.getChatRoom.messages);
    }
  }, [data]);

  useEffect(() => {
    if (subData?.messageSent) {
      setMessages((prev) => [...prev, subData.messageSent]);
    }
  }, [subData?.messageSent]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    await sendMessage({
      variables: {
        chatRoomId: roomId,
        content: newMessage,
        sender: username,
      },
    });

    setNewMessage("");
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-4">Error loading chatroom</p>
    );

  return (
    <div className="w-screen h-screen bg-slate-900">
      <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-center text-white">
          Room: {data.getChatRoom.name}
        </h2>
        <h4 className="text-xl font-bold mb-4 text-center text-white">
          ID: {roomId}
        </h4>

        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-slate-700 text-white px-4 py-2 rounded-md shadow-sm mx-4"
            >
              <p className="font-semibold">{msg.sender}:</p>
              <p>{msg.content}</p>
              <p className="text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="bg-white flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-400"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
