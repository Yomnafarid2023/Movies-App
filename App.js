import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TopTabs from "./navigations/toptab";
import { FavoritesProvider } from "./Context/FavoritesContext";
import { QueryClient, QueryClientProvider } from "react-query";
// import Drawer from "./navigations/drawer";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <NavigationContainer>
          <StatusBar hidden />
          <TopTabs />
        </NavigationContainer>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
