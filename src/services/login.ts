import { FormData, TwoFaFormData } from '@/types';
import { getUserToken } from '@/utils/auth';

export async function login(data: FormData) {
  return fetch('https://gateway.lizhi.io/demo/login.php?phase=1', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function tfa(data: TwoFaFormData) {
  return fetch('https://gateway.lizhi.io/demo/login.php?phase=2', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
    },
    body: JSON.stringify(data),
  });
}
