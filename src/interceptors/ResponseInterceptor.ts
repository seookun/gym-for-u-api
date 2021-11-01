import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';

type ResultSuccess = any;

@Interceptor()
export default class ResponseInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any): ResultSuccess {
    return content;
  }
}
