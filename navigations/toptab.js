import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../screens/home";
import Favorites from "../screens/favorites";
import { Text, StyleSheet } from "react-native";
import About from "../screens/about";
import Search from "../screens/search";

const Tab = createMaterialTopTabNavigator();

function TopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#A02334", // Active tab text color
        tabBarInactiveTintColor: "#666", // Inactive tab text color
        tabBarLabelStyle: {
          fontSize: 14, // Font size for tab labels
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#A02334", // Color of the underline indicator
        },
        tabBarStyle: {
          backgroundColor: "#f2f2f2", // Background color of the tab bar
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
}

export default TopTabs;
