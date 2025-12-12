import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "@/lib/appwrite";
export default async function getOrCreateStorage() {
  try {
    await storage.getBucket(questionAttachmentBucket);
    console.log("Bucket already exists");
  } catch (error) {
    try {
      await storage.createBucket(
        questionAttachmentBucket,
        questionAttachmentBucket,
        [
          Permission.read("any"),
          Permission.read("users"),
          Permission.create("users"),
          Permission.update("users"),
          Permission.delete("users"),
        ],
        false,
        undefined,
        undefined,
        ["jpg", "png", "jpeg", "gif", "webp", "heic"],
      );
      console.log("Bucket created");
    } catch (error) {
      console.log("Bucket creation failed", error);
    }
  }
}
