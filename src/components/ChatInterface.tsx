import React, { useState, useRef, useEffect } from 'react';
import { Box, VStack, Input, Button, Text, Flex, Icon } from '@chakra-ui/react';
import { FaRobot, FaUser, FaTerminal } from 'react-icons/fa';

interface Message {
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ChatInterfaceProps {
  agentName: string;
  agentCodename: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ agentName, agentCodename }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAgentResponse = (userMessage: string): string => {
    const responses = [
      `[${agentCodename}] Analyzing query: "${userMessage.substring(0, 30)}${userMessage.length > 30 ? '...' : ''}"`,
      `[${agentCodename}] Processing request... Standby for response...`,
      `[${agentCodename}] Executing command sequence. Initializing response protocol...`,
      `[${agentCodename}] Data analysis complete. Formulating tactical response...`,
      `[${agentCodename}] Query received. Accessing neural network for optimal response...`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        text: generateAgentResponse(inputText),
        sender: 'agent',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box className="chat-container">
      <Flex align="center" mb={4} p={2} borderBottom="1px solid var(--neon-blue)">
        <Icon as={FaTerminal} color="var(--neon-blue)" mr={2} />
        <Text color="var(--neon-blue)" fontWeight="bold" letterSpacing="wide">
          COMMUNICATION TERMINAL - {agentName}
        </Text>
      </Flex>

      <Box flex="1" overflowY="auto" mb={4} className="chat-messages">
        <VStack spacing={4} align="stretch">
          {messages.map((message, index) => (
            <Flex
              key={index}
              justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
              className={message.sender === 'user' ? 'user-message' : 'agent-message'}
            >
              <Box
                maxW="80%"
                p={3}
                borderRadius="lg"
                position="relative"
                className={`message ${message.sender}-message`}
              >
                <Flex align="center" mb={2}>
                  <Icon
                    as={message.sender === 'user' ? FaUser : FaRobot}
                    color={message.sender === 'user' ? 'var(--neon-blue)' : 'var(--neon-purple)'}
                    mr={2}
                  />
                  <Text
                    fontSize="xs"
                    color={message.sender === 'user' ? 'var(--neon-blue)' : 'var(--neon-purple)'}
                    fontWeight="bold"
                    letterSpacing="wide"
                  >
                    {message.sender === 'user' ? 'USER' : agentCodename}
                  </Text>
                </Flex>
                <Text color="var(--text-primary)" fontSize="sm">
                  {message.text}
                </Text>
                <Text
                  fontSize="xs"
                  color="gray.500"
                  textAlign="right"
                  mt={1}
                  opacity={0.7}
                >
                  {message.timestamp.toLocaleTimeString()}
                </Text>
              </Box>
            </Flex>
          ))}
          {isTyping && (
            <Flex align="flex-start" className="agent-message">
              <Box className="typing-indicator">
                <Box className="typing-dot"></Box>
                <Box className="typing-dot"></Box>
                <Box className="typing-dot"></Box>
              </Box>
            </Flex>
          )}
          <div ref={messagesEndRef} />
        </VStack>
      </Box>

      <Flex className="chat-input-container">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter command..."
          className="message-input"
          disabled={isTyping}
          _placeholder={{ color: 'gray.500' }}
        />
        <Button
          onClick={handleSendMessage}
          className="cyber-button"
          disabled={isTyping}
          ml={2}
          px={6}
        >
          SEND
        </Button>
      </Flex>
    </Box>
  );
};

export default ChatInterface;
