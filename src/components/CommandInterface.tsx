import React, { useState, useEffect, useRef } from 'react';
import { Box, Input, Button, Text, VStack, HStack, List, ListItem } from '@chakra-ui/react';

type ResponseType = 'system' | 'response';

interface CommandResponse {
  type: ResponseType;
  content: string;
  timestamp: string;
}

interface CommandInterfaceProps {
  agentName: string;
  onCommandSuccess?: () => void;
}

interface SuggestedCommand {
  cmd: string;
  desc: string;
}

interface CommandResponseMap {
  [key: string]: string[];
}

const SUGGESTED_COMMANDS: SuggestedCommand[] = [
  { cmd: 'STATUS REPORT', desc: 'Get current status' },
  { cmd: 'TACTICAL BRIEF', desc: 'Learn about the current mission' },
  { cmd: 'DIAGNOSTIC RUN', desc: 'Check systems' },
  { cmd: 'ENGAGE SIMULATION', desc: 'Start combat simulation' },
  { cmd: 'UPLOAD DATA', desc: 'Send new mission parameters' },
  { cmd: 'STANDBY MODE', desc: 'Place in standby mode' },
];

const COMMAND_RESPONSES: CommandResponseMap = {
  'STATUS REPORT': [
    '[ZEKE STATUS REPORT]',
    '- Core Systems: OPERATIONAL',
    '- Combat Readiness: 98%',
    '- Mission Status: ACTIVE',
    '- Current Objective: Secure Grid-Delta-7',
    '- Threat Assessment: HIGH',
    '- Tactical Systems: FULLY OPERATIONAL',
    '- Neural Network: OPTIMAL',
    '[END REPORT]'
  ],
  'TACTICAL BRIEF': [
    '[TACTICAL ANALYSIS]',
    'Current Mission: Secure Grid-Delta-7',
    'Threat Level: HIGH',
    'Enemy Activity: Detected in sectors A3, B7',
    'Recommended Action: Rapid infiltration with defensive positioning',
    'Strategic Assets: 3 key points identified',
    'Support Systems: Ready for deployment',
    '[END BRIEF]'
  ],
  'DIAGNOSTIC RUN': [
    '[DIAGNOSTIC SCAN INITIATED]',
    '- Core Processing: 100% efficiency',
    '- Combat Protocols: Active',
    '- Tactical Database: Synchronized',
    '- Response Systems: Optimal',
    '- Neural Network: Stable',
    '- Battlefield Analysis: Active',
    '[ALL SYSTEMS NOMINAL]'
  ],
  'ENGAGE SIMULATION': [
    '[COMBAT SIMULATION INITIATED]',
    'Loading Virtual Environment...',
    'Calibrating Response Systems...',
    'Combat Parameters Set',
    'Initializing Combat Scenario Delta-7',
    'Enemy Forces: Detected',
    'Tactical Options: Generated',
    '[SIMULATION READY]'
  ],
  'UPLOAD DATA': [
    '[DATA UPLOAD INTERFACE ACTIVE]',
    'Awaiting Mission Parameters...',
    'Secure Channel: ESTABLISHED',
    'Encryption Protocol: ACTIVE',
    'Data Buffers: CLEAR',
    'Ready for Data Transfer',
    '[AWAITING INPUT]'
  ],
  'STANDBY MODE': [
    '[INITIATING STANDBY SEQUENCE]',
    'Reducing Power Output...',
    'Maintaining Core Functions...',
    'Alert Systems: ACTIVE',
    'Passive Scanning: ENABLED',
    'Emergency Protocols: READY',
    '[STANDBY MODE ENGAGED]'
  ]
};

// Generic responses for unrecognized commands
const GENERIC_RESPONSES = [
  '[ZEKE RESPONSE] Command acknowledged. Analyzing tactical implications...',
  '[ZEKE RESPONSE] Processing request. Standby for tactical assessment...',
  '[ZEKE RESPONSE] Input received. Calculating optimal response...',
  '[ZEKE RESPONSE] Command registered. Evaluating strategic options...',
  '[ZEKE RESPONSE] Signal received. Analyzing battlefield relevance...'
];

const CommandInterface: React.FC<CommandInterfaceProps> = ({ agentName, onCommandSuccess }) => {
  const [command, setCommand] = useState<string>('');
  const [responses, setResponses] = useState<CommandResponse[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const responseEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial system messages
    setResponses([
      {
        type: 'system',
        content: '[ZEKE AI] COMMAND INTERFACE ONLINE',
        timestamp: getTimestamp()
      },
      {
        type: 'system',
        content: '[ZEKE AI] Combat Systems: ACTIVE',
        timestamp: getTimestamp()
      },
      {
        type: 'system',
        content: '[ZEKE AI] Awaiting Tactical Input...',
        timestamp: getTimestamp()
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [responses]);

  const scrollToBottom = (): void => {
    responseEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getTimestamp = (): string => {
    return new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getResponse = (cmd: string): string[] => {
    const normalizedCmd = cmd.toUpperCase();
    if (normalizedCmd in COMMAND_RESPONSES) {
      return COMMAND_RESPONSES[normalizedCmd];
    }
    return [GENERIC_RESPONSES[Math.floor(Math.random() * GENERIC_RESPONSES.length)]];
  };

  const handleCommand = async (): Promise<void> => {
    if (!command.trim()) return;

    const normalizedCommand = command.toUpperCase().trim();
    setCommand('');
    setIsTyping(true);

    // Add user command to responses
    setResponses((prev: CommandResponse[]) => [...prev, {
      type: 'system',
      content: `> ${normalizedCommand}`,
      timestamp: getTimestamp()
    }]);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get response lines
    const responseLines = getResponse(normalizedCommand);

    // Add response line by line with delays
    for (const line of responseLines) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setResponses((prev: CommandResponse[]) => [...prev, {
        type: 'response',
        content: line,
        timestamp: getTimestamp()
      }]);
    }

    // If it's a recognized command, trigger the success callback
    if (normalizedCommand in COMMAND_RESPONSES) {
      onCommandSuccess?.();
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleCommand();
    }
  };

  return (
    <Box className="command-interface">
      <Box className="command-output" mb={4} p={4} height="300px" overflowY="auto">
        {responses.map((response: CommandResponse, index: number) => (
          <Text
            key={index}
            className={`command-text ${response.type}`}
            color={response.type === 'system' ? 'var(--neon-blue)' : 'var(--text-primary)'}
            fontSize="md"
            mb={2}
            fontFamily="'Share Tech Mono', monospace"
            fontWeight="500"
            letterSpacing="0.05em"
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
          {SUGGESTED_COMMANDS.map((cmd: SuggestedCommand, index: number) => (
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommand(e.target.value)}
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
          onClick={() => handleCommand()}
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
