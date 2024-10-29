import express from 'express';
import documentRoutes from './routes/documentRoutes';
import connectDB from './config/db';


connectDB()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API Routes
app.use('/api/documents', documentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
