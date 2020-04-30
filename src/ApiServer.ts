import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import { Server } from '@overnightjs/core';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@overnightjs/logger';

class ApiServer extends Server {
    private readonly SERVER_STARTED = 'Example server started on port: ';
    private appserver: any;

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.all('/*', this.setupCORS);

        this.setupControllers();
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }

    public start(port: number): void {
        this.appserver = this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });

        this.appserver.setTimeout(5000);
    }

    public stop(): void {
        this.appserver.close();
    }

    private setupCORS(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type, Accept, X-Access-Token, X-Key, Authorization');
        res.header('Access-Control-Allow-Origin', '*');
        if (req.method === 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    }
}

export default ApiServer;				