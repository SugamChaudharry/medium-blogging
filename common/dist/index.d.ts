import { z } from 'zod';
declare class CustomError extends Error {
    code: number;
    constructor(message: string, code: number);
}
declare const registerUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
type registerUserType = z.infer<typeof registerUserSchema>;
declare const loginUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
type loginUserType = z.infer<typeof loginUserSchema>;
declare const uplodeBlogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodDefault<z.ZodBoolean>;
    authorId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    published: boolean;
    authorId: string;
}, {
    title: string;
    content: string;
    authorId: string;
    published?: boolean | undefined;
}>;
type uplodeBlogType = z.infer<typeof uplodeBlogSchema>;
declare const updateBlogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodDefault<z.ZodBoolean>;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    published: boolean;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
    published?: boolean | undefined;
}>;
type updateBlogType = z.infer<typeof updateBlogSchema>;
export { CustomError, registerUserSchema, loginUserSchema, registerUserType, loginUserType, uplodeBlogSchema, updateBlogSchema, uplodeBlogType, updateBlogType };
