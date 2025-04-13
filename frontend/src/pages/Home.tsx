import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!username || !roomId) return alert("Fill both fields!");
    localStorage.setItem("username", username);
    navigate(`/room/${roomId}`);
  };

  const handleCreate = async () => {
    if (!username) {
      return alert("Enter a username!");
    }

    const res = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation CreateChatRoom($name: String!) {
            createChatRoom(name: $name) {
              _id
            }
          }
        `,
        variables: {
          name: roomName,
        }
      }),
    });

    const result = await res.json();

    const newRoomId = result.data.createChatRoom._id;

    localStorage.setItem("username", username);
    navigate(`/room/${newRoomId}`);
  };

  return (
    <div className="p-4 space-y-4 max-w-xl flex flex-col m-auto pt-10">
      <h1 className="text-2xl font-bold self-center">Join a chat room</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full bg-white text-black rounded-md"
      />

      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border p-2 w-full bg-white text-black rounded-md"
      />

      <button
        onClick={handleJoin}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Join Room
      </button>

      <h2 className="text-2xl font-bold self-center">
        ...Or create a new chat room
      </h2>

      <input
        type="text"
        placeholder="New room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="border p-2 w-full bg-white text-black rounded-md"
      />

      <button
        onClick={handleCreate}
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Create New Room
      </button>
    </div>
  );
};

export default Home;
