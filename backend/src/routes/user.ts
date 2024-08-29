import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { loginUserSchema, loginUserType, registerUserSchema, registerUserType } from '../../types';


export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>()


userRouter.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();

  if(!registerUserSchema.safeParse(body).success) {
		c.json({error:"invalid user credentials"},411)
  }
	try {
		const data:registerUserType = body
		const User = await prisma.user.create({
			data: {
				name:data.name,
				email:data.email,
				password: data.password,
			}
		})

	  const createdUser = await prisma.user.findMany({
	    where: {
	      id:User.id,
	    },
	    select: {
	      email: true,
	      name: true,
	    },
	  })

	  if(!createdUser){
			c.json({error:"Somthing went wrong"},500)
	  }
	  const token = await sign({id: User.id}, c.env.JWT_SECRET)
	  return c.json({token},200)

	} catch (error) {
		console.log(error);
		c.status(403);
		return c.json({ erroerrorr: "error while signing up" });
	}
})
userRouter.post('/api/v1/user/signin', async (c) => {
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
	const body = await c.req.json();

  if(!loginUserSchema.safeParse(body).success) {
		c.json({error:"invalid user credentials"},411)
  }
	try {
		const data:loginUserType = body
		const user = await prisma.user.findUnique({
			where:{
				email: data.email
			}
		})

		if(!user) return c.json({
			error: "user not found"
		}, 403)

		const token = await sign({id: user.id}, c.env.JWT_SECRET)
		return c.json({ token });
	} catch (error) {
		console.log(error);
		c.status(403);
		return c.json({ erroerrorr: "error while signing up" });
	}
})