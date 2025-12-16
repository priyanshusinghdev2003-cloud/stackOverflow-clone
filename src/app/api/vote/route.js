import { databases } from "@/lib/appwrite";
import { db, voteCollection } from "@/models/name";
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
    }
    // that meand prev vot doesnot exist or vote status is changes
    if (res.documents[0]?.voteStatus !== voteStatus) {
    }

    const [upvotes, downvotes] = await Promise.all([
      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "upvote"),
      ]),
      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "downvote"),
      ]),
    ]);
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Error while voting" },
      { status: error?.status || error?.code || 500 },
    );
  }
}
