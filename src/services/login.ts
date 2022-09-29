import { FormData } from '@/types';

export async function login(data: FormData) {
  return fetch('/demo/login.php?phase=1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });
}
