import { Router } from 'express';
import { guest, catchAsync } from '../middleware';
import { validate, registerSchema } from '../validation';
import { User } from '../models';
import { BadRequest } from '../errors'
import { logIn } from '../auth';

const router = Router();

router.post('/register', guest, catchAsync( async (req, res) =>{

	await validate(registerSchema, req.body);
 
	const { email, password, name } = req.body

	const found = await User.exists({ email })
			

	if (found) {
		throw new BadRequest('Invalid email')	
	}

	const user = await User.create({
		email, name, password
	})
	 
	 logIn(req, user.id);


	res.json({message: 'Ok'})
		
}))

export { router as register }