import http from 'https';
import env from './env';

const { thisHost } = env;

export default async () => {
  setInterval(() => {
    http.request({ method: 'GET', path: '/api/v1', host: thisHost }, (res) => {
      res.on('data', (chunk) => {
        console.log('Data Received', Buffer.from(chunk).toString());
      });
    });
  }, 60 * 5 * 1000);
};
