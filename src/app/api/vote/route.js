import { databases, users } from "@/lib/appwrite";
import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/name";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { votedById, voteStatus, type, typeId } = await req.json();
    const res = await databases.listDocuments(db, voteCollection, [
      Query.equal("type", type),
      Query.equal("typeId", typeId),
      Query.equal("votedById", votedById),
    ]);

    if (res.documents.length > 0) {
      await databases.deleteDocument(db, voteCollection, res.documents[0].$id);
      const QuestionOrAnswer = await databases.getDocument(
        db,
        type === "question" ? questionCollection : answerCollection,
        typeId,
      );
      const autherPrefs = await users.getPrefs(QuestionOrAnswer.authorId);
      await users.updatePrefs(QuestionOrAnswer.authorId, {
        reputation: Number(autherPrefs.reputation) - 1,
      });
    }
    // that meand prev vot doesnot exist or vote status is changes
    if (res.documents[0]?.voteStatus !== voteStatus) {
      const QuestionOrAnswer = await databases.getDocument(
        db,
        type === "question" ? questionCollection : answerCollection,
        typeId,
      );
      const autherPrefs = await users.getPrefs(QuestionOrAnswer.authorId);
      await users.updatePrefs(QuestionOrAnswer.authorId, {
        reputation: Number(autherPrefs.reputation) + 1,
      });
    }

    const [upvotes, downvotes] = await Promise.all([
      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "upvoted"),
        Query.equal("votedById", votedById),
        Query.limit(1),
      ]),
      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "downvoted"),
        Query.equal("votedById", votedById),
        Query.limit(1),
      ]),
    ]);
    return NextResponse.json(
      {
        data: {
          document: null,
          voteResult: (upvotes.total = downvotes.total),
        },
        message: "Vote handled successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Error while voting" },
      { status: error?.status || error?.code || 500 },
    );
  }
}
