import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { ValidationError } from 'class-validator';
import logger from '@/utils/logger';

interface ResultFailure {
  isSuccess: false;
  error: {
    message: string;
    validationErrors?: ValidationError[];
  };
}

@Middleware({ type: 'after' })
export default class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(err: any, req: any, res: any) {
    logger.error(err);
    res.status(err.httpCode || 500).json(this.toResultFailure(err));
  }

  private toResultFailure(err: any): ResultFailure {
    return {
      isSuccess: false,
      error: {
        message: err.message,
        validationErrors: err.errors?.map((e: ValidationError) => ({
          ...e,
          target: e.target?.constructor.name,
        })),
      },
    };
  }
}
