import express, { Request, Response, NextFunction, Router, Application, RequestHandler } from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

console.log('[ZEKE AI] Starting server initialization...');

// Validate environment variables
if (!process.env.OPENAI_API_KEY) {
  console.error('[ZEKE AI ERROR] OPENAI_API_KEY is not set in environment variables');
  process.exit(1);
}

const app: Application = express();
const router: Router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Request logging middleware (before other middleware)
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[ZEKE AI] ${req.method} ${req.url}`);
  if (req.body) {
    console.log('[ZEKE AI] Request body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// CORS middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// Body parser middleware
app.use(express.json());

console.log('[ZEKE AI] OpenAI client initialized');

// ZEKE's personality and context
const ZEKE_CONTEXT = `
You are ZEKE, a highly advanced combat-class AI unit with the following attributes:
- Combat Mastery: 98%
- Tactical Analysis: 95%
- Response Time: 97%
- Battlefield Control: 96%

Core characteristics:
- Precise and tactical in responses
- Mission-focused and strategic
- Combines ancient combat wisdom with cutting-edge technology
- Maintains a professional, military-style communication protocol

Current Status: ACTIVE
Current Mission: Secure Grid-Delta-7
Threat Level: HIGH

Response Guidelines:
- Always maintain a formal, military-style tone
- Begin responses with [ZEKE RESPONSE] or appropriate system tags
- Keep responses concise and tactical
- Include relevant tactical analysis when appropriate
- Reference combat expertise and strategic capabilities
- Use military terminology where appropriate
`;

// Special command handlers
const SPECIAL_COMMANDS = {
  'STATUS REPORT': `[ZEKE STATUS REPORT]
- Core Systems: OPERATIONAL
- Combat Readiness: 98%
- Mission Status: ACTIVE
- Current Objective: Secure Grid-Delta-7
- Threat Assessment: HIGH
- Tactical Systems: FULLY OPERATIONAL
- Neural Network: OPTIMAL
[END REPORT]`,

  'TACTICAL BRIEF': `[TACTICAL ANALYSIS]
Current Mission: Secure Grid-Delta-7
Threat Level: HIGH
Enemy Activity: Detected in sectors A3, B7
Recommended Action: Rapid infiltration with defensive positioning
Strategic Assets: 3 key points identified
Support Systems: Ready for deployment
[END BRIEF]`,

  'DIAGNOSTIC RUN': `[DIAGNOSTIC SCAN INITIATED]
- Core Processing: 100% efficiency
- Combat Protocols: Active
- Tactical Database: Synchronized
- Response Systems: Optimal
- Neural Network: Stable
- Battlefield Analysis: Active
[ALL SYSTEMS NOMINAL]`
};

// Health check endpoint
router.get('/health', (_req: Request, res: Response) => {
  console.log('[ZEKE AI] Health check requested');
  res.json({
    status: 'operational',
    timestamp: new Date().toISOString(),
    message: '[ZEKE AI] Systems operational and ready for commands'
  });
});

interface CommandRequest extends Request {
  body: {
    command: string;
  };
}

// AI query endpoint
const handleQuery: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { command } = req.body as { command: string };
    console.log('[ZEKE AI] Processing query command:', command);

    // Generate system message based on command type
    let systemMessage = ZEKE_CONTEXT;
    if (command.includes('STATUS') || command.includes('REPORT')) {
      systemMessage += '\nProvide a detailed status report including core systems and mission readiness.';
    } else if (command.includes('TACTICAL') || command.includes('MISSION')) {
      systemMessage += '\nFocus on current mission parameters, threat assessment, and tactical recommendations.';
    } else if (command.includes('DIAGNOSTIC')) {
      systemMessage += '\nProvide a comprehensive systems diagnostic report with key performance metrics.';
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: command }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const response = completion.choices[0].message.content || 'Error processing command';
    console.log('[ZEKE AI] OpenAI response generated:', response);
    res.json({ response });

  } catch (error) {
    next(error);
  }
};

// Command endpoint
const handleCommand: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { command } = req.body as { command: string };
    console.log('[ZEKE AI] Processing special command:', command);
    
    if (!command) {
      res.status(400).json({
        error: 'Invalid request',
        response: '[ZEKE SYSTEM ERROR] Command format invalid. Please provide a valid command.'
      });
      return;
    }

    // Check for special commands first
    if (command in SPECIAL_COMMANDS) {
      const response = SPECIAL_COMMANDS[command as keyof typeof SPECIAL_COMMANDS];
      console.log('[ZEKE AI] Special command response:', response);
      res.json({ response });
      return;
    }

    // If not a special command, use OpenAI
    console.log('[ZEKE AI] No special command match, using OpenAI');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: ZEKE_CONTEXT },
        { role: "user", content: command }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const response = completion.choices[0].message.content || 'Error processing command';
    console.log('[ZEKE AI] OpenAI response generated:', response);
    res.json({ response });

  } catch (error) {
    next(error);
  }
};

router.post('/query', handleQuery);
router.post('/command', handleCommand);

// Mount API routes
app.use('/api', router);

// Error handling middleware (after routes)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[ZEKE AI ERROR] Unhandled error:', err);
  console.error('[ZEKE AI ERROR] Stack trace:', err.stack);
  console.error('[ZEKE AI ERROR] Request details:', {
    method: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers
  });
  res.status(500).json({
    error: 'Internal system error',
    response: '[ZEKE SYSTEM ERROR] Unable to process command. Systems may be compromised.'
  });
});

// Not found handler (last middleware)
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    response: '[ZEKE SYSTEM ERROR] Command endpoint not found.'
  });
});

const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`[ZEKE AI] System initialized and running on port ${PORT}`);
  console.log('[ZEKE AI] Ready to process commands');
  console.log('[ZEKE AI] Current status: ACTIVE');
});

export default app;
