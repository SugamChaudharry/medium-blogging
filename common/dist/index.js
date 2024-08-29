"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.uplodeBlogSchema = exports.loginUserSchema = exports.registerUserSchema = exports.CustomError = void 0;
const zod_1 = require("zod");
class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = 'CustomError';
    }
}
exports.CustomError = CustomError;
const registerUserSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    password: zod_1.z.string().min(6),
});
exports.registerUserSchema = registerUserSchema;
const loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    password: zod_1.z.string().min(6),
});
exports.loginUserSchema = loginUserSchema;
const uplodeBlogSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    published: zod_1.z.boolean().default(false),
    authorId: zod_1.z.string()
});
exports.uplodeBlogSchema = uplodeBlogSchema;
const updateBlogSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    published: zod_1.z.boolean().default(false),
    id: zod_1.z.string()
});
exports.updateBlogSchema = updateBlogSchema;
