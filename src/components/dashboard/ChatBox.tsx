import React, { useState } from 'react';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; from: 'patient' | 'llm' }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, from: 'patient' }]);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'I’m sorry, I didn’t understand that. Could you please clarify?', from: 'llm' },
      ]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md bg-gray-50 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Chat with Doctor</h2>
      <div className="flex flex-col space-y-4 mb-4 overflow-y-auto h-[300px]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.from === 'patient' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg ${
                message.from === 'patient' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
