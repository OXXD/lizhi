import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Button,
  InputLeftElement,
  InputGroup,
  Stack,
  Text,
  Center,
} from '@chakra-ui/react';
import ImgPcEmail from '@/assets/images/pc_emall.png';
import ImgPcPassword from '@/assets/images/pc_password.png';
import { login } from '@/services/login';
import { isResponseSuccess } from '@/utils';
import { REGEX_PASSWORD, REGEX_USERNAME } from '@/utils/regex';
import { setUserToken } from '@/utils/auth';
import { FormData, ResponseType } from '@/types';

type Props = {
  onLogin: () => void;
};

function LoginForm(props: Props) {
  const { onLogin } = props;
  const [loginRes, setLoginRes] = useState<ResponseType<{ token: string }>>();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = (await (await login(values)).json()) as ResponseType<{
        token: string;
      }>;
      setLoginRes(res);
      if (isResponseSuccess(res) && res?.data?.token) {
        setUserToken(res?.data.token);
        onLogin();
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={5}>
        <FormControl isInvalid={!!errors.username?.message}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Image src={ImgPcEmail} />}
            />
            <Input
              id="username"
              placeholder="请输入用户名"
              focusBorderColor="#3371FF"
              _placeholder={{ color: '#B1B3B8' }}
              {...register('username', {
                required: '请输入用户名',
                pattern: {
                  value: REGEX_USERNAME,
                  message: '邮箱格式错误，请重新输入',
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.username?.message + ''}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password?.message}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Image src={ImgPcPassword} />}
            />
            <Input
              id="password"
              type="password"
              placeholder="请输入密码"
              focusBorderColor="#3371FF"
              _placeholder={{ color: '#B1B3B8' }}
              {...register('password', {
                required: '请输入密码',
                pattern: {
                  value: REGEX_PASSWORD,
                  message: '密码格式错误，请重新输入',
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.password?.message + ''}</FormErrorMessage>
        </FormControl>
        <Button
          w="full"
          type="submit"
          isLoading={isSubmitting}
          disabled={!isDirty}
          bg="#3371FF"
          color="#fff"
          _hover={{ bg: 'messenger.600' }}
          _disabled={{
            backgroundColor: '#BBBFC4',
            color: '#fff',
            _hover: { bg: '#BBBFC4' },
            cursor: 'not-allowed',
          }}
        >
          下一步
        </Button>
        {loginRes?.status !== 0 ? (
          <Center>
            <Text fontSize="sm" color="#FC6161">
              {loginRes?.message}
            </Text>
          </Center>
        ) : null}
      </Stack>
    </form>
  );
}

export default LoginForm;
