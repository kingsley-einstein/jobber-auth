import actuator from 'express-actuator';
import middlewares from '../middlewares';
import router from '../routes';

const { Cors } = middlewares;

export default (app) => (logger, { json, urlencoded }) => {
  app.use(json());
  app.use(urlencoded({
    extended: true
  }));
  app.use(Cors.corsify('*', 'GET, POST, PUT, PATCH, DELETE', 'Authorization, Content-Type'));
  app.use(logger('dev'));
  app.use(actuator());
  app.use('/api/v1', router);
};
