import conn from './../index';
import { Logger } from '@overnightjs/logger';

export class UserService {
	async userById(id: any) {
		return new Promise(async (resolve, reject) => {
			try {
				await conn.query(`SELECT * FROM tb_user WHERE id = ${id} `, [id], (err: any, data: any) => {
					if (err) {
						return reject({ message: err.message });
					}

					Logger.Info(data, true);

					if (data.length > 0) {
						resolve(data[0]);
					} else {
						resolve({});
					}
				});
			} catch (err) {
				reject({ message: err.message });
				throw err;
			}
		})
	}


	async profileById(id: any) {
		return new Promise(async (resolve, reject) => {
			try {
				await conn.query(`SELECT * FROM tb_profile WHERE id = ${id} `, [id], (err: any, data: any) => {
					if (err) {
						return reject({ message: err.message });
					}
					Logger.Info(data, true);

					if (data.length > 0) {
						resolve(data[0]);
					} else {
						resolve({});
					}
				});
			} catch (err) {
				reject({ message: err.message });
				throw err;
			}
		})
	}

	insertUser(body: any) {
		return new Promise((resolve, reject) => {
			if (body.hasOwnProperty('usr')
				&& body.hasOwnProperty('pwd')
				&& body.hasOwnProperty('fullname')) {
				var data = {
					usr: body.usr,
					pwd: body.pwd,
					fullname: body.fullname
				};

				conn.query('INSERT INTO tb_user SET ? ', data, (err: any, data: any) => {
					if (err) {
						return reject({ message: err.message });
					}
					return resolve(data);
				});

			} else {
				return reject({ message: 'validate failure !!!' });
			}
		})
	}
}