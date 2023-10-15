//ENV variables

require("dotenv").config();

import express from 'express'
import config from 'config'

const app = express()

//JSON middleware
app.use(express.json())

//db
import db from '../config/db';

//routers
import router from './router'

//logger
import Logger from '../config/logger';

//middlewares
import morganMiddleware from './middleware/morganMiddleware';

app.use(morganMiddleware);
app.use("/api/", router);

// app port
const port = config.get<number>('port')


app.listen(port, async () => {
    await db();
    Logger.info(`aplicação está funcionando na porta ${port}`);
});