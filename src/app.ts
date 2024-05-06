import cors from 'cors';
import * as path from 'path';
import helmet from 'helmet';

import express, { Application } from 'express';
import { requestLoggerMiddleware } from './middlewares/request-logger.middleware';

export class App {
    readonly _instance = Symbol.for('App');

    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();

        this.settings();
        this.middlewares();
        this.routes();
    }

    public listen() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Node api gateway server started !');
        });
    }

    private settings() {
        this.app.set('port', process.env.PORT || this.port || 8080);
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json({ limit: 5 * 1024 * 1024 }));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(requestLoggerMiddleware);
    }

    private routes() {}
}
