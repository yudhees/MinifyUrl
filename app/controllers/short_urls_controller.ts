import type { HttpContext } from '@adonisjs/core/http'
import string from '@adonisjs/core/helpers/string'
import { Geolocation } from '../../utils/Geolocation.js';
import Helpers from '../../utils/Helpers.js';
import ShortUrls from '#models/ShortUrls';
import Logs from '#models/Logs';

export default class ShortUrlsController {

  public async ShortenUrl({ request, response }: HttpContext) {
    try {
      const req = request.all()
      // @ts-ignore
      const user=request.user
      if (!req.longUrl)
        return response.status(419)
          .send({ success: false, message: 'longUrl field is required' });
      let { longUrl, customAlias, topic } = req
      if (!this.isValidUrl(longUrl))
        return response.status(419)
          .send({ success: false, message: 'Invalid Url' });
      if (!customAlias) {
        customAlias = string.random(8)
      }
      const existingCustomAlias = await ShortUrls.findOne({ alias: customAlias })
      if (existingCustomAlias) {
        return response.status(419).send({ success: false, message: 'Entered CustomAlias Already Exists' })
      }
      const created_at = new Date()
      const data = {
        originalUrl: longUrl,
        topic: topic?.length ? topic : null,
        alias: customAlias,
        userId:user.id,
        created_at,
        updated_at: created_at,
      }
      const shortUrl = new ShortUrls(data)
      shortUrl.save()
      const res = {
        shortUrl:Helpers.generateurl('shorten.get',[customAlias]),
        createdAt: created_at
      }
      return response.send(res)
    } catch (error) {
      console.log(error)
      return response.status(500).send({ success: false, message: 'SomeThing Went Wrong Please Try Again' })
    }
  }
  isValidUrl(endpoint: string) {
    try {
      new URL(endpoint)
      return true
    } catch (error) {
      return false
    }
  }
  public async RedirectToOriginal({ request, response }: HttpContext) {
    try {
      const { alias } = request.params()
      const shorUrl = await ShortUrls.findOne({ alias })
      if (!shorUrl)
        return response.status(419).send({ success: false, message: 'In valid Alias' })
      const ip = request.ips()?.[1]??request.ip(), userAgent = request.headers()['user-agent'] ?? ''
      const location = await Geolocation.getLocationByIp(ip)
      const {osName,deviceType} = Helpers.getUserAgentInfo(userAgent)
      const logData = {
        alias,
        topic:shorUrl.topic,
        ip,
        userAgent,
        location,
        deviceType,
        osName,
      }
      const logs = new Logs(logData)
      await logs.save()
      return response.redirect(shorUrl.originalUrl)
    } catch (error) {
      console.log(error)
      return response.status(500).send({ success: false, message: 'SomeThing Went Wrong Please Try Again' })
    }
  }

}
