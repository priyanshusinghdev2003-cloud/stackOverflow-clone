import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import { databases } from "@/lib/appwrite";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

export default async function getOrCreateDB() {
  try {
    // Check if database exists
    await databases.get(db);
    console.log("Database already exists");
  } catch (error) {
    try {
      // Create database
      await databases.create(db, db);
      console.log("Database created");
      console.log("Creating collections");
      await Promise.all([
        createQuestionCollection().catch((e) => console.log("Q ERROR:", e)),
        createAnswerCollection().catch((e) => console.log("A ERROR:", e)),
        createCommentCollection().catch((e) => console.log("C ERROR:", e)),
        createVoteCollection().catch((e) => console.log("V ERROR:", e)),
      ]);

      console.log("Collections created");
    } catch (error) {
      console.log("Database creation failed", error);
    }
  }

  return databases;
}
