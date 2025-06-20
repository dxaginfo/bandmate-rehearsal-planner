# BandMate Rehearsal Planner

BandMate is a comprehensive web application designed to help music bands and ensembles efficiently organize their practice sessions. This application automatically schedules band rehearsals, sends reminders, tracks attendance, and suggests optimal rehearsal times based on member availability.

![BandMate Logo](https://via.placeholder.com/800x400?text=BandMate+Rehearsal+Planner)

## Features

- **User Account Management**
  - Registration and authentication
  - Band/ensemble creation and management
  - Member invitation and role assignment

- **Availability Management**
  - Individual availability tracking
  - Recurring availability patterns
  - Conflict identification

- **Rehearsal Scheduling**
  - Manual scheduling
  - Automatic scheduling based on availability
  - Venue/location management
  - Duration and time management

- **Notification System**
  - Email/SMS reminders
  - Calendar integration
  - RSVP tracking

- **Attendance Tracking**
  - Attendance recording
  - Historical attendance reports
  - Absence justification

- **Optimal Time Suggestion**
  - AI-based rehearsal time recommendations
  - Pattern recognition from past attendance
  - Adaptability to changing schedules

- **Resource Management**
  - Equipment tracking
  - Venue details and requirements
  - Special rehearsal needs (recording, etc.)

## Technology Stack

### Frontend:
- React.js with TypeScript
- Redux for state management
- Material-UI for components
- Formik with Yup validation
- FullCalendar.js for calendar views
- Axios for HTTP requests

### Backend:
- Node.js with Express
- RESTful API architecture
- JWT with OAuth integration
- Socket.io for real-time updates

### Database:
- PostgreSQL for data persistence
- Redis for caching and session management

### Infrastructure:
- Docker and Docker Compose for containerization
- AWS (EC2, ELB) for hosting
- GitHub Actions for CI/CD
- AWS CloudWatch for monitoring

## Installation and Setup

### Prerequisites

- Node.js (v16+)
- npm (v8+) or Yarn (v1.22+)
- Docker and Docker Compose
- PostgreSQL (v13+)
- Redis (v6+)

### Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/dxaginfo/bandmate-rehearsal-planner.git
cd bandmate-rehearsal-planner
```

2. **Install dependencies**

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Set up environment variables**

Create `.env` files in both the `backend` and `frontend` directories based on the provided example files.

```bash
# Backend .env example
cp backend/.env.example backend/.env

# Frontend .env example
cp frontend/.env.example frontend/.env
```

4. **Start the database services**

```bash
docker-compose up -d postgres redis
```

5. **Run database migrations**

```bash
cd backend
npm run migrate
```

6. **Start the development servers**

```bash
# Start backend server
cd backend
npm run dev

# In a separate terminal, start frontend server
cd frontend
npm start
```

The application should now be running at `http://localhost:3000` with the API server at `http://localhost:8000`.

### Docker Setup

For a complete containerized setup:

```bash
docker-compose up -d
```

This will start all necessary services and the application will be available at `http://localhost:3000`.

## Deployment

### AWS Deployment

1. Set up an EC2 instance with Docker installed
2. Configure security groups to allow traffic on ports 80 and 443
3. Clone the repository on the server
4. Create production `.env` files
5. Build and start the containers:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### CI/CD Pipeline

The project includes GitHub Actions workflows for:
- Code linting and testing
- Building Docker images
- Deploying to staging/production environments

See `.github/workflows` for detailed configuration.

## API Documentation

API documentation is available at `/api/docs` when the server is running.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [FullCalendar](https://fullcalendar.io/)
- [Material-UI](https://material-ui.com/)
- [Socket.io](https://socket.io/)