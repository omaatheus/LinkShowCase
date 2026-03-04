"use server";

import { Timestamp } from "firebase-admin/firestore";
import { auth } from "../lib/auth";
import { db, storage } from "../lib/firebase";
import { randomUUID } from "crypto";
import { MAX_FREE_PROJECTS } from "../lib/config";

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const profileId = formData.get("profileId") as string;
  const isSubscribed = session.user?.isSubscribed;

  if (!isSubscribed) {
    const projectsRef = db.collection("profiles").doc(profileId).collection("projects");
    const snapshot = await projectsRef.count().get();
    
    if (snapshot.data().count >= MAX_FREE_PROJECTS) {
      return { success: false, error: "LIMIT_REACHED" }; 
    }
  }

  const projectName = formData.get("projectName") as string;
  const projectDescription = formData.get("projectDescription") as string;
  const projectUrl = formData.get("projectUrl") as string;
  const file = formData.get("file") as File;

  const generatedId = randomUUID();
  const storageRef = storage.file(`project-images/${profileId}/${generatedId}`);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await storageRef.save(buffer);

  const imagePath = storageRef.name;

  try {
    await db
      .collection("profiles")
      .doc(profileId)
      .collection("projects")
      .doc(generatedId)
      .set({
        id: generatedId,
        userId: session.user?.id,
        projectName,
        projectDescription,
        projectUrl,
        imagePath,
        createdAt: Timestamp.now().toMillis(),
      });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Internal Error" };
  }
}