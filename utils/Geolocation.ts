import env from '#start/env';
import axios from 'axios'
const apiKey = env.get('IP_INFO_API_KEY')
export class Geolocation {
  public static async getLocationByIp(ip: string) {
    // ip="152.58.199.95"
    try {
      const response = await axios.get(`https://ipinfo.io/${ip}?token=${apiKey}`);
      const { country, region, city, loc } = response.data;
      const location = {
        country,
        region,
        city,
        latitude: loc.split(',')[0],
        longitude: loc.split(',')[1],
      };
      return location;
    } catch (error) {
      console.error(error)
      return null
    }

  }
}
