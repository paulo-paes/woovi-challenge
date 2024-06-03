import dotenv from 'dotenv';
import Koa from 'koa';
import parser from 'koa-bodyparser';
import cors from '@koa/cors';
import { routes } from './router';
import winston, { Logger } from 'winston';
import mongoose from 'mongoose';
import { Server } from 'node:http'

export class App {
  private port: number;
  private koa: Koa;
  private _server: Server | undefined;
  private database!: mongoose.Mongoose;
  public static log: Logger;

  constructor() {
    dotenv.config({
      path: `.env.${process.env.NODE_ENV}`
    });
    this.port = Number(process.env.PORT) || 8000;
    this.koa = new Koa();
    this.configLog();
    this.configDatabase().catch((err) => {
      App.log.error('failed to connect to database', err);
      process.exit(1);
    });
    this.configKoa();
  }

  private async configDatabase(): Promise<void> {
    App.log.debug(`MONGO URL ${process.env.MONGO_URL}`);
    if (process.env.MONGO_URL)
      this.database = await mongoose.connect(process.env.MONGO_URL!);
  }

  private configKoa(): void {
    this.koa.use(parser()).use(cors()).use(routes());

    this.koa.context.db = this.database;
  }

  private configLog(): void {
    App.log = winston.createLogger({
      transports: [new winston.transports.Console()],
      level: process.env.LOG_LEVEL,
    });
    this.koa.context.log = App.log;
  }

  public start() {
    this._server = (this.koa.listen(this.port, () => {
      App.log.info(`Server running on port ${this.port}`);
    }));

    return this._server;
  }

  public async close() {
    this._server?.close()
  }
}
