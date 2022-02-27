import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home'
import Movies from './screens/components/Movies'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './config/apolloClient'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ title: 'Welcome to HackTix-XXI' }} />
          <Stack.Screen name="Movies" component={Movies} options={{ title: 'Movie Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    justifyContent: "center",
  }
});

export default App;