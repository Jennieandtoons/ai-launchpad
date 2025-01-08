import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, VStack, Heading, Text, Image, Grid, Button, Icon, Progress } from '@chakra-ui/react';
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

const agentData: { [key: string]: AgentData } = {
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
  'shade': {
    id: 'shade',
    title: 'SHADE',
    codename: 'STEALTH OPERATIVE',
    description: 'SHADE embodies its namesake - moving unseen through digital shadows. A stealth specialist designed for covert infiltration and reconnaissance.',
    image: 'https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cardImage: 'https://images.pexels.com/photos/1308624/pexels-photo-1308624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    attributes: [
      { name: 'Stealth Operations', value: 99, icon: FaShieldAlt, color: '#00f3ff' },
      { name: 'Data Extraction', value: 97, icon: FaBrain, color: '#bc13fe' },
      { name: 'Infiltration Speed', value: 95, icon: FaBolt, color: '#ffcc00' },
      { name: 'Digital Camouflage', value: 98, icon: FaServer, color: '#00ff88' },
    ],
    status: 'READY'
  },
  'byte': {
    id: 'byte',
    title: 'BYTE',
    codename: 'NETWORK GUARDIAN',
    description: 'BYTE, the fundamental unit of digital data, masters the architecture of networks. Creates and breaks through the most sophisticated systems.',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cardImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    attributes: [
      { name: 'System Security', value: 98, icon: FaShieldAlt, color: '#00f3ff' },
      { name: 'Network Control', value: 99, icon: FaBrain, color: '#bc13fe' },
      { name: 'Code Execution', value: 97, icon: FaBolt, color: '#ffcc00' },
      { name: 'Data Processing', value: 96, icon: FaServer, color: '#00ff88' },
    ],
    status: 'INACTIVE'
  },
  'nova': {
    id: 'nova',
    title: 'NOVA',
    codename: 'TACTICAL ADVISOR',
    description: 'Like its stellar namesake, NOVA brings explosive insight to strategic analysis. Harnesses quantum computing for predictive warfare.',
    image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    cardImage: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    attributes: [
      { name: 'Strategic Analysis', value: 99, icon: FaShieldAlt, color: '#00f3ff' },
      { name: 'Quantum Processing', value: 98, icon: FaBrain, color: '#bc13fe' },
      { name: 'Predictive Models', value: 97, icon: FaBolt, color: '#ffcc00' },
      { name: 'Data Synthesis', value: 98, icon: FaServer, color: '#00ff88' },
    ],
    status: 'INACTIVE'
  }
};

const AgentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const agent = id ? agentData[id] : null;

  useEffect(() => {
    const progressBars = document.querySelectorAll('.attribute-progress');
    progressBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.classList.add('animate-progress');
      }, index * 200);
    });
  }, []);

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
          <Box>
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
          </Box>

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
                borderImage: `linear-gradient(to bottom, var(--neon-blue), transparent) 1`
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

            <Box 
              className="agent-profile-section" 
              flex="1" 
              overflow="auto"
              style={{
                borderImage: `linear-gradient(to bottom, var(--neon-blue), transparent) 1`
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
                gap={6}
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
                      <Text 
                        color="var(--text-primary)" 
                        fontSize="sm" 
                        fontWeight="bold"
                        mb={4}
                        textShadow={`0 0 10px ${attr.color}33`}
                      >
                        {attr.name}
                      </Text>
                      <Box className="attribute-progress">
                        <Box
                          className="attribute-progress-bar"
                          width={`${attr.value}%`}
                          bg={`linear-gradient(90deg, ${attr.color}, ${attr.color}88)`}
                        />
                        <Text
                          className="attribute-value"
                          color={attr.color}
                        >
                          {attr.value}%
                        </Text>
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
              <CommandInterface agentName={agent.title} />
            </Box>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
};

export default AgentDetails;
