import { Schema, model, Document } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { BCRYPT_WORK_FACTOR } from '../config'

//interface is created only bcoz using typescrite not required for javascript

interface UserDocument extends Document{
	email: string
	name: string
	password: string
	matchesPassword: (password: string) => Promise<boolean>

}

const userSchema = new Schema({
	email: String,
	name: String,
	password: String,
},{
	timestamps: true
})

userSchema.pre<UserDocument>('save', async function(){

	if(this.isModified('password')){

		this.password = await hash(this.password, BCRYPT_WORK_FACTOR)// workfactor/salt of 12 means it will take 12 round to calculate the hash 

	}

})


userSchema.methods.matchesPassword = function (password: string) { 
	return compare(password, this.password);
}





export const User = model<UserDocument>('User', userSchema);