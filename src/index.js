import express from 'express';
import morgan from 'morgan';
import db from './db';
import configuration from './config';
import env from './env';
import spring from './spring';
import preventIdle from './preventIdle';

const app = express();
const { SpringCloudConfig, SpringCloudEureka } = spring;
const { ports, cloud } = env;
const { sequelize } = db;

const configure = (cb) => {
  cb(morgan, express);
};

const fetchConfigAndRegisterWithEureka = async () => {
  const config = await SpringCloudConfig.load(cloud);
  const eurekaOpts = {
    instance: {
      app: config.get('eureka.instance.app'),
      instanceId: 'auth-id',
      hostName: config.get('eureka.instance.hostName'),
      port: {
        $: parseInt(ports[process.env.NODE_ENV], 10) || 8080,
        enabled: true
      },
      ipAddr: config.get('eureka.instance.hostName'),
      vipAddress: config.get('eureka.instance.vipAddress'),
      statusPageUrl: config.get('eureka.instance.statusPageUrl'),
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn'
      }
    },
    eureka: {
      host: config.get('eureka.host'),
      port: config.get('eureka.port') || 80,
      servicePath: '/eureka/apps/'
    }
  };
  const eureka = await SpringCloudEureka.getEurekaInstance(eurekaOpts);
  eureka.start((err) => {
    throw err;
  });
};

configure(configuration(app));

app.listen(ports[process.env.NODE_ENV], () => {
  console.log(`Server running on ${ports[process.env.NODE_ENV]} in ${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV !== 'test') {
    sequelize.sync().then(async () => {
      await fetchConfigAndRegisterWithEureka();
      if (process.env.NODE_ENV === 'production') {
        console.log('Running prevent idle');
        await preventIdle();
      }
    });
  }
});

export default app;
