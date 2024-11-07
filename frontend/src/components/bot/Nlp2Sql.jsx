import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const BotContainer = styled.div`
  width: 40%;
  margin: 50px auto;
  padding: 30px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 10px;
`;

const Message = styled.div`
  background-color: ${props => (props.isUser ? '#e1f5fe' : '#f1f1f1')};
  padding: 10px;
  border-radius: 12px;
  margin: 5px 0;
  max-width: 75%;
  align-self: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  word-wrap: break-word;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-top: 5px;
  resize: vertical;
  min-height: 100px;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border: 1px solid #4CAF50;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #2a1ddc;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const NLPtoSQLBot = () => {
  const [query, setQuery] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSqlQuery('');

    // Add user's message to chat history
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: query, isUser: true },
    ]);

    try {
      const response = await axios.post('http://localhost:3000/process', {
        query,
        type: 'NLPtoSQL', // specify bot type
      });

      const botMessage = response.data.output
        ? response.data.output
        : 'No SQL query generated.';

      // Add bot's response to chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, isUser: false },
      ]);
      setSqlQuery(botMessage);
    } catch (err) {
      setError('Error communicating with the server.');
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error communicating with the server.', isUser: false },
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BotContainer>
      <Title>Ask NLPtoSQL Bot</Title>

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
            placeholder="Ask something like: 'How do I fetch all students' names?'"
          />
        </InputContainer>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Generate SQL Query'}
        </SubmitButton>
      </form>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </BotContainer>
  );
};

export default NLPtoSQLBot;
