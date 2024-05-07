import styled from "styled-components/native"; // Make sure to import from 'styled-components/native' for React Native
import { StatusBar, YellowBox } from "react-native";
// Get the height of the status bar on the device
const StatusBarHeight = StatusBar.currentHeight || 0;

// Define colors to be used throughout the application
export const Colors = {
  primary: "#FAF3E6",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#000080", // navy, login page health journaling app text color
  orange: "#CC5500",
  red: "#EF4444",
  ligthBrown: "#D3B683", // bottm nav bar
};

const {
  primary,
  secondary,
  tertiary,
  darkLight,
  brand,
  orange,
} = Colors;

// Define styled components

// StyledContainer
export const StyledContainer = styled.View({
  flex: 1,
  padding: "5%", // Padding of 5% of the screen width
  paddingTop: StatusBarHeight, // Padding top including StatusBar height
  backgroundColor: Colors.primary, // Background color using primary color sky blue
  width: "100%",
  height: "100%",
});

// InnerContainer
export const InnerContainer = styled.View({
  width: "100%",
  flex: 1,
  alignItems: "center",
  justifyContent: "center", // Center content vertically - add
});

// style for only welcome.js
export const WelcomePageContainer = styled(InnerContainer)({
  // use inner container style
  padding: "15px",
  paddingTop: "320px",
  justifyContent: "center",
});

// BottomNavBar.js componenet styleing  >> add to styles.js in components
export const BottomNavBarContainer = styled.View({
  flex: 1,
  zIndex: 1,
  paddingTop: "30px", // Padding top including StatusBar height
  backgroundColor: Colors.ligthBrown,
  width: "100%",
  height: "100%", // added
  borderRadius: "5px",
  borderRadius: 20,
  borderBottomLeftRadius: 20, // doule check.
  borderBottomRightRadius: 20,
});

// style for welcome.js
export const Avatar = styled.Image({
  width: "100px",
  height: "100px",
  margin: 10,
  borderRadius: "50px",
  borderWidth: "3px",
  borderColor: secondary,
  marginBottom: "10px",
  marginTop: "10px",
});

// style for welcome.js avatar
export const TopContainer = styled.View({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: null,
  height: "55%", // occupy entier height within topcontainer.
  justifyContent: "center", // vertrically
  alignItems: "center", // horizontally
  paddingBottom: "60px",
});

// for welcome.js create welcome img to display
export const WelcomePageImage = styled.Image({
  height: "50px",
  minWidth: "100%",
});

// PageLogo
export const PageLogo = styled.Image({
  paddingTop: "20vh", // 20% of the screen height
  width: "70%", // Width of 250 pixels
  height: "200px", // Height of 200 pixels
});

// PageTitle
export const PageTitle = styled.Text({
  fontSize: (props) =>
    props.welcome
      ? "35px"
      : "30px" /* if props.welcome is ture font size : 35 else 30px*/,
  textAlign: "center",
  fontWeight: "bold",
  color: Colors.brand, // use declared brand color
  padding: "10px", // Padding of 10 pixels
});

// SubTitle ?
export const SubTitle = styled.Text({
  fontSize: "18px",
  marginBottom: "20px",
  letterSpacing: "1px",
  fontWeight: "bold",
  color: tertiary,
  marginBottom: (props) => (props.welcome ? "5px" : null),
  fontWeight: (props) => (props.welcome ? "400" : "inherit"),
  textAlign: (props) => (props.welcome ? "center" : "left"), // Adjust textAlign based on props
  fontSize: (props) => (props.welcome ? "14px" : null),
});

// StyledFormArea
export const StyledFormArea = styled.View({
  width: "85%", // styled form area (s.t. enter email, login box) set size of 85%of width
});

// StyledTextInput
export const StyledTextInput = styled.TextInput({
  backgroundColor: secondary,
  padding: "15px",
  paddingLeft: "55px",
  paddingRight: "55px",
  borderRadius: "5px",
  fontSize: "16px",
  height: "60px",
  marginVertical: "3px",
  marginBottom: "10px",
  color: tertiary,
});

// StyledInputLabel
export const StyledInputLabel = styled.Text({
  color: tertiary,
  fontSize: "13px",
  textAlign: "left",
});

// LeftIcon - email, password icon
export const LeftIcon = styled.View({
  left: "5%",
  top: "40%",
  position: "absolute",
  zIndex: 1, // stack icon above box component.
});

// RightIcon - closed/open eye icon
export const RightIcon = styled.TouchableOpacity({
  right: "5%",
  top: "40%",
  position: "absolute",
  zIndex: 1, // stack icon above box component.
});

// StyledButton - look at props
export const StyledButton = styled.TouchableOpacity((props) => ({
  padding: "4vh",
  backgroundColor: props.google ? orange : brand,
  justifyContent: props.google ? "center" : "center", // centered
  alignItems: props.google ? "center" : "center", // horionzontally
  borderRadius: "7px",
  marginVertical: "5px",
  height: "60px", // check!!!
  flexDirection: props.google ? "row" : null, //if google={true} then row , else do nothing flexDirection
}));

// ButtonText - pass properties.
export const ButtonText = styled.Text((props) => ({
  color: primary, // always use primary regard less properties.
  fontSize: "16px",
  padding: props.google ? "20px" : "0px",
  paddingLeft: props.google ? "7%" : "0vh", // only for  signin with google button text
}));

// MsgBox
export const MsgBox = styled.Text({
  textAlign: "center", //horizontally
  fontSize: "20px",
});

// Line
export const Line = styled.Text({
  height: "1px", // Height of 1 pixel
  width: "100%", // Width of 100% of the parent container
  backgroundColor: darkLight, // Background color using darkLight color
  marginVertical: "5%", // space between line.
});

export const StyleView = styled.View({
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "center",
  padding: "10px",
});

export const StyleText = styled.Text({
  justifyContent: "center",
  alignContent: "center",
  color: tertiary,
  fontSize: "15px",
});

// link and link content style d

export const LinkText = styled.TouchableOpacity({
  justifyContent: "center",
  alignItems: "center",
});

export const ContentOfLinkText = styled.Text({
  color: brand,
  fontSize: "15px",
});
