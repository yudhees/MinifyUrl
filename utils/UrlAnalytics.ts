import collect, { Collection } from "collect.js";
import moment from "moment";
import Helpers from "./Helpers.js";

export default class UrlAnalytics {
  public logs: Collection<any>
  constructor(logs: Array<any>) {
    const transformedLog = collect(logs).map(log => {
      const res = log.toObject()
      res.createdAtDate = moment(log.created_at).format('YYYY-MM-DD');
      return res
    })
    this.logs = transformedLog
  }
  totalClicks() {
    return this.logs.count()
  }
  uniqueUsers() {
    return this.logs.unique('ip').count()
  }
  clicksByDate() {
    const data = this.logs.mapToGroups((item) => [item.createdAtDate, item._id]).map((item, key) => {
      return {
        date: key,
        count: item.length
      }
    }).toArray();
    return data
  }
  osType(){
     const data=this.logs.groupBy('osName').map((items,key)=>{
        return{
          osName:key,
          uniqueClicks:items.count(),
          uniqueUsers:items.unique('ip').count()
        }
     }).values().toArray()
    return data
  }
  deviceType(){
     const data=this.logs.groupBy('deviceType').map((items,key)=>{
        return{
          deviceName:key,
          uniqueClicks:items.count(),
          uniqueUsers:items.unique('ip').count()
        }
     }).values().toArray()
    return data
  }
  urlInfo(){
    const data=this.logs.groupBy('alias').map((items,key)=>{
      return{
        shortUrl:Helpers.generateurl('shorten.get',[key]),
        totalClicks:items.count(),
        uniqueUsers:items.unique('ip').count(),
      }
    }).values().toArray()
    return data
  }
}
