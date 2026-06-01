import { useEffect, useState } from "react";
import api from "../services/api";

function AIChat() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Load all chats
  const loadChats = async () => {
    try {
      const res = await api.get("/chats");

      setChats(res.data);

      // Open latest chat automatically
      if (
        res.data.length > 0 &&
        !activeChat
      ) {
        const latest = res.data[0];

        setActiveChat(latest._id);
        setMessages(latest.messages || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  // Create new chat
  const createNewChat = async () => {
    try {
      const res = await api.post("/chats/new");

      setChats((prev) => [
        res.data,
        ...prev,
      ]);

      setActiveChat(res.data._id);
      setMessages([]);
    } catch (error) {
      console.log(error);
    }
  };

  // Open existing chat
  const openChat = async (chatId) => {
    try {
      const res = await api.get(
        `/chats/${chatId}`
      );

      setActiveChat(chatId);
      setMessages(res.data.messages || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    let currentChatId = activeChat;

    try {
      setLoading(true);

      // Auto-create first chat
      if (!currentChatId) {
        const chatRes = await api.post(
          "/chats/new"
        );

        currentChatId = chatRes.data._id;

        setActiveChat(currentChatId);

        await loadChats();
      }

      const userText = input;

      const userMessage = {
        role: "user",
        content: userText,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      setInput("");

      // Save user message
      await api.post(
        `/chats/${currentChatId}/message`,
        userMessage
      );

      // Ask AI
      const aiRes = await api.post(
        "/ai/chat",
        {
          message: userText,
        }
      );

      const aiMessage = {
        role: "assistant",
        content: aiRes.data.reply,
      };

      // Save AI message
      await api.post(
        `/chats/${currentChatId}/message`,
        aiMessage
      );

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      // Refresh sidebar titles
      await loadChats();

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-72 bg-slate-900 text-white flex flex-col">

        <div className="p-4 border-b border-slate-700">

          <button
            onClick={createNewChat}
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded"
          >
            + New Chat
          </button>

        </div>

        <div className="flex-1 overflow-y-auto p-3">

          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() =>
                openChat(chat._id)
              }
              className={`cursor-pointer p-3 rounded mb-2 ${
                activeChat === chat._id
                  ? "bg-indigo-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {chat.title}
            </div>
          ))}

        </div>

      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">

        <div className="bg-white border-b p-4">
          <h1 className="font-bold text-xl">
            AI Business Assistant
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-slate-100">

          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              Start a new conversation
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-3xl p-3 rounded-lg mb-3 ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white ml-auto"
                  : "bg-white shadow"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="bg-white shadow p-3 rounded-lg inline-block">
              AI is thinking...
            </div>
          )}

        </div>

        <div className="bg-white border-t p-4">

          <div className="flex gap-2">

            <textarea
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder="Ask AI anything..."
              className="flex-1 border rounded-lg p-3 resize-none"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-indigo-600 text-white px-6 rounded-lg"
            >
              Send
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AIChat;