import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { jwt, sign, verify } from 'hono/jwt'
import { uplodeBlogSchema, uplodeBlogType, updateBlogType,updateBlogSchema } from '../../types';


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
  Variables : {
		userId: string
	}
}>()

blogRouter.use('/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload || typeof payload.id !== 'string') {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next()
})

blogRouter.post('/',async (c)=> {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();

  if(!uplodeBlogSchema.safeParse(body).success){
    c.json({error:"invalid user credentials"},411)
  }

  try {
    const authorId = c.get('userId')
    const data:uplodeBlogType = body
    const CreatedBlog = await prisma.post.create({
      data:{
        content: data.content,
        title: data.title,
        published: data.published,
        authorId: authorId
      }
    })
    if(!CreatedBlog){
			c.json({error:"Somthing went wrong"},500)
	  }
    return c.json({
      id: CreatedBlog.id
    })
  } catch (error) {
    console.log(error);
		c.status(403);
		return c.json({ erroerrorr: "error while uploding post" });
  }
})

blogRouter.put('/', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();

  if(!updateBlogSchema.safeParse(body).success){
    c.json({error:"invalid user credentials"},411)
  }

  try {
    const authorId = c.get('userId')
    const data:updateBlogType = body
    const CreatedBlog = await prisma.post.update({
      where: {
        id: data.id,
        authorId: authorId
      },
      data: {
        content: data.content,
        title: data.title,
        published: data.published
      }
    })
    if(!CreatedBlog){
			c.json({error:"Somthing went wrong"},500)
	  }
    return c.text('updated post');
  } catch (error) {
    console.log(error);
		c.status(403);
		return c.json({ erroerrorr: "error while updating post" });
  }
})

blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const post = await prisma.post.findUnique({
		where: {
			id
		}
	});

	return c.json(post);
})
blogRouter.get('/bulk',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const posts = await prisma.post.findMany({});

	return c.json(posts);
})
