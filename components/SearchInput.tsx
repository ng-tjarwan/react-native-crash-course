import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

interface SearchInputProps {
  initialQuery?: string;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  initialQuery = "",
  placeholder = "Search for a video topic",
}) => {
  const [query, setQuery] = useState(initialQuery);
  const pathname = usePathname();

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex-row items-center justify-center space-x-4">
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#cdcde0"
        value={query}
        onChangeText={(e) => setQuery(e)}
        className="mt-0.5 text-base text-white flex-1 font-pregular"
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
          // setQuery("");
        }}
      >
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
