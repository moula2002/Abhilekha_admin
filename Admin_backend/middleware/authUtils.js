import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'abhilekha_secret_123', {
    expiresIn: '30d',
  });
};

export default generateToken;
