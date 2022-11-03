import { Box } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/useAuth';

import { SingIn } from '../screens/SingIn';
import { AppRoutes } from './app.routes';

export function Routes() {
  const { user } = useAuth();

  return (
    <Box flex={1} bgColor="gray.900">
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SingIn />}
      </NavigationContainer>
    </Box>
  );
}
