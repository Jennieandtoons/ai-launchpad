import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Box, Container, SimpleGrid, Heading, Text, Stack, Button, Icon, IconButton, HStack } from '@chakra-ui/react';
import { FaRobot, FaDatabase, FaCode, FaBrain } from 'react-icons/fa';
import { FaXTwitter, FaGithub, FaTelegram } from 'react-icons/fa6';
import AgentDetails from './pages/AgentDetails';
import WelcomeModal from './components/WelcomeModal';
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
    id: 'zeke',
    title: 'ZEKE',
    description: 'Named after ancient warrior strength, ZEKE leads with unparalleled tactical precision. A combat-class unit built for high-stakes missions.',
    icon: FaRobot,
    codename: 'COMBAT SPECIALIST',
    status: 'ACTIVE',
  },
  {
    id: 'shade',
    title: 'SHADE',
    description: 'SHADE embodies its namesake - moving unseen through digital shadows. A stealth specialist designed for covert infiltration and reconnaissance.',
    icon: FaDatabase,
    codename: 'STEALTH OPERATIVE',
    status: 'READY',
  },
  {
    id: 'byte',
    title: 'BYTE',
    description: 'BYTE, the fundamental unit of digital data, masters the architecture of networks. Creates and breaks through the most sophisticated systems.',
    icon: FaCode,
    codename: 'NETWORK GUARDIAN',
    status: 'INACTIVE',
  },
  {
    id: 'nova',
    title: 'NOVA',
    description: 'Like its stellar namesake, NOVA brings explosive insight to strategic analysis. Harnesses quantum computing for predictive warfare.',
    icon: FaBrain,
    codename: 'TACTICAL ADVISOR',
    status: 'INACTIVE',
  },
];

const WELCOME_KEY = 'hasSeenWelcome';
const isDev = process.env.NODE_ENV === 'development';

