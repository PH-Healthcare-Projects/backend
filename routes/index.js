let news = require('../controllers/news');
let auth = require('../controllers/auth');
const authenticate = require('../authMiddleware'); // Import the JWT middleware

/* async function routes (fastify, options) {

    fastify.get('/', function (request, reply) {
        reply.send({message: 'ping success', code: 200})
    })

    fastify.get('/news', news.getNewsList);
    fastify.get('/news/:id', news.getNewsDetail);
    fastify.post('/users', news.addNewUser);    
    fastify.post('/login', auth.login);
    fastify.post('/register', auth.register);

} */

async function routes(fastify, options) {
    // Public route (no authentication required)
    fastify.get('/', function (request, reply) {
        reply.send({ message: 'ping success', code: 200 });
    });

    // Public routes
    fastify.post('/login', auth.login);
    fastify.post('/register', auth.register);    
    fastify.post('/refresh-token', auth.refreshToken);  // Add this

    // Group protected routes
    fastify.register(async function (protectedRoutes) {
        // Add authentication middleware to the group
        protectedRoutes.addHook('preHandler', authenticate);

        // All routes here will require authentication
        protectedRoutes.get('/news', news.getNewsList);
        protectedRoutes.get('/news/:id', news.getNewsDetail);
        protectedRoutes.post('/users', news.addNewUser);
    });
}

module.exports = routes;