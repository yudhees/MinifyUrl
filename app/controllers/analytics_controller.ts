import Logs from '#models/Logs'
import type { HttpContext } from '@adonisjs/core/http'
import UrlAnalytics from '../../utils/UrlAnalytics.js'
import ShortUrls from '#models/ShortUrls';
import redis from '@adonisjs/redis/services/main'
import collect from 'collect.js';
export default class AnalyticsController {
  public async AliasAnalytics({request,response}:HttpContext){
    try {
      const {alias}=request.params()
      const rediskey=`alias_${alias}`
      const redisData=await this.getRedis(rediskey)
      if(redisData)return response.send(JSON.parse(redisData))
      const logs=await Logs.find({alias})
      const analytics=new UrlAnalytics(logs)
      const result={
        totalClicks:analytics.totalClicks(),
        uniqueUsers:analytics.uniqueUsers(),
        clicksByDate:analytics.clicksByDate(),
        osType:analytics.osType(),
        deviceType:analytics.deviceType(),
      }
      await this.setRedis(rediskey,result)
      return response.send(result)
    } catch (error) {
      console.log(error)
      return response.status(500).send({ success: false, message: 'SomeThing Went Wrong Please Try Again' })
    }
  }
  public async TopicAnalytics({request,response}:HttpContext){
    try {
      const {topic}=request.params()
      const rediskey=`topic_${topic}`
      const redisData=await this.getRedis(rediskey)
      if(redisData)return response.send(JSON.parse(redisData))
      const logs=await Logs.find({topic})
      const analytics=new UrlAnalytics(logs)
      const result={
        totalClicks:analytics.totalClicks(),
        uniqueUsers:analytics.uniqueUsers(),
        clicksByDate:analytics.clicksByDate(),
        urls:analytics.urlInfo()
      }
      await this.setRedis(rediskey,result)
      return response.send(result)
    } catch (error) {
      console.log(error)
      return response.status(500).send({ success: false, message: 'SomeThing Went Wrong Please Try Again' })
    }
  }
  public async OverAllAnalytics({request,response}:HttpContext){
    try {
      // @ts-ignore
      const user=request.user
      const rediskey='overAllApi_'+user.id
      const redisData=await this.getRedis(rediskey)
      if(redisData)return response.send(JSON.parse(redisData))
      const urls=collect(await ShortUrls.find({userId:user.id},{alias:1,topic:1}))
      const alias=urls.pluck('alias').toArray()
      const logs=await Logs.find({alias:{$in:alias}})
      const analytics=new UrlAnalytics(logs)
      const result={
        totalUrls:urls.count(),
        totalClicks:analytics.totalClicks(),
        uniqueUsers:analytics.uniqueUsers(),
        clicksByDate:analytics.clicksByDate(),
        osType:analytics.osType(),
        deviceType:analytics.deviceType(),
      }
      await this.setRedis(rediskey,result)
      return response.send(result)
    } catch (error) {
      console.log(error)
      return response.status(500).send({ success: false, message: 'SomeThing Went Wrong Please Try Again' })
    }
  }
  async setRedis(rediskey:string,result:any,expire:number=30){
    await redis.set(rediskey,JSON.stringify(result))
    await redis.expire(rediskey,expire)
  }
  async getRedis(rediskey:string){
     return await redis.get(rediskey)
  }
}
