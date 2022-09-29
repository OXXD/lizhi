import { useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  Spacer,
  useMediaQuery,
  Center,
} from '@chakra-ui/react';
import ImgPcBanner from '@/assets/images/pc_banner.png';
import ImgMobileBanner from '@/assets/images/iPhone_banner@3x.png';
import LoginForm from './components/LoginForm';
import TwoFaForm from './components/TwoFaForm';

function PageLogin() {
  const [isLogin, setIsLogin] = useState(false);
  const [isPc] = useMediaQuery('(min-width: 48em)');

  const onLogin = () => {
    setIsLogin(true);
  };

  return (
    <Flex
      w={{ base: '100%', md: 1068 }}
      h={{ base: '100%', md: 640 }}
      flexDirection={{ base: 'column-reverse', md: 'row' }}
    >
      <Image src={isPc ? ImgPcBanner : ImgMobileBanner} />
      <Flex
        direction="column"
        borderRadius="xl"
        w={{ md: 400 }}
        h={{ base: 400, md: 480 }}
        ml={{ base: 5, md: 0 }}
        mr={{ base: 5, md: 0 }}
        mt={20}
        p={{ base: 5, md: 10 }}
        pt={{ base: 7 }}
        pb={{ base: 0, md: 0 }}
        backgroundColor="#fff"
        boxShadow="0 0 20px 0 rgba(187,191,196,0.30);"
      >
        <Heading mb={{ base: 3, md: 7 }} size="lg">
          DIGITALYCHEE
        </Heading>
        {isLogin ? (
          <TwoFaForm />
        ) : (
          <>
            <LoginForm onLogin={onLogin} />
            <Spacer />
            <Box>
              <Divider></Divider>
              <Center mt={{ base: 4, md: 6 }} mb={{ base: 4, md: 6 }}>
                <Text color="#3371FF">其他方式登录</Text>
              </Center>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
}
export default PageLogin;
