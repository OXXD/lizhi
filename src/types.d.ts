export type FormData = {
  username: string;
  password: string;
};

export type ResponseType<T = Record<string, any>> = {
  status: number;
  message: string;
  data?: T;
};
