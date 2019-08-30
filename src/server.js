import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import passport from 'passport';
import './passport';
import { authenticateJwt } from './passport';
import { isAuthenticated } from './middlewares';
import upload, { uploadMiddleware, uploadController } from './upload';
//import { sendSecretMail } from './utils';
//sendSecretMail('ashburn1207@gmail.com', '123');

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
	schema,
	context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);
server.express.post('/api/upload', uploadMiddleware, uploadController);

server.start({ port: PORT }, () =>
	console.log(`✅ Server running on port http://localhost:${PORT}`)
);
