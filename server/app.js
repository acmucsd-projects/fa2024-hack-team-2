"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("./utils/passport"));
const express_session_1 = __importDefault(require("express-session"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
const message_1 = __importDefault(require("./routes/message"));
const dotenv_1 = __importDefault(require("dotenv"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from frontend (React app)
    methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
    credentials: true, // Allow cookies to be sent with the request
};
app.use((0, cors_1.default)(corsOptions)); // Enable CORS with the configured options
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'pug');
// middleware
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "session-secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Routes
app.use('/', index_1.default);
app.use('/auth', auth_1.default);
app.use('/user', user_1.default);
app.use('/posts', post_1.default);
app.use('/api', message_1.default);
app.use('/leaderboard', leaderboard_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
