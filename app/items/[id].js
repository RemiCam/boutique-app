import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ItemDetailsScreen() {
  const { id } = useLocalSearchParams(); // Replace useSearchParams with useLocalSearchParams

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Details for Item {id}</Text>
    </View>
  );
}