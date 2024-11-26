const fastify = require('fastify')();
const routes = require('./routes');
const cors = require('fastify-cors');


// Register CORS plugin

fastify.register(cors, {
  origin: '*', // Allows all origins. Replace '*' with a specific domain if needed.
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
});
// Register JWT plugin
fastify.register(require('fastify-jwt'), {
    secret: process.env.SECRET_KEY,
});

// JWT Authentication Hook
fastify.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// Register routes
//fastify.register(routes);
fastify.register(routes, { prefix: '/api' });

// Start the server
//fastify.listen({ host: "192.168.110.115", port: 3000 }, (err, address) => {
//fastify.listen(3000, (err, address) => {
fastify.listen(3000, '0.0.0.0',(err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});

module.exports = fastify;
