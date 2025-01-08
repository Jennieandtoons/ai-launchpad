import React, { useState, useEffect, useRef } from 'react';
import { Box, Input, Button, Text, VStack, HStack, List, ListItem } from '@chakra-ui/react';

interface CommandResponse {
  type: 'system' | 'response';
  content: string;
  timestamp: string;
}

interface CommandInterfaceProps {
  agentName: string;
}

const SUGGESTED_COMMANDS = [
  { cmd: 'STATUS REPORT', desc: 'Get current status' },
  { cmd: 'TACTICAL BRIEF', desc: 'Learn about the current mission' },
  { cmd: 'DIAGNOSTIC RUN', desc: 'Check systems' },
  { cmd: 'ENGAGE SIMULATION', desc: 'Start combat simulation' },
  { cmd: 'UPLOAD DATA', desc: 'Send new mission parameters' },
  { cmd: 'STANDBY MODE', desc: 'Place in standby mode' },
];

const COMMAND_RESPONSES: { [key: string]: string[] } = {
  'STATUS REPORT': [
    '[ZEKE SYSTEM LOG: ACTIVE]',
    '- Core Power: 100%',
    '- Tactical Systems: ONLINE',
    '- Mission Status: READY',
    '- Combat Readiness: OPTIMAL'
  ],
  'TACTICAL BRIEF': [
    '[MISSION BRIEFING LOADED]',
    'Current Objective: Secure Grid-Delta-7',
    'Threat Level: HIGH',
    'Suggested Tactics: Rapid infiltration and suppressive strikes'
  ],
  'DIAGNOSTIC RUN': [
    '[RUNNING DIAGNOSTIC...]',
    '- Power Levels: Stable',
    '- Motor Functions: Optimal',
    '- Neural Systems: Operational',
    '[ALL SYSTEMS NOMINAL]'
  ],
  'ENGAGE SIMULATION': [
    '[COMBAT SIMULATION INITIATED]',
    'Loading Virtual Environment...',
    'Calibrating Response Systems...',
    'Combat Parameters Set',
    '[SIMULATION READY]'
  ],
  'UPLOAD DATA': [
    '[DATA UPLOAD INTERFACE ACTIVE]',
    'Awaiting Mission Parameters...',
    'Secure Channel: ESTABLISHED',
    'Ready for Data Transfer'
  ],
  'STANDBY MODE': [
    '[INITIATING STANDBY SEQUENCE]',
    'Reducing Power Output...',
    'Maintaining Core Functions...',
    'Alert Systems: ACTIVE',
    '[STANDBY MODE ENGAGED]'
  ]
};

const CommandInterface: React.FC<CommandInterfaceProps> = ({ agentName }) => {
  const [command, setCommand] = useState('');
  const [responses, setResponses] = useState<CommandResponse[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const responseEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial system messages
    setResponses([
      {
        type: 'system',
        content: 'COMMAND INTERFACE ONLINE',
        timestamp: getTimestamp()
      },
      {
        type: 'system',
        content: 'Awaiting Operator Input...',
        timestamp: getTimestamp()
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [responses]);

  const scrollToBottom = () => {
    responseEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getTimestamp = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleCommand = async () => {
    if (!command.trim()) return;

    const normalizedCommand = command.toUpperCase().trim();
    setCommand('');
    setIsTyping(true);

    // Add user command to responses
    setResponses(prev => [...prev, {
      type: 'system',
      content: `> ${normalizedCommand}`,
      timestamp: getTimestamp()
    }]);

    try {
      try {
        // First try the special command handlers
        console.log('Sending command to API:', normalizedCommand);
        const response = await fetch('http://localhost:3001/api/command', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ command: normalizedCommand })
        });

        console.log('API Response status:', response.status);
        const data = await response.json();
        console.log('API Response data:', data);

        if (!response.ok) {
          throw new Error(data.error || 'Failed to process command');
        }

        const lines = data.response.split('\n');
        console.log('Processing response lines:', lines);

        // Add response line by line with delays
        for (const line of lines) {
          if (line.trim()) {
            await new Promise(resolve => setTimeout(resolve, 100));
            setResponses(prev => [...prev, {
              type: 'response',
              content: line,
              timestamp: getTimestamp()
            }]);
          }
        }
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error processing command:', error);
      setResponses(prev => [...prev, {
        type: 'response',
        content: '[SYSTEM ERROR] Communication with ZEKE AI system failed. Please try again.',
        timestamp: getTimestamp()
      }]);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand();
    }
  };

  return (
    <Box className="command-interface">
      <Box className="command-output" mb={4} p={4} height="300px" overflowY="auto">
        {responses.map((response, index) => (
          <Text
            key={index}
            className={`command-text ${response.type}`}
            color={response.type === 'system' ? 'var(--neon-blue)' : 'var(--text-primary)'}
            fontSize="sm"
            mb={1}
            fontFamily="monospace"
          >
            <Text as="span" color="var(--text-secondary)" fontSize="xs">
              [{response.timestamp}]
            </Text>
            {' '}{response.content}
          </Text>
        ))}
        {isTyping && (
          <Text color="var(--neon-green)" fontSize="sm" className="typing-indicator">
            ■
          </Text>
        )}
        <div ref={responseEndRef} />
      </Box>

      <Box className="command-suggestions" mb={4}>
        <Text color="var(--neon-purple)" fontSize="sm" mb={2}>
          Suggested Commands:
        </Text>
        <List spacing={1}>
          {SUGGESTED_COMMANDS.map((cmd, index) => (
            <ListItem 
              key={index}
              fontSize="xs"
              color="var(--text-secondary)"
              cursor="pointer"
              _hover={{ color: 'var(--neon-blue)' }}
              onClick={() => setCommand(cmd.cmd)}
            >
              {index + 1}. {cmd.cmd} - {cmd.desc}
            </ListItem>
          ))}
        </List>
      </Box>

      <HStack spacing={2}>
        <Input
          placeholder="Enter Command..."
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyPress={handleKeyPress}
          bg="rgba(0, 0, 0, 0.3)"
          border="1px solid var(--glass-border)"
          _hover={{ borderColor: 'var(--neon-blue)' }}
          _focus={{ 
            borderColor: 'var(--neon-blue)',
            boxShadow: '0 0 10px var(--neon-blue)'
          }}
          color="var(--text-primary)"
          className="command-input"
        />
        <Button
          onClick={handleCommand}
          bg="transparent"
          border="1px solid var(--neon-blue)"
          color="var(--neon-blue)"
          _hover={{
            bg: 'rgba(0, 243, 255, 0.1)',
            boxShadow: '0 0 15px var(--neon-blue)'
          }}
          className="send-button"
        >
          SEND
        </Button>
      </HStack>
    </Box>
  );
};

export default CommandInterface;
