import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, VStack, HStack, Heading, Text, Image, Grid, Button, Icon } from '@chakra-ui/react';
import { FaArrowLeft, FaShieldAlt, FaBolt, FaBrain, FaServer } from 'react-icons/fa';
import CommandInterface from '../components/CommandInterface';
import '../components/CommandInterface.css';

interface AgentAttribute {
  name: string;
  value: number;
  icon: any;
  color: string;
}

interface AgentData {
  id: string;
  title: string;
  codename: string;
  description: string;
  image: string;
  cardImage: string;
  attributes: AgentAttribute[];
  status: string;
}

const initialAgentData: { [key: string]: AgentData } = {
  'zeke': {
    id: 'zeke',
    title: 'ZEKE',
    codename: 'COMBAT SPECIALIST',
    description: 'Named after ancient warrior strength, ZEKE leads with unparalleled tactical precision. A combat-class unit built for high-stakes missions. Drawing from the legacy of legendary warriors, ZEKE embodies the perfect fusion of ancient combat wisdom and cutting-edge technology.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cardImage: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    attributes: [
      { name: 'Combat Mastery', value: 98, icon: FaShieldAlt, color: '#00f3ff' },
      { name: 'Tactical Analysis', value: 95, icon: FaBrain, color: '#bc13fe' },
      { name: 'Response Time', value: 97, icon: FaBolt, color: '#ffcc00' },
      { name: 'Battlefield Control', value: 96, icon: FaServer, color: '#00ff88' },
    ],
    status: 'ACTIVE'
  },
  // ... other agents remain the same
};

const AgentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [agent, setAgent] = useState<AgentData | null>(null);

  useEffect(() => {
    if (id && initialAgentData[id]) {
      setAgent({...initialAgentData[id]});
    }
  }, [id]);

  const handleCommandSuccess = () => {
    if (!agent) return;

    const newAttributes = agent.attributes.map(attr => ({
      ...attr,
      value: Math.floor(Math.random() * 101)
    }));

    setAgent(prev => prev ? {
      ...prev,
      attributes: newAttributes
    } : null);
  };

  if (!agent) {
    return (
      <Box bg="var(--cyber-darker)" minH="100vh" py={10}>
        <Container>
          <Text color="var(--neon-blue)">Agent not found</Text>
        </Container>
      </Box>
    );
  }

  const fallbackImage = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#0A0A1F"/>
      <text x="50%" y="50%" font-family="monospace" font-size="24" fill="#00F3FF" text-anchor="middle" dominant-baseline="middle">
        ${agent.title}
      </text>
      <text x="50%" y="60%" font-family="monospace" font-size="16" fill="#BC13FE" text-anchor="middle" dominant-baseline="middle">
        [${agent.codename}]
      </text>
    </svg>
  `)}`;

  return (
    <Box bg="var(--cyber-darker)" h="100vh" className="agent-details-container" position="relative">
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="100%"
        height="100%"
        opacity={0.1}
        style={{
          background: `radial-gradient(circle at center, ${agent.status === 'ACTIVE' ? 'var(--neon-green)' : 
                                                        agent.status === 'READY' ? 'var(--neon-blue)' : 
                                                        'var(--neon-red)'} 0%, transparent 70%)`
        }}
        pointerEvents="none"
      />
      <Container maxW="container.xl" position="relative" h="100%" py={3}>
        <Button
          leftIcon={<FaArrowLeft />}
          onClick={() => navigate('/')}
          mb={4}
          className="back-button"
        >
          RETURN TO HUB
        </Button>

        <Grid templateColumns={{ base: '1fr', lg: '350px 1fr' }} gap={6} h="calc(100% - 50px)">
          <VStack spacing={3}>
            <Box 
              className="agent-image-container" 
              maxH="350px"
              style={{
                boxShadow: `0 0 30px ${agent.status === 'ACTIVE' ? 'rgba(0, 255, 136, 0.1)' : 
                                     agent.status === 'READY' ? 'rgba(0, 243, 255, 0.1)' : 
                                     'rgba(255, 0, 85, 0.1)'}`
              }}
            >
              <Image
                src={agent.image}
                alt={agent.title}
                className="agent-image"
                fallbackSrc={fallbackImage}
                loading="eager"
                width="400px"
                height="400px"
                objectFit="cover"
              />
              <Box className={`status-indicator ${agent.status.toLowerCase()}`}>
                STATUS: {agent.status}
              </Box>
            </Box>

            <Box 
              className="agent-profile-section"
              style={{
                borderImage: `linear-gradient(to bottom, var(--neon-blue), transparent) 1`,
                width: '100%'
              }}
            >
              <Text 
                className="subtitle-text" 
                fontSize="xs"
                letterSpacing="0.5em"
                mb={1}
                textShadow="0 0 10px rgba(0, 243, 255, 0.3)"
              >
                AGENT PROFILE
              </Text>
              <Heading 
                className="title-text" 
                size="xl" 
                mb={2}
                textShadow="0 0 20px rgba(0, 243, 255, 0.4)"
              >
                {agent.title}
              </Heading>
              <Text 
                className="codename" 
                fontSize="lg" 
                mb={3}
                textShadow="0 0 15px rgba(188, 19, 254, 0.4)"
              >
                [{agent.codename}]
              </Text>
              <Text 
                className="description" 
                fontSize="md" 
                mb={4}
                lineHeight="1.6"
              >
                {agent.description}
              </Text>
            </Box>
          </VStack>

          <VStack 
            align="stretch" 
            spacing={3} 
            h="100%" 
            overflow="hidden"
            position="relative"
          >
            <Box 
              className="agent-profile-section"
              style={{
                borderImage: `linear-gradient(to bottom, var(--neon-blue), transparent) 1`,
                maxHeight: '300px'
              }}
            >
              <Heading 
                className="title-text" 
                size="sm" 
                mb={4}
                textShadow="0 0 15px rgba(0, 243, 255, 0.4)"
              >
                AGENT ATTRIBUTES
              </Heading>
              <Grid 
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} 
                gap={4}
                className="agent-attributes-grid"
              >
                {agent.attributes.map((attr, index) => (
                  <Box
                    key={index}
                    className="attribute-card"
                    borderColor={attr.color}
                    sx={{
                      '&::before': {
                        backgroundImage: `url(${agent.cardImage})`
                      }
                    }}
                  >
                    <Box className="attribute-content">
                      <Box className="attribute-icon" color={attr.color}>
                        <Icon as={attr.icon} w={5} h={5} />
                      </Box>
                      <HStack justify="space-between" mb={2}>
                        <Text 
                          color="var(--text-primary)" 
                          fontSize="sm" 
                          fontWeight="bold"
                          textShadow={`0 0 10px ${attr.color}33`}
                        >
                          {attr.name}
                        </Text>
                        <Text
                          color={attr.color}
                          fontSize="sm"
                          fontWeight="bold"
                          textShadow={`0 0 10px ${attr.color}33`}
                        >
                          {attr.value}%
                        </Text>
                      </HStack>
                      <Box 
                        className="attribute-progress"
                        position="relative"
                        bg="rgba(0, 0, 0, 0.3)"
                        borderRadius="4px"
                        overflow="hidden"
                      >
                        <Box
                          className="attribute-progress-bar"
                          position="absolute"
                          top="0"
                          left="0"
                          height="100%"
                          width={`${attr.value}%`}
                          bg={`linear-gradient(90deg, ${attr.color}, ${attr.color}88)`}
                          transition="width 1s ease-in-out"
                        >
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Box>

            <Box 
              className="command-interface-container"
              style={{
                borderImage: `linear-gradient(to bottom, var(--neon-blue), transparent) 1`,
                background: `linear-gradient(to bottom, 
                  rgba(0, 0, 0, 0.3),
                  rgba(0, 0, 0, 0.2)
                )`
              }}
            >
              <CommandInterface agentName={agent.title} onCommandSuccess={handleCommandSuccess} />
            </Box>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
};

export default AgentDetails;
