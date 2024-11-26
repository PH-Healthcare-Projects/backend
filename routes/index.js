let news = require('../controllers/news');
let auth = require('../controllers/auth');
const model1Controller = require('../controllers/model1Controller');
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


        protectedRoutes.post('/model1_feedback', model1Controller.createModel1);
        protectedRoutes.get('/model1', model1Controller.getAllModel1);

        fastify.post('/verify_token', async (request, reply) => {
            try {
                // Extract token from the Authorization header
                const token = request.headers.authorization?.split(" ")[1];

                if (!token) {
                    return reply.code(400).send({ message: "Token required" });
                }

                // Verify the token
                const decoded = fastify.jwt.verify(token, process.env.SECRET_KEY);

                // Return the decoded user data
                return reply.send({ valid: true, user: decoded, api_token: token });
            } catch (err) {
                return reply.code(401).send({ valid: false, message: "Invalid or expired token" });
            }
        /* }, { prefix: '/api' });
    }, { prefix: '/api' }); */
});
});
}

module.exports = routes;