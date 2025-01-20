/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import ShortUrlsController from '#controllers/short_urls_controller'
import { apiThrottle } from './limiter.js'
import AnalyticsController from '#controllers/analytics_controller'
import { middleware } from './kernel.js'
router.on('/').renderInertia('login')
router.get('/login', async({ ally }) => {
  const google=ally.use('google')
  return google.stateless().redirect()
})
router.get('/getAuthUser',[AuthController,'saveUserDets'])
router.group(()=>{
   router.post('/shorten',[ShortUrlsController,'ShortenUrl']).use(middleware.authorizeUser()).use(apiThrottle)
   router.get('/shorten/:alias', [ShortUrlsController,'RedirectToOriginal']).as('shorten.get')
   router.get('/analytics/overall',[AnalyticsController,'OverAllAnalytics']).use(middleware.authorizeUser());
   router.get('/analytics/:alias',[AnalyticsController,'AliasAnalytics']);
   router.get('/analytics/topic/:topic',[AnalyticsController,'TopicAnalytics']);

}).prefix('/api')

router.get('/ips', async ({ request,response }) => {
  return response.send({headers:request.headers(),ips:request.ip()})
})
