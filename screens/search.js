import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFavorites } from "../Context/FavoritesContext"; // Import the context
import useMovies from "../api/fetchMovies";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites, addFavorite, removeFavorite } = useFavorites(); // Use the context

  const imgPath = "https://image.tmdb.org/t/p/w500/";
  const { data: movies, isLoading, isError } = useMovies();

  if (isLoading) {
    return <Text size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error loading movies.</Text>;
  }
  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFavoriteToggle = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={styles.header}>Find Your Movie</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search movies..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {filteredMovies.map((m) => (
          <View key={m.id} style={styles.movieCard}>
            <Image
              source={{ uri: `${imgPath}${m.poster_path}` }}
              style={styles.image}
            />
            <Text style={styles.title}>{m.title}</Text>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => handleFavoriteToggle(m)}
            >
              <View style={styles.iconContainer}>
                <Icon
                  name={
                    favorites.some((fav) => fav.id === m.id)
                      ? "favorite"
                      : "favorite-border"
                  }
                  size={30}
                  color={
                    favorites.some((fav) => fav.id === m.id) ? "red" : "white"
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  searchInput: {
    height: 40,
    borderColor: "#A02334",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 30,
    marginVertical: 30,
    width: "100%", // Take the full width of the screen
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    color: "#A02334",
    marginTop: 10,
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
    textAlign: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5, // Increase touchable area
  },
  iconContainer: {
    backgroundColor: "rgba(0, 0, 0, 1)", // Semi-transparent background
    borderRadius: 20, // Circular background for the icon
    padding: 5,
  },
});

export default Search;
