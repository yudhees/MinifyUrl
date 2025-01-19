import env from '#start/env';
import router from '@adonisjs/core/services/router';
import {UAParser} from 'ua-parser-js';
export default class Helpers {
  public static getUserAgentInfo(userAgent:string) {
    const {  device,os} = UAParser(userAgent);
    return {
      osName:os.name,
      deviceType:device.type??'web',
    };
  }
  public static generateurl(routeName:string,params:Array<any>=[]) {
    return router.builder().prefixUrl(env.get('APP_URL')).params(params).make(routeName)
  }
}
