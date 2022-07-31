import React from 'react';

// screens
import ProfileToEdit from './screen/ProfileToEdit'
import ChooseIcon from './screen/ChooseIcon'
import Camera from './screen/Camera'

// navigation
import Tabs from './components/Tabs';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// profile
import { ProfileProvider } from './components/ProfileContext';

// translate
import { getLang, setLang } from './lang/translate';

const Stack = createNativeStackNavigator();

const App = () => {
  setLang(getLang());
  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Inicio" component={Tabs} options={{headerShown: false}} />  
            <Stack.Screen name="ProfileToEdit" component={ProfileToEdit} />
            <Stack.Screen name="ChooseIcon" component={ChooseIcon} />
            <Stack.Screen name='Camera' component={Camera} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>);
};

export default App;
