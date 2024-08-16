import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFavorites } from "../Context/FavoritesContext";
import useMovies from "../api/fetchMovies";

const Home = () => {
  const { favorites, addFavorite, removeFavorite } = useFavorites(); // Use the context

  const imgPath = "https://image.tmdb.org/t/p/w500/";
  const { data: movies, isLoading, isError } = useMovies(); //tanStack Query

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error loading movies.</Text>;
  }

  // Categories based on genres
  const categories = [
    { title: "Action", genreId: 28 },
    { title: "Comedy", genreId: 35 },
    { title: "Drama", genreId: 18 },
    { title: "Horror", genreId: 27 },
    { title: "Romance", genreId: 10749 },
  ];

  const handleFavoriteToggle = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const renderMovieItem = ({ item }) => (
    <View key={item.id} style={styles.movieCard}>
      <Image
        source={{ uri: `${imgPath}${item.poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => handleFavoriteToggle(item)}
      >
        <View style={styles.iconContainer}>
          <Icon
            name={
              favorites.some((fav) => fav.id === item.id)
                ? "favorite"
                : "favorite-border"
            }
            size={30}
            color={
              favorites.some((fav) => fav.id === item.id) ? "red" : "white"
            }
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderCategory = (category) => {
    const categoryMovies = movies.filter((movie) =>
      movie.genre_ids.includes(category.genreId)
    );

    if (categoryMovies.length === 0) return null;

    return (
      <View key={category.genreId} style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <FlatList
          data={categoryMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {categories.map((category) => renderCategory(category))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 15,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#A02334",
  },
  movieCard: {
    width: 150, // Width of each movie card
    marginRight: 25,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
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
});

export default Home;
