import { useTranslation } from "react-i18next";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router";

const InstructionsPage = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	return (
		<>
			<View
				style={{
					padding: 30,
					alignItems: "center",
					justifyContent: "flex-end",
				}}
			>
				<Button
					title={t("back")}
					color="#d00"
					onPress={() => {
						navigate("/");
					}}
				/>
			</View>
			<ScrollView style={styles.container}>
				<Text style={[styles.heading, { marginTop: 20 }]}>Instructions (4 Players)</Text>
				<Text>Trix Complex is a four-player card game, we will explain the rules of Trix Complex</Text>
				<Text style={styles.title}>Cards and Dealing:</Text>
				<Text>
					Trix Complex is played by four people using one deck of cards (52-cards, excluding the jokers), The
					game is divided into 4 rounds, each round includes 2 parts: Trix and Complex . Players pick the
					dealer randomly; the dealer shuffles the cards well and deals out 13 cards to each player. the
					player who is dealt the 7 of hearts in this first deal owns the first “round”. The player picks
					whatever part he/she wants, and when the cards are all played, then the points are scored, and the
					cards are dealt out once again, and here the player picks the second part, then the round passes to
					the player who sits to the right of the first player. The player with the highest score wins.
				</Text>
				<Text style={styles.title}>Complex:</Text>
				<Text>
					The cards in each suit rank from high to low: A-K-Q-J-10-9-8-7-6-5-4-3-2 Game Play In complex , the
					player is reduced points for each trick he/she collects which includes any card of diamonds, queens
					(Q), and the king of hearts (K) card. The round owner leads to the first trick and other players
					must follow suit if they can, if they can’t, they are allowed to play any other suit, the player who
					plays the highest card of the suit led collects the trick and leads next.
				</Text>
				<Text style={styles.title}>Trix:</Text>
				<Text>
					Trix part is not a trick-taking game, however, Players try to get rid of their cards as soon as they
					can by playing them to a layout on the board, which begins with the jacks, and continues upwards in
					each suit to the ace and downwards to the 2. Players can’t add any card to the board unless this
					card is one rank higher or lower than a card that has already been played. A player must play any
					card they have which can be added but if they are unable to play, they pass.
				</Text>
				<Text style={styles.title}>Doubling:</Text>
				<Text>
					Doubling in Trix Complex is only allowed in complex part, and it only applies on the king of hearts
					card or a (Q) of any suit. The player who owns the (K) of hearts or a (Q) of any suit can double its
					value by revealing it on the board to the other players, which means that If another player collects
					it when it is "doubled" they are reduced double the standard value, and the player who did the
					doubling gets the standard value of the card as additional points. also if another player forces the
					doubled card onto it's owner they get the standard value of the card as additional points
				</Text>
				<Text style={styles.title}>Scoring:</Text>
				<Text style={{ marginBottom: 7 }}>
					<Text style={{ fontWeight: "bold", fontSize: 17 }}>King of hearts:</Text> the player who collected
					the (K) of hearts card is reduced 75 points.
				</Text>
				<Text style={{ marginBottom: 7 }}>
					<Text style={{ fontWeight: "bold", fontSize: 17 }}>Queens:</Text> players who collect (Q) cards are
					reduced 25 points for each card collected.
				</Text>
				<Text style={{ marginBottom: 7 }}>
					<Text style={{ fontWeight: "bold", fontSize: 17 }}>Diamonds:</Text> players who collect cards of
					diamonds are reduced 10 points for each card collected.
				</Text>
				<Text style={{ marginBottom: 7 }}>
					<Text style={{ fontWeight: "bold", fontSize: 17 }}>Tricks:</Text> players who collect any trick are
					reduced 15 point for each trick collected.
				</Text>
				<Text style={{ marginBottom: 30 }}>
					<Text style={{ fontWeight: "bold", fontSize: 17 }}>Trix:</Text> the first player finishes scores 200
					points, the second finishes scores 150 points, the third finishes scores 100 points and the last
					gets 50 points, depending on who runs out of cards first.
				</Text>
			</ScrollView>
		</>
	);
};
export default InstructionsPage;
const styles = StyleSheet.create({
	heading: {
		fontSize: 28,
		textAlign: "center",
		marginBottom: 30,
	},
	title: {
		fontSize: 20,
		marginTop: 20,
		marginBottom: 10,
	},
	container: {
		padding: 15,
		height: "100%",
	},
});
