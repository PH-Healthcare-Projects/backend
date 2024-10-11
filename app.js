/* const fastify = require('fastify')()
const routes = require('./routes')

fastify.register(require('fastify-jwt'), {
    secret: process.env.SECRET_KEY,
});

fastify.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
});

fastify.register(routes);

module.exports = fastify */

const fastify = require('fastify')();
const routes = require('./routes');
const cors = require('fastify-cors');


// Register CORS plugin

fastify.register(cors, {
    origin: '*',  // Allow all origins
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
fastify.register(routes);

// Start the server
fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});

module.exports = fastify;
