import { Router } from "express";
import userService from "../controllers/DAO/service/user.service.js";
import { encriptPassword, comparePassword } from "../utils/encript.util.js";

const userRouter = Router()

userRouter.post('/', async (req, res) => {
	const userData = req.body;
	try {
		const newUser = await userService.createUser(userData);
    
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

userRouter.post('/auth', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userService.getByEmail(email);  l

		if (!user) throw new Error('Invalid data'); 
		if (user.password !== password) throw new Error('Invalid data'); 
		req.session.user = user;
		
		res.redirect('/index');
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});


userRouter.post('/logout', (req, res) => {
	req.session.destroy();
	
	res.redirect('/login');
});


export { userRouter };