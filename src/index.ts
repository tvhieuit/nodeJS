import express from 'express';
import helmet from 'helmet';
import ApiServer from './ApiServer';
import { Logger, LoggerModes } from '@overnightjs/logger';

const app = express();
app.use(helmet());

const apiServer = new ApiServer();
apiServer.start(3000);

type ModuleId = string | number;
interface WebpackHotModule {
	hot?: {
		data: any;
		accept(
			dependencies: string[],
			callback?: (updatedDependencies: ModuleId[]) => void,
		): void;
		accept(dependency: string, callback?: () => void): void;
		accept(errHandler?: (err: Error) => void): void;
		dispose(callback: (data: any) => void): void;
	};
}

declare const module: WebpackHotModule;
if (module.hot) {
	module.hot.accept();
	module.hot.dispose(() => apiServer.stop());
}

Logger.mode = LoggerModes.Console;