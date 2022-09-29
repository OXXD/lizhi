import { Flex } from '@chakra-ui/react';
import PageLogin from './pages/login';

function App() {
  return (
    <Flex
      w="full"
      h="full"
      align="center"
      justifyContent="center"
      bgColor="#F7F7FA"
    >
      <PageLogin />
    </Flex>
  );
}

export default App;
