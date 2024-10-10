const fastify = require('fastify')()
const routes = require('./routes')

// Register JWT plugin
fastify.register(require('fastify-jwt'), {
    secret: process.env.SECRET_KEY, // Use an environment variable for this in production!
});

// JWT Authentication Hook
fastify.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
});

fastify.register(routes);

module.exports = fastify