// Import the necessary modules
import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

//validate process.env.SECRET_KEY
if (!process.env.SECRET_KEY) {
  console.error("ERROR: Set the SECRET_KEY environment variable");
  process.exit(1);
}
const secretKey = process.env.SECRET_KEY;

// Middleware to parse JSON bodies
app.use(express.json());

// JWT validation middleware
export const validateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers["x-jwt-kwy"] as string;
  if (!token) {
    res.status(401).send("Access denied. No token provided.");
    return;
  }

  try {
    jwt.verify(token, secretKey);
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

// Route for /devops path
app.post("/devops", validateJWT, (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ message: `Hello ${req.body.to} your message will be send` });
});

// Catch-all route for any other paths
app.use((req: Request, res: Response) => {
  res.status(404).send("Error: Path/method not found");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
