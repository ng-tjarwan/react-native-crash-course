import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface SearchInputProps {
  title?: string;
  value?: any;
  placeholder?: string;
  otherStyles?: string;
  handleChangeText?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex-row items-center justify-center space-x-4">
      <TextInput
        placeholder="Search for a video topic"
        placeholderTextColor="#6b6b8b"
        value={value}
        onChangeText={handleChangeText}
        className="mt-0.5 text-base text-white flex-1 font-pregular"
        {...props}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
