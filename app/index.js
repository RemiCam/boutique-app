import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Boutique App!</Text>
      <Button title="Go to Form" onPress={() => router.push("/form")} />
      <Button title="Go to Items List" onPress={() => router.push("/items")} />
    </View>
  );
}