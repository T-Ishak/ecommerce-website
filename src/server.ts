import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes'
import pool from './config/database'
import errorHandler from './middleware/errorhandler'

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api', routes);

//error handling
app.use(errorHandler);

const startServer = async () => {
    try{
        pool.query('SELECT NOW()');
        console.log('Database connection verified');

        app.listen(PORT, () =>{
            console.log(`Server running on http://localhost:${PORT}`);
        })
    }
    catch (error){
        console.log('Server failed to start');
        process.exit(-1);
    }
}

startServer();






