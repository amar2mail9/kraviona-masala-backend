import jwt from "jsonwebtoken"
// Middleware function to verify JWT
export const verifyToken = (req, res, next) => {
  // Get token from headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    // Verify token
    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`); 
    req.user = decoded; 
    next(); 
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};


