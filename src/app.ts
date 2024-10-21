// Import the necessary modules
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Route for /DevOps path
app.get('/devops', (req: Request, res: Response) => {
  res.send('Welcome to the DevOps path!');
});

// Catch-all route for any other paths
app.use((req: Request, res: Response) => {
  res.status(404).send('Error: Path not found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});