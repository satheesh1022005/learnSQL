import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const BotContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f9fc;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #333;
  margin: 20px 0;
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  width: 80%;
  max-width: 1200px;
  overflow-y: auto;
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
`;

const Message = styled.div`
  background-color: ${(props) => (props.isUser ? "#d1ecf1" : "#e2e3e5")};
  color: ${(props) => (props.isUser ? "#0c5460" : "#383d41")};
  padding: 12px;
  border-radius: 14px;
  margin: 8px 0;
  max-width: 75%;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  word-wrap: break-word;
`;

const InputContainer = styled.div`
  width: 80%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Textarea = styled.textarea`
  width: 500px;
  padding: 15px;
  font-size: 18px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  margin-top: 8px;
  resize: vertical;
  min-height: 120px;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border: 1px solid #4caf50;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 18px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 15px;
`;

const QueryOptimizationBot = () => {
  const [query, setQuery] = useState("");
  const [optimizedQuery, setOptimizedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOptimizedQuery("");

    // Add user's message to chat history
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: query, isUser: true },
    ]);

    try {
      const response = await axios.post("http://localhost:5000/process", {
        query,
        type: "optimized_code", // specify bot type for query optimization
      });

      const botMessage =
        response.data.output || "Optimization was not possible.";

      // Add bot's response to chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, isUser: false },
      ]);
      setOptimizedQuery(botMessage);
    } catch (err) {
      setError("Error communicating with the server.");
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error communicating with the server.", isUser: false },
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BotContainer>
      <Title>Query Optimization Bot</Title>

      <ChatContainer>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            {message.text}
          </Message>
        ))}
      </ChatContainer>

      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Textarea
            id="query"
            value={query}
            onChange={handleQueryChange}
            placeholder="Enter your SQL query for optimization..."
          />
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Optimizing..." : "Optimize Query"}
          </SubmitButton>
        </InputContainer>
      </form>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </BotContainer>
  );
};

export default QueryOptimizationBot;
