import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Box, Container, SimpleGrid, Heading, Text, Stack, Button, Icon } from '@chakra-ui/react';
import { FaRobot, FaDatabase, FaCode, FaBrain } from 'react-icons/fa';
import AgentDetails from './pages/AgentDetails';
import './index.css';

interface AgentCard {
  title: string;
  description: string;
  icon: any;
  codename: string;
  status: string;
  id: string;
}

const agents: AgentCard[] = [
  {
    id: 'nexus-7',
    title: 'NEXUS-7',
    description: 'Advanced combat-class autonomous agent. Specializes in high-priority mission execution and strategic operations.',
    icon: FaRobot,
    codename: 'SENTINEL PRIME',
    status: 'STANDBY',
  },
  {
    id: 'ghost-x',
    title: 'GHOST-X',
    description: 'Stealth-optimized infiltration unit. Masters of data extraction and digital reconnaissance.',
    icon: FaDatabase,
    codename: 'PHANTOM OPS',
    status: 'READY',
  },
  {
    id: 'cipher-v',
    title: 'CIPHER-V',
    description: 'Neural network architect. Crafts digital realities through advanced code manipulation.',
    icon: FaCode,
    codename: 'MATRIX WEAVER',
    status: 'ACTIVE',
  },
  {
    id: 'omega-ai',
    title: 'OMEGA-AI',
    description: 'Quantum-enhanced strategic analysis unit. Predicts and shapes the future through data.',
    icon: FaBrain,
    codename: 'MIND FORGE',
    status: 'STANDBY',
  },
];

const HomePage: React.FC = () => {
  return (
    <Box bg="var(--cyber-darker)" minH="100vh" py={10}>
      <Container maxW="container.xl">
        <Stack spacing={8} align="stretch">
          <Box textAlign="center" py={10}>
            <Text 
              fontSize="sm" 
              className="subtitle-text"
              mb={2}
              letterSpacing="0.5em"
            >
              SYSTEM ONLINE
            </Text>
            <Heading 
              size="2xl" 
              mb={4} 
              className="title-text"
              letterSpacing="wider"
              textTransform="uppercase"
            >
              CYBER AGENT HUB
            </Heading>
            <Text 
              fontSize="xl" 
              className="subtitle-text"
              letterSpacing="0.3em"
            >
              INITIALIZE AUTONOMOUS UNITS
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {agents.map((agent, index) => (
              <Box
                key={index}
                bg="rgba(10, 10, 31, 0.9)"
                p={6}
                rounded="lg"
                className="cyber-card"
                borderWidth="1px"
                borderColor="var(--neon-blue)"
                position="relative"
              >
                <Stack spacing={4} align="center">
                  <Box position="relative">
                    <Icon 
                      as={agent.icon} 
                      w={12} 
                      h={12} 
                      color="var(--neon-blue)"
                      className="agent-icon"
                    />
                  </Box>
                  <Heading 
                    size="md" 
                    className="title-text"
                  >
                    {agent.title}
                  </Heading>
                  <Text 
                    className="codename"
                    fontSize="xs" 
                    letterSpacing="wider"
                  >
                    [{agent.codename}]
                  </Text>
                  <Text 
                    className="description"
                    textAlign="center"
                  >
                    {agent.description}
                  </Text>
                  <Text
                    className="status-text"
                    fontSize="xs"
                    letterSpacing="0.2em"
                    mb={2}
                  >
                    STATUS: {agent.status}
                  </Text>
                  <Link to={`/agent/${agent.id}`} style={{ width: '100%' }}>
                    <Button
                      className="cyber-button"
                      color="var(--text-primary)"
                      borderWidth="1px"
                      borderColor="var(--neon-blue)"
                      width="full"
                      letterSpacing="0.3em"
                      fontSize="sm"
                    >
                      ACTIVATE
                    </Button>
                  </Link>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agent/:id" element={<AgentDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
