import * as functions from "firebase-functions";

const admin = require("firebase-admin");
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.addUserToFirestore = functions.auth
    .user()
    .onCreate(async (user, context) => {
        const userRef = admin.firestore().collection("users").doc(user.uid);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            userDoc.set({
                ...userDoc,
                id: user.uid,
                email: user.email,
            });
        }
    });

exports.calculateRatingForMeal = functions.firestore
    .document("meals/{mealId}/ratings/{userId}")
    .onWrite(async (d, context) => {
        const { mealId } = context.params;
        const mealRef = admin.firestore().collection("meals").doc(mealId);
        const ratingsDoc = await mealRef.collection("ratings").get();

        const ratingsCol = ratingsDoc.docs
            .map((d: any) => d.data())
            .map((r: { rating: number }) => r.rating);

        if (ratingsCol.length !== 0) {
            const mealRating =
                ratingsCol.reduce((p: number, c: number) => p + c) /
                ratingsCol.length;

            await mealRef.update({ rating: mealRating.toPrecision(2) });
        }
    });
