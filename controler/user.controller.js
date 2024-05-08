"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var user_model_1 = require("../model/user.model");
var user_services_1 = require("../services/user.services");
var jwt = require("jsonwebtoken");
var UserController = /** @class */ (function () {
    function UserController() {
        this.authService = new user_services_1.AuthService(); //giving instance of class(AuthService) to that object 
    }
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, email, password, role, existingUser, newUser, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, username = _a.username, email = _a.email, password = _a.password, role = _a.role;
                        return [4 /*yield*/, user_model_1.UserModel.findOne({ email: email })];
                    case 1:
                        existingUser = _b.sent();
                        if (existingUser) {
                            res.status(400).json({ message: 'Email is already registered' });
                            return [2 /*return*/];
                        }
                        newUser = new user_model_1.UserModel({ username: username, email: email, password: password, role: role });
                        return [4 /*yield*/, newUser.save()];
                    case 2:
                        _b.sent();
                        res.status(201).json({ message: 'User created successfully', user: newUser });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        res.status(500).json({ message: 'Failed to create user', error: err_1.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, token, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, user_model_1.UserModel.findOne({ email: email, password: password })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            res.status(401).json({ message: 'user not found' });
                            return [2 /*return*/];
                        }
                        token = jwt.sign({ userId: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
                        res.status(200).json({ message: 'Login successful', token: token });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _b.sent();
                        res.status(500).json({ message: 'Failed to login', error: err_2.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
