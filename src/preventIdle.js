import http from 'http';
import env from './env';

const { thisHost } = env;

export default async () => {
  setInterval(() => {
    http.get({ host: thisHost, path: '/api/v1' }, (res) => {
      res.on('data', (chunk) => {
        try {
          console.log('Data Received', Buffer.from(chunk).toString());
        } catch (err) {
          console.log('Error occured', err);
        }
      });
    })
      .on('error', (err) => {
        console.log('Error occured', err.message);
      });
  }, 60 * 5 * 1000);
};
