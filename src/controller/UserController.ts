import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Post, Delete } from "@overnightjs/core";
import { Request, Response, NextFunction } from "express";
import { Logger } from '@overnightjs/logger';
import conn from '..';
import { UserService } from './../service/UserService';

var users = new Map<number, any>();

@Controller('api/user')
export class UserController {

	userService = new UserService();

	@Post()
	postSaveUser(req: Request, res: Response): any {
		this.userService.insertUser(req.body)
			.then((value) => {
				res.status(OK).json(value);
			})
			.catch((err) => {
				res.status(BAD_REQUEST).json(err);
			});
	}

	@Get(':id')
	async getUserById(req: Request, res: Response) {

		Promise.all([await this.userService.userById(req.params.id), await this.userService.profileById(req.params.id)])
			.then((values) => {
				Logger.Info('Fuck!!!' + values);
				res.status(OK).json({
					user: values[0],
					profile: values[1]
				});
			}).catch((err) => {
				Logger.Info(err);
			});
	}



	@Get()
	getUsers(req: Request, res: Response): any {

		const u = <any>[];

		users.forEach(element => {
			Logger.Info(element, true);
			u.push(element);
		});

		Logger.Info(u, true);

		return res.status(OK).json(u);

	}

	@Delete(':id')
	deleteuserById(req: Request, res: Response) {
		try {
			users.delete(Number(req.params.id));
			return res.status(OK).json({ message: 'success' });
		} catch (err) {
			return res.status(BAD_REQUEST).json({
				error: err.message,
			});
		}
	}

}

