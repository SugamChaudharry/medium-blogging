import { z } from 'zod'
class CustomError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = 'CustomError';
  }
}

const  registerUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({message: "Invalid email format"}),
  password: z.string().min(6),
})
const  loginUserSchema = z.object({
  email: z.string().email({message: "Invalid email format"}),
  password: z.string().min(6),
})

type registerUserType  = z.infer<typeof registerUserSchema>
type loginUserType = z.infer<typeof loginUserSchema>

const uplodeBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().default(false),
  authorId:  z.string()
})
const updateBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().default(false),
  id: z.string()
})

type uplodeBlogType = z.infer<typeof uplodeBlogSchema>
type updateBlogType =z.infer<typeof updateBlogSchema>
export {
  CustomError,
  registerUserSchema,
  loginUserSchema,
  registerUserType,
  loginUserType,
  uplodeBlogSchema,
  updateBlogSchema,
  uplodeBlogType,
  updateBlogType
}