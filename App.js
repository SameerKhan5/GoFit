import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { isPointWithinRadius } from "geolib";
import { Accelerometer } from 'expo-sensors';
import ShopScreen from "./ShopScreen";
import { CoinContext, CoinProvider } from "./CoinContext";
import { CollectionProvider } from "./CollectionContext";

export default function App() {
  const [region, setRegion] = useState(null);
  const [circles, setCircles] = useState([]);
  const [activity, setActivity] = useState('unknown');
  const [currency, setCurrency] = useState(5000);

  function generateRandomPoints(center, numPoints, maxOffset) {
    const points = [];
    minOffset = 0.0005;
    for (let i = 0; i < numPoints; i++) {
      const offset = Math.random() * (maxOffset - minOffset) + minOffset;
      const bearing = Math.random() * 360;
      const latOffset = offset * Math.cos(bearing * Math.PI / 180);
      const lngOffset = offset * Math.sin(bearing * Math.PI / 180);
      const lat = center.latitude + latOffset;
      const lng = center.longitude + lngOffset;
      points.push([lat, lng]);
    }
    return points;
  }

  const onUserLocationChange = async(event) => {
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    // Check if the user's location is within any of the circles
    for (const circle of circles) {
      if (isPointWithinRadius({ latitude, longitude }, {latitude: circle[0], longitude: circle[1]}, 25)) {
          const points = generateRandomPoints(
          { latitude, longitude },
          5,
          0.003,
        );
        addCoins(10);
        setCurrency(currency + 10);
        setCircles(points);
        break;
      }
    }
};

const CurrencyOverlay = () => {

  return (
    <CoinProvider>
      <View style={styles.overlay}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            defaultSource={require("app/assets/Walking.png")}
            style={styles.activityImage}
          />
          <Text style={styles.activity}>{activity}</Text>
        </View>
        <Text style={[styles.currency, { marginRight: 27 }]}>GoFit</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            defaultSource={require("app/assets/coin.png")}
            style={styles.image}
          />
          <Text style={styles.currency}>{currency}</Text>
        </View>
      </View>
    </CoinProvider>
  );
};

  useEffect(() => {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      });
      const points = generateRandomPoints(
        { latitude, longitude },
        5,
        0.003,
      );
      setCircles(points);
    })();
  }, []);

  useEffect(() => {
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      // Calculate the magnitude of the acceleration vector
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      // Determine if the user is walking or running based on the magnitude
      const newActivity = magnitude > 1.2 ? 'Running' : 'Walking';
      // Update the activity state variable
      setActivity(newActivity);
    });
    return () => subscription.remove();
  }, []);


  return (
    <CoinProvider>
      <View style={styles.container}>
        {region ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation={true}
            followUserLocation={true}
            region={region}
            onUserLocationChange={onUserLocationChange}
          >
            {circles.map((circle, index) => (
              <Circle
                key={index}
                center={{ latitude: circle[0], longitude: circle[1] }}
                radius={25}
                strokeColor="rgba(0, 0, 255, 0.5)"
                fillColor="rgba(0, 0, 255, 0.2)"
              />
            ))}
          </MapView>
        ) : (
          <Text>Loading...</Text>
        )}
      <ShoppingCartButton />
      <CurrencyOverlay/>
      </View>
    </CoinProvider>
  );
}

const ShoppingCartButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.shopContainer}>
      <TouchableOpacity onPress={toggleModal} style={styles.button}>
        <Image
          defaultSource={require("app/assets/cart.png")}
          style={{ height: 50, width: 50 }}
        />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modal}>
          <View style={styles.shopHeader}>
            <Text style={styles.title}>Shop</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          <CoinProvider>
            <CollectionProvider>
              <ShopScreen/>
            </CollectionProvider>
          </CoinProvider>
        </View>
      </Modal>
    </View>
  );
  };

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    position: "absolute",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 50,
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 50,
    width: 350,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  activityImage: {
    width: 30,
    height: 40,
    resizeMode: 'contain',
    marginRight: 15,
  },
  currency: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  activity: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  shopContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: 40,
  },
  button: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    padding: 10,
    borderRadius: "50%",
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
   modal: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    paddingTop: 0,
    width: '100%',
    height: '85%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  itemDescription: {
    fontSize: 14,
    color: '#666'
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  closeButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  shopHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10
  }
});
