import { Request } from 'express';


//!! undefined converted to false and if string of object then converted to true

export const isLoggedIn = (req: Request) => !!req.session!.userId 


export const logIn = (req: Request, userId: string)=>{
	req.session!.userId=userId	

}


export const logOut = (req: Request, res: Response)=>{
	
	new Promise((resolve, reject)=>{
		req.session!.destroy((err: Error)=>{
			if(err) reject(err)

			res.clearCookies(SESSION_NAME)
			resolve()


		})

	})
	req.session!.userId=userId	

}