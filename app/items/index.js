import { Text, View, FlatList } from "react-native";
import { useRouter } from "expo-router";

const items = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
  { id: "3", name: "Item 3" },
];

export default function ItemsListScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text
            onPress={() => router.push(`/items/${item.id}`)}
            style={{ padding: 16, fontSize: 18, borderBottomWidth: 1 }}
          >
            {item.name}
          </Text>
        )}
      />
    </View>
  );
}