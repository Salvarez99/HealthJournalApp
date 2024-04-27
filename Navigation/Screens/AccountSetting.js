import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

//for navigation
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

// import on app.js on navigation stack.
export default function AccountSetting() {
  // init navigation hook.
  const navigation = useNavigation();

  const handleChangePassword = () => {
    navigation.navigate("ChangePasswordScreen");
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonsContainer}>
        {/*change password button */}
        <TouchableOpacity
          onPress={handleChangePassword}
          style={styles.settingsButtons}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  buttonsContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
  },
  toggleContainer: {
    justifyContent: "center",
    paddingRight: 10,
  },
  settingsButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 60,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  buttonText: {
    fontSize: 16,
  },
});
