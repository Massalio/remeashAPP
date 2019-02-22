import { StyleSheet } from "react-native";

const Theme = StyleSheet.create({
  header: {
    // backgroundColor: '#9ccc5b',
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    shadowRadius: 0,
    elevation: 0
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  logo: {
    margin: 20,
    height: 200,
    width: 300,
    resizeMode: 'contain'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Theme;
