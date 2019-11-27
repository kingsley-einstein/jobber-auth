import Config from 'cloud-config-client';

export default class SpringCloudConfig {
  static load({ endpoint, name, profiles }) {
    return Config.load({
      endpoint,
      name,
      profiles
    });
  }
}
