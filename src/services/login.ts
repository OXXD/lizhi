import { FormData, TwoFaFormData } from '@/types';
import { getUserToken } from '@/utils/auth';

export async function login(data: FormData) {
  const urlencoded = new URLSearchParams();
  urlencoded.append('username', data.username);
  urlencoded.append('password', data.password);
  return fetch('https://gateway.lizhi.io/demo/login.php?phase=1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: urlencoded,
  });
}

export async function tfa(data: TwoFaFormData) {
  const urlencoded = new URLSearchParams();
  urlencoded.append('tfa', data.tfa);
  return fetch('https://gateway.lizhi.io/demo/login.php?phase=2', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: urlencoded,
  });
}
