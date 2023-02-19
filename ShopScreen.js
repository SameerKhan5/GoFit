import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { CoinContext } from './CoinContext';
import { CollectionContext } from './CollectionContext';
import { characters, eggs } from './data';

const ShopScreen = () => {
  const { coins, deductCoins } = useContext(CoinContext);
  const { addCharacter } = useContext(CollectionContext);

  const buyEgg = (egg) => {
    if (coins >= egg.cost) {
      deductCoins(egg.cost);
      let roll = Math.random();
      let character = null;
      for (let i = 0; i < egg.probabilities.length; i++) {
        if (roll <= egg.probabilities[i]) {
          character = characters.find((c) => c.level === i + 1);
          break;
        }
        roll -= egg.probabilities[i];
      }
      addCharacter(character);
      alert(`You got a ${character.name}!`);
    } else {
      alert('Not enough coins!');
    }
  };

  const buyItem = (price) => {
    if (coins >= price) {
      deductCoins(price);
      alert('Item purchased!');
    } else {
      alert('Not enough coins!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Fit-Buddies</Text>
        {characters.map((c) => (
          <View key={c.id} style={[ styles.item, {flexDirection: "column", alignItems: "center"}]}>
            <Image style={styles.charImage} source={c.image} />
              <View style={[styles.itemSub, {alignItems: "center"}]}>
                <Text style={styles.itemName}>{c.name}</Text>
                <Text style={styles.itemPrice}>{c.buff} coins per run</Text>
              </View>
              <TouchableOpacity
                style={styles.itemButton}
                onPress={() => alert("Leveled Up!")}
              >
                <Text style={styles.itemButtonText}>Level Up</Text>
              </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Eggs</Text>
        {eggs.map((e) => (
          <View key={e.id} style={styles.item}>
            <View key={e.id} style={styles.itemSub}>
              <Text style={styles.itemName}>Tier {e.tier} Egg</Text>
              <Text style={styles.itemPrice}>{e.cost} coins</Text>
            </View>
            <TouchableOpacity
              style={styles.itemButton}
              onPress={() => buyEgg(e)}
            >
              <Text style={styles.itemButtonText}>Buy</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Items</Text>
        <View style={styles.item}>
          <View style={styles.itemSub}>
            <Text style={styles.itemName}>Headband</Text>
            <Text style={styles.itemPrice}>100k coins</Text>
          </View>
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => buyItem(100000)}
          >
            <Text style={styles.itemButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <View style={styles.itemSub}>
            <Text style={styles.itemName}>Fitbit</Text>
            <Text style={styles.itemPrice}>2M coins</Text>
          </View>
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => buyItem(2000000)}
          >
            <Text style={styles.itemButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <View style={styles.itemSub}>
            <Text style={styles.itemName}>Water Bottle</Text>
            <Text style={styles.itemPrice}>100k coins</Text>
          </View>
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => buyItem(100000)}
          >
            <Text style={styles.itemButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <View style={styles.itemSub}>
            <Text style={styles.itemName}>Deodorant</Text>
            <Text style={styles.itemPrice}>200k coins</Text>
          </View>
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => buyItem(200000)}
          >
            <Text style={styles.itemButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <View style={styles.itemSub}>
            <Text style={styles.itemName}>$5 Gift Card</Text>
            <Text style={styles.itemPrice}>200k coins</Text>
          </View>
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => buyItem(200000)}
          >
            <Text style={styles.itemButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <View style={styles.itemSub}>
            <Text style={styles.itemName}>$10 Gift Card</Text>
            <Text style={styles.itemPrice}>400k coins</Text>
          </View>
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => buyItem(400000)}
          >
            <Text style={styles.itemButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <View style={styles.itemSub}>
            <Text style={styles.itemName}>$25 Gift Card</Text>
            <Text style={styles.itemPrice}>800k coins</Text>
          </View>
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => buyItem(800000)}
          >
            <Text style={styles.itemButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <View style={styles.itemSub}>
            <Text style={styles.itemName}>$100 Gift Card</Text>
            <Text style={styles.itemPrice}>2M coins</Text>
          </View>
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => buyItem(2000000)}
          >
            <Text style={styles.itemButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  eggSection: {
    margin: 10,
  },
  eggTier: {
    margin: 10,
  },
  eggTierTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  egg: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  eggText: {
    fontSize: 18,
  },
  shopSection: {
    margin: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    padding: 5,
    backgroundColor: "#EEE",
    borderRadius: 5,
  },
  itemSub: {
    flexDirection: "column",
    alignItems: "flex-start",
    margin: 5,
    padding: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: "#777777",
  },
  itemButton: {
    backgroundColor: "#44AEEF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  itemButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 16,
  },
  charImage: {
    height: 200,
    width: 200,
    borderRadius: 5,
    resizeMode: "contain"
  }
});


export default ShopScreen;      

