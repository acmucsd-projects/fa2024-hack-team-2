import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from './utils/passport';
import session from 'express-session';
import connectDB from './db';
import mongoose from 'mongoose';
import cors from 'cors';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import userRoutes from './routes/user';
import postRoutes from './routes/post';
import messageRoutes from './routes/message';
import dotenv from 'dotenv';

dotenv.config();

connectDB();
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',  // Allow requests from frontend (React app)
  methods: 'GET,POST,PUT,DELETE',  // Allow these HTTP methods
  credentials: true,  // Allow cookies to be sent with the request
};

app.use(cors(corsOptions));  // Enable CORS with the configured options

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "session-secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', messageRoutes);


// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
