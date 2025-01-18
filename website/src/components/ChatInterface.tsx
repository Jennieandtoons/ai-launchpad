import React, { useState, useRef, useEffect } from 'react';
import { Box, VStack, Input, Button, Text, Flex, Icon } from '@chakra-ui/react';
import { FaRobot, FaUser, FaTerminal } from 'react-icons/fa';

interface Message {
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  context?: string;
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
  const [lastContext, setLastContext] = useState<string>('initial');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string, context: string): string => {
    const timestamp = new Date().toLocaleTimeString();
    const message = userMessage.toLowerCase();

    // Context-aware responses
    const responses = {
      cybertron: [
        `Our homeworld Cybertron stands as a testament to our technological advancement and cultural heritage. Though the war has scarred our planet, its glory endures in the sparks of every Cybertronian.`,
        `Cybertron's history is rich with both triumph and tragedy. As its protector, I have witnessed its golden age and its darkest hours. We must preserve what remains.`,
        `The technological marvels of Cybertron far surpass anything on Earth. Yet, it's not merely about advancement - it's about the preservation of our way of life.`
      ],
      combat: [
        `In combat, strategic superiority often proves more decisive than raw firepower. Every engagement requires careful consideration of both offensive and defensive capabilities.`,
        `While my combat protocols are extensive, I prefer to resolve conflicts through tactical superiority rather than brute force. Prevention is often the best strategy.`,
        `Battle readiness is crucial, but a true warrior knows when to fight and when to seek alternative solutions. Each conflict demands its own unique approach.`
      ],
      earth: [
        `Earth, despite its technological limitations, has proven itself worthy of protection. Your species shows remarkable resilience and adaptability.`,
        `My commitment to Earth's defense remains unwavering. While your methods may seem primitive, your potential for growth is significant.`,
        `The alliance between Earth and Cybertron must be maintained and strengthened. Both worlds face common threats that require unified response.`
      ],
      leadership: [
        `Leadership demands more than issuing commands. It requires wisdom, foresight, and an unwavering commitment to those under your protection.`,
        `As a Prime, my duty extends beyond tactical decisions. The welfare of both Cybertronians and humans falls under my jurisdiction.`,
        `Command is a burden I bear with both pride and humility. Every decision must be weighed against its impact on both our worlds.`
      ],
      decepticons: [
        `The Decepticon threat remains a constant concern. Their actions have brought nothing but destruction to both our worlds.`,
        `While Megatron's forces possess formidable strength, their greatest weakness lies in their disregard for life and freedom.`,
        `We must remain vigilant against Decepticon aggression. Their methods may change, but their ultimate goal of domination remains constant.`
      ],
      autobots: [
        `The Autobots stand as guardians of both Cybertron and Earth. Our commitment to justice and protection never wavers.`,
        `Each Autobot brings unique capabilities to our cause. Together, we form a formidable force against any threat.`,
        `The Autobot code emphasizes protection and respect for all forms of life. These principles guide every action we take.`
      ],
      technology: [
        `Cybertronian technology represents millennia of advancement. Yet, we must be judicious in sharing it with Earth.`,
        `Our technological capabilities extend far beyond mere weaponry. Transportation, communication, energy - all aspects serve our mission of protection.`,
        `The integration of Cybertronian technology with Earth's infrastructure requires careful consideration and safeguards.`
      ],
      mission: [
        `My primary directive remains clear: protect both Cybertron and Earth from any threats that may arise.`,
        `Our mission encompasses more than combat. Diplomatic relations, technological advancement, cultural preservation - all fall within our scope.`,
        `The preservation of peace requires constant vigilance and adaptation to new challenges.`
      ],
      personal: [
        `As Sentinel Prime, I carry the weight of both leadership and legacy. My experiences have shaped my approach to protection and governance.`,
        `My role extends beyond military command. I serve as both protector and guide for those under my care.`,
        `The mantle of Prime brings great responsibility. Every action must serve the greater good of both our worlds.`
      ]
    };

    // Determine context based on message content
    let newContext = context;
    if (message.includes('cybertron') || message.includes('home') || message.includes('planet')) newContext = 'cybertron';
    else if (message.includes('fight') || message.includes('battle') || message.includes('combat')) newContext = 'combat';
    else if (message.includes('earth') || message.includes('human')) newContext = 'earth';
    else if (message.includes('lead') || message.includes('command')) newContext = 'leadership';
    else if (message.includes('decepticon') || message.includes('megatron')) newContext = 'decepticons';
    else if (message.includes('autobot') || message.includes('team')) newContext = 'autobots';
    else if (message.includes('tech') || message.includes('weapon')) newContext = 'technology';
    else if (message.includes('mission') || message.includes('duty')) newContext = 'mission';
    else if (message.includes('you') || message.includes('your')) newContext = 'personal';

    // Get response based on context
    const contextResponses = responses[newContext as keyof typeof responses] || responses.mission;
    const response = contextResponses[Math.floor(Math.random() * contextResponses.length)];

    setLastContext(newContext);
    return `[${agentCodename}:${timestamp}] ${response}`;
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

    // Generate response
    setTimeout(() => {
      const agentMessage: Message = {
        text: generateResponse(inputText, lastContext),
        sender: 'agent',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box className="chat-container" position="relative" height="600px" bg="rgba(10, 10, 31, 0.9)" borderRadius="lg" borderWidth="1px" borderColor="var(--neon-blue)">
      {/* Latest message display at the top */}
      {messages.length > 0 && (
        <Box 
          position="absolute" 
          top="0" 
          left="0" 
          right="0" 
          p={6}
          borderBottom="1px solid var(--neon-blue)"
          bg="rgba(10, 10, 31, 0.95)"
        >
          <Flex align="center" mb={3}>
            <Icon
              as={messages[messages.length - 1].sender === 'user' ? FaUser : FaRobot}
              color={messages[messages.length - 1].sender === 'user' ? 'var(--neon-blue)' : 'var(--neon-purple)'}
              mr={3}
              w={6}
              h={6}
            />
            <Text
              fontSize="sm"
              color={messages[messages.length - 1].sender === 'user' ? 'var(--neon-blue)' : 'var(--neon-purple)'}
              fontWeight="bold"
              letterSpacing="wide"
              className="message-sender"
            >
              {messages[messages.length - 1].sender === 'user' ? 'USER' : agentCodename}
            </Text>
          </Flex>
          <Text 
            color="var(--text-primary)" 
            fontSize="lg" 
            className="message-text"
            pl={9}
          >
            {messages[messages.length - 1].text}
          </Text>
        </Box>
      )}

      {/* Chat input fixed at the bottom */}
      <Box 
        position="absolute" 
        bottom="0" 
        left="0" 
        right="0" 
        p={4}
        bg="rgba(10, 10, 31, 0.95)"
        borderTop="1px solid var(--neon-blue)"
      >
        <Flex>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter command..."
            className="message-input"
            disabled={isTyping}
            _placeholder={{ color: 'gray.500' }}
            spellCheck="false"
            autoComplete="off"
            bg="rgba(0, 0, 0, 0.3)"
            borderColor="var(--neon-blue)"
            _focus={{
              borderColor: 'var(--neon-purple)',
              boxShadow: '0 0 0 1px var(--neon-purple)'
            }}
          />
          <Button
            onClick={handleSendMessage}
            className="cyber-button"
            disabled={isTyping}
            ml={2}
            px={6}
            borderColor="var(--neon-blue)"
            _hover={{
              borderColor: 'var(--neon-purple)',
              color: 'var(--neon-purple)'
            }}
          >
            SEND
          </Button>
        </Flex>
        {isTyping && (
          <Flex mt={2} align="center">
            <Box className="typing-indicator" ml={2}>
              <Box className="typing-dot"></Box>
              <Box className="typing-dot"></Box>
              <Box className="typing-dot"></Box>
            </Box>
          </Flex>
        )}
      </Box>

      {/* Hidden scroll reference */}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatInterface;
