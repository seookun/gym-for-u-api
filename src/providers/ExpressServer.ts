import { Application } from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Action, getMetadataArgsStorage, RoutingControllersOptions, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import Locals from './Locals';
import { stream } from '@/utils/logger';
import { verifyAccessToken } from '@/utils/jwt';
import { UserRole } from '@/models/UserModel';

function authorizationChecker(action: Action, requiredRoles: UserRole[]) {
  const accessToken = action.request.headers.authorization?.replace('Bearer', '').trim();
  const { userId, roles } = verifyAccessToken(accessToken);

  const isEmpty = requiredRoles.length === 0;
  const isGranted = requiredRoles.some(roles.includes);

  if (isEmpty || isGranted) {
    action.response.locals.userId = userId;
    return true;
  }

  return false;
}

function currentUserChecker(action: Action) {
  return action.response.locals.userId;
}

export default class Express {
  static init(app: Application) {
    const routingOptions: RoutingControllersOptions = {
      defaultErrorHandler: false,
      routePrefix: Locals.apiPrefix,
      authorizationChecker,
      currentUserChecker,
      controllers: [path.join(__dirname, '../controllers/*.{js,ts}')],
      middlewares: [path.join(__dirname, '../middlewares/*.{js,ts}')],
      interceptors: [path.join(__dirname, '../interceptors/*.{js,ts}')],
    };

    useLogger(app);
    useExpressServer(app, routingOptions);
    useSwagger(app, routingOptions);
  }
}

function useLogger(app: Application) {
  const format = Locals.isProduction ? 'combined' : 'dev';
  app.use(morgan(format, { stream }));
}

function useSwagger(app: Application, options: RoutingControllersOptions) {
  if (Locals.isProduction) return;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
  });

  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, options, {
    components: {
      schemas,
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
}
