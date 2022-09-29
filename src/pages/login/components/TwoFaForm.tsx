import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  Image,
  Stack,
  Button,
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  Center,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import ImgPcPassword from '@/assets/images/pc_password.png';
import ImgPcAvatar from '@/assets/images/pc_tx.png';
import ImgMobileAvatar from '@/assets/images/iphone_tx.png';
import { tfa } from '@/services/login';
import { isResponseSuccess } from '@/utils';
import { TwoFaFormData, ResponseType } from '@/types';
import { useState } from 'react';

function TwoFaForm() {
  const [loginRes, setLoginRes] = useState<ResponseType>();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TwoFaFormData>();
  const [isPc] = useMediaQuery('(min-width: 48em)');

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = (await (await tfa(values)).json()) as ResponseType;
      setLoginRes(res);
      if (isResponseSuccess(res)) {
        window.location.href = 'https://www.lizhi.io/';
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Stack spacing={5}>
          <Center>
            <Image
              src={isPc ? ImgPcAvatar : ImgMobileAvatar}
              borderRadius="full"
              boxSize="72px"
            />
          </Center>
          <FormControl isInvalid={!!errors.tfa?.message}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Image src={ImgPcPassword} />}
              />
              <Input
                id="tfa"
                placeholder="请输入你的两步认证验证码"
                focusBorderColor="#3371FF"
                _placeholder={{ color: '#B1B3B8' }}
                maxLength={6}
                {...register('tfa', {
                  required: '请输入你的两步认证验证码',
                  pattern: {
                    value: /^\d{6}$/,
                    message: '请输入六位数字验证码',
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage>{errors.tfa?.message + ''}</FormErrorMessage>
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
            确定
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
    </Box>
  );
}

export default TwoFaForm;
