import Express from 'express';
import Session, { Store } from 'express-session';
import { SESSION_OPTIONS } from './config';
import { login, register } from './routes'
import { notFound, serverError } from './middleware'


export const createApp = (store: Store) =>{

	const app=Express();
	 
	app.use(Express.json());

	app.use(Session({...SESSION_OPTIONS, store}));

	app.use(login);

	app.use(register);

	app.use(notFound);

	app.use(serverError);

	return app;

}
