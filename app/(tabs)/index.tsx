import { StyleSheet } from 'react-native';
import HomeScreen from "../../screens/HomeScreen";

export default function HomeApp() {
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
