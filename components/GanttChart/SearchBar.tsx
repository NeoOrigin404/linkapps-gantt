import React from "react";
import { StyleSheet, View, TextInput, Platform } from "react-native";
import { ThemedText } from "../ThemedText";

interface SearchBarProps {
	onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<ThemedText style={styles.label}>Search:</ThemedText>
				<TextInput
					style={styles.input}
					placeholder="Entrez un n° d'OF..."
					placeholderTextColor="#666"
					onChangeText={onSearch}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	label: {
		fontSize: 14,
		fontWeight: "500",
	},
	input: {
		flex: 1,
		height: 36,
		paddingHorizontal: 12,
		borderRadius: 4,
		backgroundColor: "#f0f0f0",
		fontSize: 14,
		color: "#333",
		...Platform.select({
			web: {
				outlineStyle: "none",
			},
		}),
	},
});
