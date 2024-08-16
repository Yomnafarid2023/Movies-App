import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.description}>
          Welcome to MovieApp! We are dedicated to providing you with the best
          movie experience. Our app allows you to browse and filter movies, mark
          your favorites, and keep track of the latest releases. We strive to
          offer an intuitive and enjoyable user experience with a clean
          interface and up-to-date movie information.
        </Text>
        <Text style={styles.description}>
          Feel free to explore our app and let us know if you have any feedback
          or suggestions. Thank you for choosing MovieApp!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 25,
    elevation: 6, // Stronger shadow effect on Android
    shadowColor: "#000", // Shadow color on iOS
    shadowOffset: { width: 0, height: 4 }, // Stronger shadow offset on iOS
    shadowOpacity: 0.2, // Slightly darker shadow on iOS
    shadowRadius: 5, // Larger shadow radius on iOS
    marginVertical: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#A02334",
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    color: "#444",
    marginBottom: 15,
    textAlign: "justify", // Improved readability
  },
});

export default About;
