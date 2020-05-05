import { Controller, Get } from "@overnightjs/core";
import { Request, Response, NextFunction } from "express";

@Controller('api/user')
class UserController {

	@Get()
	get(req: Request, res: Response): any {
		console.log(req.params);
		console.log(req.body);
		return res.json({ title: 'what' });
	}

}

export default new UserController();