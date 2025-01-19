import Tokens from '#models/Tokens';
import Users from '#models/Users';
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthorizeUserMiddleware {
  async handle({request,response}: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const token = request.header('Authorization');
    const bearerToken = token && token.startsWith('Bearer ') ? token.slice(7) : null;
    if(!bearerToken?.length){
       return response.status(401).send({success:false,message:'Un Authorised'})
    }
    const tokenData=await Tokens.findOne({token:bearerToken},{token:1,userId:1})
    if(!tokenData)
      return response.status(401).send({success:false,message:'In valid Token or Token Expired'})
    const user =await Users.findById(tokenData.userId)
    if (!user) {
      return response.status(404).send({ success: false, message: 'User Not Found' });
    }
    // @ts-ignore
    request.user=user
    return next();

    /**
     * Call next method in the pipeline and return its output
     */
    // const output = await next()
    // return output
  }
}