const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const hasSeenWelcome = window.localStorage.getItem(WELCOME_KEY);
      isDev && console.log('[App] Initial localStorage check:', hasSeenWelcome);
      
      if (!hasSeenWelcome) {
        isDev && console.log('[App] No welcome flag found, showing modal');
        setShowModal(true);
      } else {
        isDev && console.log('[App] Welcome flag found, modal will not show');
      }
    } catch (error) {
      console.error('[App] Error checking localStorage:', error);
      setShowModal(true);
    }
  }, []);

  const handleModalClose = () => {
    try {
      isDev && console.log('[App] Modal close handler triggered');
      window.localStorage.setItem(WELCOME_KEY, 'true');
      const storedValue = window.localStorage.getItem(WELCOME_KEY);
      isDev && console.log('[App] Welcome flag verification:', storedValue);
      setShowModal(false);
      isDev && console.log('[App] Modal state updated to false');
    } catch (error) {
      console.error('[App] Error in modal close handler:', error);
    }
  };

  useEffect(() => {
    isDev && console.log('[App] Modal state changed:', showModal);
  }, [showModal]);

  return (
    <Box bg="var(--cyber-darker)" h="100vh" overflow="hidden" position="relative">
      <HStack position="absolute" top={{ base: 3, md: 6 }} right={{ base: 3, md: 6 }} spacing={3} zIndex={1}>
        <IconButton
          as="a"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          icon={<FaXTwitter />}
          variant="outline"
          colorScheme="whiteAlpha"
          size="md"
          className="cyber-button"
          _hover={{ bg: 'whiteAlpha.200' }}
        />
        <IconButton
          as="a"
          href="https://github.com/Jennieandtoons/ai-launchpad"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          icon={<FaGithub />}
          variant="outline"
          colorScheme="whiteAlpha"
          size="md"
          className="cyber-button"
          _hover={{ bg: 'whiteAlpha.200' }}
        />
        <IconButton
          as="a"
          href="https://telegram.org"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          icon={<FaTelegram />}
          variant="outline"
          colorScheme="whiteAlpha"
          size="md"
          className="cyber-button"
          _hover={{ bg: 'whiteAlpha.200' }}
        />
      </HStack>
      <Container maxW="container.xl" h="100%" py={4}>
        <Stack spacing={4} align="stretch" h="100%">
          <Box 
            textAlign="center" 
            py={4}
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '20px',
              background: 'linear-gradient(to bottom, var(--cyber-darker), transparent)',
              pointerEvents: 'none'
            }}
          >
            <Text 
              fontSize="xs"
              className="subtitle-text"
              mb={1}
              letterSpacing="0.5em"
            >
              SYSTEM ONLINE
            </Text>
            <Heading 
              fontSize={{ base: "3xl", md: "4xl" }}
              mb={2}
              className="title-text"
              letterSpacing="wider"
              textTransform="uppercase"
            >
              CYBER AGENT HUB
            </Heading>
            <Text 
              fontSize={{ base: "sm", md: "md" }}
              maxW="2xl"
              mx="auto"
              className="subtitle-text"
              letterSpacing="0.3em"
            >
              IN A WORLD TEETERING ON THE EDGE OF CHAOS, THE CYBER AGENT HUB WAS FORGED TO RESTORE BALANCE
            </Text>
          </Box>

          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 4 }} 
            spacing={4}
            px={2}
            flex="1"
            overflow="auto"
            maxH="calc(100vh - 180px)"
          >
            {agents.map((agent, index) => (
              <Box
                key={index}
                bg={agent.status === 'INACTIVE' ? 'rgba(10, 10, 31, 0.7)' : 'rgba(10, 10, 31, 0.9)'}
                p={4}
                rounded="lg"
                className={`cyber-card ${agent.status.toLowerCase()}`}
                borderWidth="1px"
                borderColor={agent.status === 'ACTIVE' ? 'var(--neon-blue)' : 
                           agent.status === 'READY' ? 'rgba(0, 243, 255, 0.3)' : 
                           'rgba(255, 255, 255, 0.1)'}
                position="relative"
              >
                <Stack spacing={3} align="center" height="100%" justify="space-between">
                  <Box 
                    position="relative" 
                    className="icon-container"
                    p={2}
                    borderRadius="full"
                    bg={agent.status === 'ACTIVE' ? 'rgba(0, 243, 255, 0.1)' : 
                       agent.status === 'READY' ? 'rgba(0, 243, 255, 0.05)' : 
                       'rgba(255, 255, 255, 0.05)'}
                  >
                    <Icon 
                      as={agent.icon} 
                      w={7}
                      h={7}
                      color={agent.status === 'ACTIVE' ? 'var(--neon-blue)' : 
                            agent.status === 'READY' ? 'var(--neon-blue)' : 
                            'var(--text-secondary)'}
                      className="agent-icon"
                      opacity={agent.status === 'INACTIVE' ? 0.5 : 1}
                    />
                  </Box>
                  <Heading 
                    fontSize="lg"
                    className="title-text"
                    opacity={agent.status === 'INACTIVE' ? 0.7 : 1}
                  >
                    {agent.title}
                  </Heading>
                  <Text 
                    className="codename"
                    fontSize="2xs"
                    letterSpacing="wider"
                    px={2}
                    py={1}
                    borderRadius="md"
                    bg={agent.status === 'ACTIVE' ? 'rgba(188, 19, 254, 0.15)' :
                       agent.status === 'READY' ? 'rgba(188, 19, 254, 0.1)' :
                       'rgba(255, 255, 255, 0.05)'}
                    border={`1px solid ${agent.status === 'ACTIVE' ? 'rgba(188, 19, 254, 0.3)' :
                                      agent.status === 'READY' ? 'rgba(188, 19, 254, 0.2)' :
                                      'rgba(255, 255, 255, 0.1)'}`}
                    opacity={agent.status === 'INACTIVE' ? 0.6 : 1}
                  >
                    [{agent.codename}]
                  </Text>
                  <Text 
                    className="description"
                    textAlign="center"
                    fontSize="xs"
                    px={3}
                    opacity={agent.status === 'INACTIVE' ? 0.7 : 1}
                  >
                    {agent.description}
                  </Text>
                  <Box 
                    className="status-container"
                    borderRadius="md"
                    px={3}
                    py={1}
                    bg={agent.status === 'ACTIVE' ? 'rgba(0, 255, 136, 0.15)' :
                       agent.status === 'READY' ? 'rgba(0, 255, 136, 0.1)' :
                       'rgba(255, 0, 85, 0.1)'}
                    border={`1px solid ${agent.status === 'ACTIVE' ? 'rgba(0, 255, 136, 0.3)' :
                                      agent.status === 'READY' ? 'rgba(0, 255, 136, 0.2)' :
                                      'rgba(255, 0, 85, 0.2)'}`}
                  >
                    <Text
                      className="status-text"
                      fontSize="2xs"
                      letterSpacing="0.2em"
                      color={agent.status === 'INACTIVE' ? 'var(--neon-red)' : 'var(--neon-green)'}
                    >
                      STATUS: {agent.status}
                    </Text>
                  </Box>
                  {agent.status === 'ACTIVE' ? (
                    <Link to={`/agent/${agent.id}`} style={{ width: '100%' }} className="activate-button-container">
                      <Button
                        className="cyber-button active"
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
                  ) : (
                    <Box className="activate-button-container" width="100%">
                      <Button
                        className="cyber-button inactive"
                        color="var(--text-secondary)"
                        borderWidth="1px"
                        borderColor="rgba(255, 255, 255, 0.1)"
                        width="full"
                        letterSpacing="0.3em"
                        fontSize="sm"
                        cursor="not-allowed"
                        _hover={{ bg: 'transparent' }}
                        opacity={0.5}
                      >
                        {agent.status === 'READY' ? 'STANDBY' : 'OFFLINE'}
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
      {showModal && <WelcomeModal isOpen={true} onClose={handleModalClose} />}
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
