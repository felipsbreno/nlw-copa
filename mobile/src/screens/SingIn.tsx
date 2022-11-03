import { Center, Text, Icon } from 'native-base';
import { useAuth } from '../hooks/useAuth';
import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';
import { Fontisto } from '@expo/vector-icons';

// parei aqui https://youtu.be/ruNzOzYZsk4?t=2951

export function SingIn() {
  const { singIn, user } = useAuth();

  console.log('Data: ', user);

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />

      <Button
        type="SECONDARY"
        title="Entrar com a conta do Google"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt={12}
        onPress={singIn}
      />

      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {'\n'}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  );
}
