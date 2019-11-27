import { Eureka } from 'eureka-js-client';

export default class SpringCloudEureka {
  static async getEurekaInstance(configOpts) {
    return new Eureka(configOpts);
  }
}
