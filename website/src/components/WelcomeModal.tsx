import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  VStack,
  Text,
  Box,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { FaRobot, FaCode, FaBrain } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    console.log('[Modal] Rendered with isOpen:', isOpen);
  }, [isOpen]);

  const handleInitialize = () => {
    try {
      console.log('[Modal] Initialize button clicked');
      onClose();
      console.log('[Modal] onClose called from Initialize button');
    } catch (error) {
      console.error('[Modal] Error in Initialize button handler:', error);
    }
  };

  const handleClose = () => {
    try {
      console.log('[Modal] Close button clicked');
      onClose();
      console.log('[Modal] onClose called from Close button');
    } catch (error) {
      console.error('[Modal] Error in Close button handler:', error);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      isCentered 
      size="lg"
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay 
        backdropFilter="blur(10px)"
        bg="rgba(0, 0, 0, 0.8)"
      />
      <ModalContent
        bg="rgba(10, 10, 31, 0.95)"
        borderWidth="1px"
        borderColor="var(--neon-blue)"
        className="cyber-card"
        color="white"
        boxShadow="0 0 20px rgba(0, 255, 255, 0.2)"
        position="relative"
        zIndex={1400}
      >
        <Button
          position="absolute"
          left="20px"
          top="20px"
          onClick={handleClose}
          width="32px"
          height="32px"
          minWidth="32px"
          padding={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          border="1px solid"
          borderColor="var(--neon-blue)"
          color="var(--neon-blue)"
          bg="transparent"
          transition="all 0.2s"
          zIndex={1500}
          _hover={{
            bg: 'whiteAlpha.200',
            color: 'white',
            borderColor: 'white'
          }}
          aria-label="Close modal"
          data-testid="modal-close-button"
        >
          <Icon as={FaXmark} boxSize={4} />
        </Button>

        <ModalHeader
          textAlign="center"
          fontSize="2xl"
          className="title-text"
          letterSpacing="wider"
          textShadow="0 0 10px var(--neon-blue)"
          pt={8}
        >
          WELCOME TO CYBER AGENT HUB
        </ModalHeader>

        <ModalBody pb={6}>
          <VStack spacing={6} align="stretch">
            <Text 
              textAlign="center" 
              className="subtitle-text" 
              letterSpacing="0.1em"
              color="purple.200"
              textShadow="0 0 5px rgba(147, 112, 219, 0.5)"
            >
              A next-generation autonomous agent deployment platform powered by advanced AI
            </Text>

            <Divider borderColor="var(--neon-blue)" opacity={0.3} />

            <VStack spacing={4}>
              <Box display="flex" alignItems="center" gap={4}>
                <Icon 
                  as={FaRobot} 
                  w={6} 
                  h={6} 
                  color="var(--neon-blue)"
                  animation="pulse 2s infinite"
                />
                <Text>Deploy specialized autonomous agents for mission-critical operations</Text>
              </Box>

              <Box display="flex" alignItems="center" gap={4}>
                <Icon 
                  as={FaCode} 
                  w={6} 
                  h={6} 
                  color="var(--neon-blue)"
                  animation="pulse 2s infinite"
                  style={{ animationDelay: '0.6s' }}
                />
                <Text>Execute complex tasks with advanced neural processing capabilities</Text>
              </Box>

              <Box display="flex" alignItems="center" gap={4}>
                <Icon 
                  as={FaBrain} 
                  w={6} 
                  h={6} 
                  color="var(--neon-blue)"
                  animation="pulse 2s infinite"
                  style={{ animationDelay: '1.2s' }}
                />
                <Text>Harness quantum-enhanced strategic analysis and decision making</Text>
              </Box>
            </VStack>

            <Divider borderColor="var(--neon-blue)" opacity={0.3} />

            <Text
              textAlign="center"
              fontSize="sm"
              className="status-text"
              color="yellow.300"
              letterSpacing="0.2em"
            >
              SYSTEM STATUS: OPERATIONAL
            </Text>

            <Button
              onClick={handleInitialize}
              className="cyber-button"
              color="var(--text-primary)"
              borderWidth="1px"
              borderColor="var(--neon-blue)"
              width="full"
              letterSpacing="0.3em"
              fontSize="sm"
              h="50px"
              bg="transparent"
              zIndex={1500}
              _hover={{ 
                bg: 'whiteAlpha.200',
                boxShadow: '0 0 15px var(--neon-blue)',
                transform: 'translateY(-2px)'
              }}
              transition="all 0.3s ease"
              aria-label="Initialize system"
              data-testid="initialize-button"
            >
              INITIALIZE SYSTEM
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WelcomeModal;
