// authMiddleware.js
const authenticate = async (request, reply) => {
    try {
      // Verify the JWT token
      await request.jwtVerify();
    } catch (err) {
      // If verification fails, send unauthorized error
      reply.code(401).send({ message: 'Unauthorized' });
    }
  };
  
  module.exports = authenticate;
  