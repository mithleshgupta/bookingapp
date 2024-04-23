import React from "react";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const SPTSidebarMenuComponent = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../assets/SpotMeLogo.png")}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: "80%",
    height: 80,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: -20,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SPTSidebarMenuComponent;
