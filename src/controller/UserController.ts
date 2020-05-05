import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Post, Delete } from "@overnightjs/core";
import { Request, Response, NextFunction } from "express";
import { Logger } from '@overnightjs/logger';
import conn from '..';

var users = new Map<number, any>();

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

@Controller('api/user')
export class UserController {



	@Post()
	postSaveUser(req: Request, res: Response): any {
		if (req.body.hasOwnProperty('usr')
			&& req.body.hasOwnProperty('pwd')
			&& req.body.hasOwnProperty('fullname')) {
			var data = {
				usr: req.body.usr,
				pwd: req.body.pwd,
				fullname: req.body.fullname
			};

			conn.query('INSERT INTO tb_user SET ? ', data, (err: any, res: any) => {
				if (err) throw err;
				Logger.Info(res, true);
				return res.status(OK).json(data);
			});


		}
		return res.status(BAD_REQUEST).json({ message: 'validate fail!' });
	}

	@Get(':id')
	async getUserById(req: Request, res: Response) {
		try {
			conn.query('SELECT * FROM tb_user WHERE id = ? ', [req.params.id], (err: any, data: any) => {
				if (err) {
					throw err;
				}

				if (data.length > 0) {
					res.status(OK).json(data[0]);
				} else {
					res.status(OK).json({});
				}
			});
		} catch (err) {
			res.status(BAD_REQUEST).json({ message: err.message });
			throw err;
		}
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

