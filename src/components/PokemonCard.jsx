import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import pokemonTypes from "../data/types";
import Icon from "react-native-vector-icons/Entypo";

const PokemonCard = () => {
  const [currentPokemon, setCurrentPokemon] = useState({
    name: "",
    description: "",
    sprite: "...",
    types: [],
    number: 0,
    abilities: { normal: [], hidden: [] },
    weight: "",
  });

  const [iconType1, setIconType1] = useState("...");
  const [iconType2, setIconType2] = useState("...");

  const [bgColorType, setBgColorType] = useState("#fff");

  const { name, sprite, description, number, types, abilities, weight } =
    currentPokemon;

  const randomNum = () => {
    const num = Math.ceil(Math.random() * 807);
    return num;
  };

  const generarPokemon = () => {
    const ENDPOINT = `https://pokeapi.glitch.me/v1/pokemon/${randomNum()}`;
    getPokemon(ENDPOINT);
  };

  const getPokemon = (ENDPOINT) => {
    axios
      .get(ENDPOINT)
      .then((res) => {
        const { name, description, sprite, types, number, abilities, weight } =
          res.data[0];
        setCurrentPokemon({
          name,
          description,
          sprite,
          types,
          number,
          abilities,
          weight,
        });
        pokemonTypes.map((element) => {
          if (types[0] === element.type) {
            setIconType1(element.uri);
            setBgColorType(element.color);
          }
          if (types.length > 1) {
            if (types[1] === element.type) {
              setIconType2(element.uri);
            }
          } else {
            setIconType2("");
          }
        });
      })
      .catch((err) => console.log(err));
  };

  const nextAndPrevious = (number, value) => {
    value
      ? getPokemon(
          `https://pokeapi.glitch.me/v1/pokemon/${parseInt(number) + 1}`
        )
      : getPokemon(
          `https://pokeapi.glitch.me/v1/pokemon/${parseInt(number) - 1}`
        );
  };

  const validateType = (abilityType, icon) => {
    if (abilityType) {
      return (
        <Text style={styles.ability}>
          <Icon name={icon} size={20} color="white" /> - {abilityType}
        </Text>
      );
    }
  };

  const getIconType2 = (icon2) => {
    if (icon2) {
      return (
        <View>
          <Image
            resizeMode="contain"
            style={styles.iconTypeImage}
            source={iconType2}
          />
          <Text style={styles.type}>{types[1]}</Text>
        </View>
      );
    }
  };

  useEffect(generarPokemon, []);

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: bgColorType,
      }}
    >
      <View style={styles.nameSection}>
        <View style={styles.numberSection}>
          <Text style={styles.pokeNumber}>{number}</Text>
          <Text style={styles.pokeName}>{name.split(" ")[0]}</Text>
        </View>
        <Text style={styles.pokeHp}>{weight}</Text>
      </View>

      <View style={styles.imgSection}>
        <Image
          resizeMode="contain"
          style={styles.img}
          source={{ uri: sprite }}
        />
      </View>

      <View style={styles.descSection}>
        <Text style={styles.descText}>{description}</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "60%" }}>
          <View style={styles.typeSection}>
            <View>
              <Image
                resizeMode="contain"
                style={styles.iconTypeImage}
                source={iconType1}
              />
              <Text style={styles.type}>{types[0]}</Text>
            </View>
            {getIconType2(types[1])}
          </View>
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={styles.buttonPrevious}
              onPress={() => nextAndPrevious(number, 0)}
            >
              <Icon
                style={styles.textStyles}
                name="controller-jump-to-start"
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRandom}
              onPress={() => generarPokemon()}
              onLongPress={() =>
                getPokemon(`https://pokeapi.glitch.me/v1/pokemon/1`)
              }
            >
              <Icon
                style={styles.textStyles}
                name="cycle"
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonNext}
              onPress={() => nextAndPrevious(number, 1)}
            >
              <Icon
                style={styles.textStyles}
                name="controller-next"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.abilitiesSection}>
          <Text style={{ alignSelf: "center", fontSize: 25 }}>Abilities</Text>
          <View>
            {validateType(abilities.normal[0], "eye")}
            {validateType(abilities.normal[1], "eye")}
            {validateType(abilities.hidden[0], "eye-with-line")}
            {validateType(abilities.hidden[1], "eye-with-line")}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  numberSection: {
    flexDirection: "row",
  },
  pokeName: {
    fontSize: 50,
    lineHeight: 50,
    marginLeft: 20,
    textTransform: "capitalize",
  },

  imgSection: {
    height: "50%",
    width: "100%",
  },
  img: {
    width: "100%",
    height: "100%",
  },

  descSection: {
    height: "10%",
  },
  descText: {
    fontSize: 18,
    textAlign: "justify",
  },

  typeSection: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  iconTypeImage: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 50,
  },
  type: {
    fontSize: 20,
    textTransform: "uppercase",
    padding: 10,
    alignSelf: "center",
    fontWeight: "bold",
    alignSelf: "center",
  },

  abilitiesSection: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  ability: {
    fontSize: 20,
    padding: 5,
  },

  buttonSection: {
    marginTop: 50,
    width: 70,
    height: 50,
    flexDirection: "row",
  },
  buttonPrevious: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  buttonRandom: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  buttonNext: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  textStyles: {
    textAlign: "center",
    color: "#000",
  },
});

export default PokemonCard;
