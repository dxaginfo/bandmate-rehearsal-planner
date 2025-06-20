import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import bandRoutes from './routes/bands';
import rehearsalRoutes from './routes/rehearsals';
import venueRoutes from './routes/venues';
import availabilityRoutes from './routes/availability';

// Create Express app
const app = express();
const port = process.env.PORT || 8000;

// Set up HTTP server and Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bands', bandRoutes);
app.use('/api/rehearsals', rehearsalRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/availability', availabilityRoutes);

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BandMate Rehearsal Planner API',
      version: '1.0.0',
      description: 'API documentation for BandMate Rehearsal Planner',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' ? 'https://api.yourdomain.com' : 'http://localhost:8000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Socket.io setup
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_band', (bandId) => {
    socket.join(`band_${bandId}`);
    console.log(`User ${socket.id} joined band room: band_${bandId}`);
  });

  socket.on('leave_band', (bandId) => {
    socket.leave(`band_${bandId}`);
    console.log(`User ${socket.id} left band room: band_${bandId}`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Start server
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { io };