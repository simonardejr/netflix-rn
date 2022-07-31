
import React from 'react';

import Home from './../screen/Home';
import More from './../screen/More';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { translate } from './../lang/translate';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveBackgroundColor: 'black',
      tabBarInactiveBackgroundColor: 'black',
      tabBarActiveTintColor: '#E46267'
    }}>
    <Tab.Screen 
    name="Home" 
    component={Home} 
    options={{
      headerShown: false,
      tabBarLabel: `${translate('home')}`,
      tabBarIcon: ({color, size}) => {
        return <Icon name="home-circle" size={size} color={color} />
      },
    }} />
    <Tab.Screen name={translate('profile')} component={More}
    options={{
      tabBarLabel: `${translate('profile')}`,
      tabBarIcon: ({color, size}) => {
        return <Icon name="account-circle" size={size} color={color} />
      },
    }} />
    <Tab.Screen name={translate('search')} component={Home}
    options={{
      tabBarLabel: `${translate('search')}`,
      tabBarIcon: ({color, size}) => {
        return <Icon name="magnify" size={size} color={color} />
      },
    }} />
    <Tab.Screen name={translate('soon')} component={Home}
    options={{
      tabBarLabel:  `${translate('soon')}`,
      tabBarIcon: ({color, size}) => {
        return <Icon name="clock" size={size} color={color} />
      },
    }} />
    <Tab.Screen name={translate('downloads')} component={Home}
    options={{
      tabBarLabel: `${translate('downloads')}`,
      tabBarIcon: ({color, size}) => {
        return <Icon name="download-circle" size={size} color={color} />
      },
    }} />
    </Tab.Navigator>
  );
};

export default Tabs
