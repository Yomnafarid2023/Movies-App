import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFavorites } from "../Context/FavoritesContext"; // Import the context
// import { getMyObject } from "../localStorage/appCache";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const imgPath = "https://image.tmdb.org/t/p/w500/";

  // useEffect(() => {
  //   async function func() {
  //     console.warn("hi");
  //     const get = await getMyObject();
  //     console.warn("ay 7aga", get);

  //     if (get === null) {
  //       console.warn("fhfbhfoiewwe;lj");
  //     }
  //   }
  //   func();
  // }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Favorites</Text>
      </View>
      {favorites.length > 0 ? (
        favorites.map((movie) => (
          <View key={movie.id} style={styles.movieCard}>
            <Image
              source={{ uri: `${imgPath}${movie.poster_path}` }}
              style={styles.image}
            />
            <Text style={styles.title}>{movie.title}</Text>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => removeFavorite(movie.id)}
            >
              <View style={styles.iconContainer}>
                <Icon name="favorite" size={30} color="red" />
              </View>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View style={styles.noFavoritesCard}>
          <Text style={styles.noFavoritesText}>No favorites yet</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  headerContainer: {
    width: "100%", // Ensure the header takes the full width
    alignItems: "center", // Center the content horizontally
    marginBottom: 30, // Add some space below the header
  },
  header: {
    fontSize: 30,
    color: "#A02334",
    marginTop: 10,
    textAlign: "center",
  },
  movieCard: {
    width: "45%", // Two cards per row with some margin
    marginBottom: 20,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5, // Increase touchable area
  },
  iconContainer: {
    backgroundColor: "rgba(0, 0, 0, 1)", // Solid background
    borderRadius: 20, // Circular background for the icon
    padding: 5,
  },
  noFavoritesCard: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginVertical: 20,
  },
  noFavoritesText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A02334",
  },
});

export default Favorites;
