import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	Alert,
} from "react-native";

import { RadioButton } from "react-native-paper";

export default function App() {
	const [costOfService, setCostOfService] = useState("");
	const [tipPercent, setTipPercent] = useState(15);
	const [billAmount, setBillAmount] = useState(0.0);
	const [tipAmount, setTipAmount] = useState(0.0);
	const title = "Tip Calculator";
	const tipOptions = [10, 15, 18, 20];

	const generateRandomAmount = () => {
		const randomAmount = Math.floor(Math.random() * 100) + 1;
		setCostOfService(randomAmount.toString());
	};

	const calculateTip = (percent) => {
		if (costOfService === "")
			return Alert.alert("Please enter cost of service");
		const tip = (parseInt(costOfService) * percent) / 100;
		const bill = parseInt(costOfService) + tip;
		setTipPercent(percent);
		setTipAmount(tip);
		setBillAmount(bill);
	};

	useEffect(() => {
		if (costOfService !== "") {
			calculateTip(tipPercent);
		}
	}, [costOfService]);

	return (
		<View style={styles.container}>
			<SafeAreaView>
				<Text
					style={{
						fontSize: 20,
						fontWeight: "bold",
						color: "#f0d1a1",
						textAlign: "center",
						marginBottom: 20,
					}}>
					{title}
				</Text>
				<TouchableOpacity
					style={styles.randomAmountButton}
					onPress={generateRandomAmount}>
					<Text style={styles.randomAmountButtonText}>
						Generate Random Amount
					</Text>
				</TouchableOpacity>
				<View style={styles.costOfServiceContainer}>
					<TextInput
						style={styles.costOfServiceInput}
						placeholder="Enter Cost of Service"
						value={costOfService}
						onChangeText={(amount) => setCostOfService(amount)}
						keyboardType="numeric"
						returnKeyLabel="done"
						returnKeyType="done"
					/>
				</View>
				<View style={styles.tipPercentContainer}>
					<RadioButton.Group>
						{tipOptions.map((tipOption) => (
							<RadioButton.Item
								key={tipOption}
								label={`${tipOption}%`}
								value={tipOption}
								status={tipPercent === tipOption ? "checked" : "unchecked"}
								style={[
									styles.tipPercentButton,
									styles.tipPercentLabel,
									tipPercent === tipOption
										? styles.selectedTipPercentButton
										: null,
								]}
								labelStyle={styles.tipPercentLabel}
								onPress={() => calculateTip(tipOption)}></RadioButton.Item>
						))}
					</RadioButton.Group>
				</View>
				<View style={styles.divider} />
				<View style={styles.resultContainer}>
					<Text style={styles.resultText}>Bill Amount: ${costOfService}</Text>
					<Text style={styles.resultText}>Tip Amount: ${tipAmount}</Text>
					<View style={styles.resultDivider} />
					<Text style={styles.resultText}>Total: ${billAmount}</Text>
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#5096b9",
		padding: 20,
		paddingTop: 50,
	},
	randomAmountButton: {
		backgroundColor: "#f0d1a1",
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
	},
	randomAmountButtonText: {
		color: "#35546f",
		fontWeight: "bold",
		textAlign: "center",
	},
	costOfServiceContainer: {
		backgroundColor: "#e3f4f8",
		borderRadius: 5,
		marginBottom: 10,
		padding: 10,
	},
	costOfServiceInput: {
		fontSize: 16,
		color: "#35546f",
	},
	tipPercentContainer: {
		backgroundColor: "#e3f4f8",
		borderRadius: 10,
		padding: 10,
		marginVertical: 20,
	},
	tipPercentButtonContainer: {
		flexDirection: "column",
	},
	tipPercentButton: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	selectedTipPercentButton: {
		backgroundColor: "#f0d1a1",
	},
	tipPercentLabel: {
		color: "#35546f",
		marginLeft: 10,
		fontSize: 18,
	},

	divider: {
		height: 1,
		backgroundColor: "#f0d1a1",
		marginBottom: 10,
	},
	resultContainer: {
		backgroundColor: "#e3f4f8",
		borderRadius: 5,
		padding: 10,
	},
	resultText: {
		color: "#35546f",
		fontSize: 16,
		marginBottom: 5,
	},
	resultDivider: {
		height: 1,
		backgroundColor: "#f0d1a1",
		marginVertical: 5,
	},
});
