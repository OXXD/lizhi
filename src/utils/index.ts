import { ResponseType } from '@/types';

export function isResponseSuccess(response: ResponseType<any>) {
  return response.status === 0;
}
