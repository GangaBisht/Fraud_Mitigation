import Express from 'express';
import Session, { Store } from 'express-session';
import { SESSION_OPTIONS } from './config';
import { login, register } from './routes'
import { notFound, serverError } from './middleware'
import { v4 as uuid } from 'uuid'


export const createApp = (store: Store) =>{

	const app=Express();

		 
	app.use(Express.json());
	
	SESSION_OPTIONS.genid=function(req) {

    return uuid(); // use UUIDs for session IDs
  }

console.log(SESSION_OPTIONS)	

	app.use(Session({...SESSION_OPTIONS, store}));

	app.get('/', (req, res) =>{

console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  res.send(`You hit home page!\n ${req.sessionID}`)		
	})

	app.use(login);

	app.use(register);

	app.use(notFound);

	app.use(serverError);

	return app;

}
