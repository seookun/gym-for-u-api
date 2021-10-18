import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';

interface ResultSuccess {
  isSuccess: true;
  data?: any;
}

@Interceptor()
export default class ResponseInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any): ResultSuccess {
    return {
      isSuccess: true,
      data: content,
    };
  }
}
