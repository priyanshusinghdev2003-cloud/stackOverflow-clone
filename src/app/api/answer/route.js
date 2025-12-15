import { databases, users } from "@/lib/appwrite";
import { answerCollection, db } from "@/models/name";
import { ID } from "node-appwrite";

const { NextResponse } = require("next/server");

export async function POST(request) {
  try {
    const { questionId, answer, authorId } = await request.json();
    await databases.createDocument(db, answerCollection, ID.unique(), {
      content: answer,
      questionId,
      authorId,
    });

    // increase author reputation
    const prefs = await users.getPrefs(authorId);
    await users.updatePrefs(authorId, {
      reputation: Number(prefs.reputation) + 1,
    });

    return NextResponse.json({
      message: "Answer created successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Something went wrong while creating answer" },
      { status: error?.status || error?.code || 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    const { answerId, authorId } = await request.json();

    const answer = await databases.getDocument(db, answerCollection, answerId);
    if (answer.authorId !== authorId) {
      return NextResponse.json({
        message: "You are not authorized to delete this answer",
        status: 401,
      });
    }
    await databases.deleteDocument(db, answerCollection, answerId);
    // decrease author reputation
    const prefs = await users.getPrefs(authorId);
    await users.updatePrefs(authorId, {
      reputation: Number(prefs.reputation) - 1,
    });

    return NextResponse.json({
      message: "Answer deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Something went wrong while deleting answer" },
      { status: error?.status || error?.code || 500 },
    );
  }
}

export async function GET(request) {
  try {
    const { questionId } = await request.json();
    const answers = await databases.listDocuments(db, answerCollection, [
      Query.equal("questionId", questionId),
    ]);
    return NextResponse.json({
      answers,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Something went wrong while getting answers" },
      { status: error?.status || error?.code || 500 },
    );
  }
}
