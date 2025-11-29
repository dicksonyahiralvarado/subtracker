import express from 'express';
import cors from 'cors';
import subscriptionRoutes from './routes/subscription.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/subscriptions', subscriptionRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'SubTracker API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
