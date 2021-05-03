import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View, Button, Platform } from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "./app/context/AuthContext";
import { useAuth } from './app/hooks/useAuth';
import AuctionScreen from "./app/screens/AuctionScreen";
import FavoritesScreen from "./app/screens/FavoritesScreen";
import HomeScreen from "./app/screens/HomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import SignInScreen from "./app/screens/SignInScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import UploadScreen from "./app/screens/UploadScreen";
import UserScreen from "./app/screens/UserScreen";
import PayScreen from "./app/screens/PayScreen";
import NotificationScreen from "./app/screens/NotificationScreen"
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import FlashMessage from "react-native-flash-message";
import {shade1, shade2, shade3, shade4, shade5} from "./app/config/color"



const AuthStack = createStackNavigator();
const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator(); 
const UploadStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const RootStack = createStackNavigator();
const NotificationStack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeStackScreen = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={HomeScreen}/>
    <HomeStack.Screen name="Auction" component={AuctionScreen}/>
    <HomeStack.Screen name="User" component={UserScreen}/>
  </HomeStack.Navigator>
)

const NotificationStackScreen = () => (
  <NotificationStack.Navigator headerMode="none">
    <NotificationStack.Screen name="Notification" component={NotificationScreen}/>
  </NotificationStack.Navigator>
)

const ProfileStackScreen = () => (
  <ProfileStack.Navigator headerMode="none">
    <ProfileStack.Screen name="Profile" component={ProfileScreen}/>
    <ProfileStack.Screen name="User" component={UserScreen}/>
    <ProfileStack.Screen name="Auction" component={AuctionScreen}/>
  </ProfileStack.Navigator>
)

const UploadStackScreen = () => (
  <UploadStack.Navigator headerMode="none">
    <UploadStack.Screen name="Upload" component={UploadScreen}/>
    <UploadStack.Screen name="Auction" component={AuctionScreen}/>
    <UploadStack.Screen name="User" component={UserScreen}/>
  </UploadStack.Navigator>
)

const FavoritesStackScreen = () => (
  <FavoritesStack.Navigator headerMode="none">
    <FavoritesStack.Screen name="Favorites" component={FavoritesScreen}/>
    <FavoritesStack.Screen name="Auction" component={AuctionScreen}/>
    <FavoritesStack.Screen name="User" component={UserScreen}/>
  </FavoritesStack.Navigator>
)

const TabsScreen = () => (
  <Tabs.Navigator headerMode="none" >
    <Tabs.Screen 
    name="Home" 
    component={HomeStackScreen}
    options={{
      tabBarLabel: 'Anasayfa',
      tabBarColor: shade5,
      tabBarIcon: ({ color }) => (
        <Icon name="ios-home-outline" color={shade3} size={26} />
      ),
    }}
    />
    <Tabs.Screen 
    name="Notification" 
    component={NotificationStackScreen}
    options={{
      tabBarLabel: 'Bildirimler',
      tabBarColor: shade5,
      tabBarIcon: ({ color }) => (
        <Icon name="notifications-outline" color={shade3} size={26} />
      ),
    }}
    />
    <Tabs.Screen 
    name="Upload"
    component={UploadStackScreen}
    options={{
      tabBarLabel: 'İlan Ver',
      tabBarColor: shade5,
      tabBarIcon: ({ color }) => (
        <Icon name="add-outline" color={shade3} size={26} />
      ),
    }}
    />
    <Tabs.Screen 
    name="Favorites" 
    component={FavoritesStackScreen}
    options={{
      tabBarLabel: 'Listeler',
      tabBarColor: shade5,
      tabBarIcon: ({ color }) => (
        <Icon name="heart-outline" color={shade3} size={26} />
      ),
    }}
    />
    <Tabs.Screen 
    name="Profile" 
    component={ProfileStackScreen}
    options={{
      tabBarLabel: 'Profil',
      tabBarColor: shade5,
      tabBarIcon: ({ color }) => (
        <Icon name="ios-person-outline" color={shade3} size={26} />
      ),
    }}
    />
    
  </Tabs.Navigator>
)

const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen 
      name="SignIn" 
      component={SignInScreen} 
      options={{title: 'Sign In' }}
      // initialParams={{"updateToken": updateToken}}
      />
    <AuthStack.Screen 
      name="SignUp" 
      component={SignUpScreen} 
      options={{title: 'Sign Up' }}
      />
  </AuthStack.Navigator>
)

const RootStackScreen = ({state}) => (
  <RootStack.Navigator headerMode="none">
    {state.user ? (
      <RootStack.Screen name="App" component={TabsScreen}></RootStack.Screen>
    ) : (
      <RootStack.Screen name="Auth" component={AuthStackScreen}></RootStack.Screen>
    )
  }
  </RootStack.Navigator>
)

export default function App() {
  
  const {auth, state} = useAuth();

  return (
    <AuthContext.Provider value={ {auth , user: state.user} }>
      <NavigationContainer>
        <RootStackScreen state={state}></RootStackScreen>
      </NavigationContainer>
      <FlashMessage position="top" floating={true} />
    </AuthContext.Provider>
  );
}

