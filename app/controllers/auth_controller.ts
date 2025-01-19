import Tokens from '#models/Tokens'
import Users from '#models/Users'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

  public async saveUserDets({ ally, response }: HttpContext): Promise<any> {
    try {
      const gh = ally.use('google')
      if (gh.accessDenied()) {
        return response.status(413).send({ success: false, message: 'You have cancelled the login process' })
      }

      if (gh.stateMisMatch()) {
        return response.status(413).send({ success: false, message: 'We are unable to verify the request. Please try again' })
      }
      if (gh.hasError()) {
        response.send({ success: false, message: 'We are unable to verify the request. Please try again' })
        return
      }
      const user = await gh.user()

      const userData = {
        name: user.name,
        email: user.email,
        googleUserId: user.id,
        updated_at: new Date()
      }
      const updatedUser=await Users.findOneAndUpdate({ email: user.email }, { $set: userData, $setOnInsert: { created_at: new Date() } }, { upsert: true ,returnDocument:'after'});
      const data={...user.token,userId:updatedUser.id}
      const token=new Tokens(data)
      await token.save()
      return response.send({success:true,token:data.token})
    } catch (err) {
      response.send({ success: false, message: 'We are unable to verify the request. Please try again' })
    }
  }
}
