import express from 'express';
import helmet from 'helmet';
import { WebpackHotModule } from './WebpackHotModule';

const app = express();
app.use(helmet());

const apiServer = new ApiServer();
apiServer.start(4000);

// export type ModuleId = string | number;
// declare const module: WebpackHotModule;
// if (module.hot) {
//     module.hot.accept();
//     module.hot.dispose(() => apiServer.stop());
// }											