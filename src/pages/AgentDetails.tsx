import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, VStack, Heading, Text, Image, Grid, Button, Icon, Progress } from '@chakra-ui/react';
import { FaArrowLeft, FaShieldAlt, FaBolt, FaBrain, FaServer } from 'react-icons/fa';
import ChatInterface from '../components/ChatInterface';

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
  attributes: AgentAttribute[];
  status: string;
}

const agentData: { [key: string]: AgentData } = {
  'nexus-7': {
    id: 'nexus-7',
    title: 'NEXUS-7',
    codename: 'SENTINEL PRIME',
    description: 'Advanced combat-class autonomous agent. Specializes in high-priority mission execution and strategic operations.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    attributes: [
      { name: 'Combat Efficiency', value: 95, icon: FaShieldAlt, color: '#00f3ff' },
      { name: 'Processing Power', value: 85, icon: FaBrain, color: '#bc13fe' },
      { name: 'Response Time', value: 90, icon: FaBolt, color: '#ffcc00' },
      { name: 'System Integration', value: 88, icon: FaServer, color: '#00ff88' },
    ],
    status: 'STANDBY'
  },
  'ghost-x': {
    id: 'ghost-x',
    title: 'GHOST-X',
    codename: 'PHANTOM OPS',
    description: 'Stealth-optimized infiltration unit. Masters of data extraction and digital reconnaissance.',
    image: 'https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    attributes: [
      { name: 'Stealth Rating', value: 98, icon: FaShieldAlt, color: '#00f3ff' },
      { name: 'Data Processing', value: 92, icon: FaBrain, color: '#bc13fe' },
      { name: 'Infiltration Speed', value: 85, icon: FaBolt, color: '#ffcc00' },
      { name: 'System Integration', value: 90, icon: FaServer, color: '#00ff88' },
    ],
    status: 'READY'
  },
  'cipher-v': {
    id: 'cipher-v',
    title: 'CIPHER-V',
    codename: 'MATRIX WEAVER',
    description: 'Neural network architect. Crafts digital realities through advanced code manipulation.',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    attributes: [
      { name: 'Code Generation', value: 96, icon: FaShieldAlt, color: '#00f3ff' },
      { name: 'Neural Processing', value: 94, icon: FaBrain, color: '#bc13fe' },
      { name: 'Execution Speed', value: 88, icon: FaBolt, color: '#ffcc00' },
      { name: 'System Integration', value: 92, icon: FaServer, color: '#00ff88' },
    ],
    status: 'ACTIVE'
  },
  'omega-ai': {
    id: 'omega-ai',
    title: 'OMEGA-AI',
    codename: 'MIND FORGE',
    description: 'Quantum-enhanced strategic analysis unit. Predicts and shapes the future through data.',
    image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    attributes: [
      { name: 'Strategic Analysis', value: 99, icon: FaShieldAlt, color: '#00f3ff' },
      { name: 'Quantum Processing', value: 95, icon: FaBrain, color: '#bc13fe' },
      { name: 'Prediction Accuracy', value: 93, icon: FaBolt, color: '#ffcc00' },
      { name: 'System Integration', value: 94, icon: FaServer, color: '#00ff88' },
    ],
    status: 'STANDBY'
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
    <Box bg="var(--cyber-darker)" minH="100vh" py={10}>
      <Container maxW="container.xl">
        <Button
          leftIcon={<FaArrowLeft />}
          onClick={() => navigate('/')}
          mb={8}
          className="cyber-button back-button"
          color="var(--text-primary)"
          borderColor="var(--neon-blue)"
        >
          RETURN TO HUB
        </Button>

        <Grid templateColumns={{ base: '1fr', lg: '400px 1fr' }} gap={10}>
          <Box>
            <Box className="agent-image-container">
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
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                p={4}
                bg="rgba(0,0,0,0.8)"
                borderTop="1px solid var(--neon-blue)"
              >
                <Text className="status-text" fontSize="sm" textAlign="center">
                  STATUS: {agent.status}
                </Text>
              </Box>
            </Box>
          </Box>

          <VStack align="stretch" spacing={8}>
            <Box>
              <Text 
                className="subtitle-text" 
                fontSize="sm"
                letterSpacing="0.5em"
                mb={2}
              >
                AGENT PROFILE
              </Text>
              <Heading className="title-text" size="2xl" mb={4}>
                {agent.title}
              </Heading>
              <Text className="codename" fontSize="xl" mb={6}>
                [{agent.codename}]
              </Text>
              <Text className="description" fontSize="lg" mb={8}>
                {agent.description}
              </Text>
            </Box>

            <Box>
              <Heading className="title-text" size="md" mb={6}>
                AGENT ATTRIBUTES
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                {agent.attributes.map((attr, index) => (
                  <Box
                    key={index}
                    className="cyber-card"
                    p={6}
                    position="relative"
                    overflow="hidden"
                  >
                    <VStack spacing={4} align="stretch">
                      <Box display="flex" alignItems="center" gap={3}>
                        <Icon as={attr.icon} w={6} h={6} color={attr.color} />
                        <Text color="var(--text-primary)" fontSize="sm" fontWeight="bold">
                          {attr.name}
                        </Text>
                      </Box>
                      <Box position="relative">
                        <Progress
                          value={attr.value}
                          className="attribute-progress"
                          height="12px"
                          borderRadius="full"
                          bg="rgba(255,255,255,0.1)"
                          sx={{
                            '& > div': {
                              background: `linear-gradient(90deg, ${attr.color}, ${attr.color}88)`,
                              transition: 'width 1s ease-in-out',
                            }
                          }}
                        />
                        <Text
                          position="absolute"
                          right="0"
                          top="-25px"
                          className="neon-text"
                          fontSize="xl"
                          fontWeight="bold"
                        >
                          {attr.value}%
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                ))}
              </Grid>
            </Box>

            <Box>
              <ChatInterface agentName={agent.title} agentCodename={agent.codename} />
            </Box>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
};

export default AgentDetails;
