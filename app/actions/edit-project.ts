"use server";

import { Timestamp } from "firebase-admin/firestore";
import { auth } from "../lib/auth";
import { db, storage } from "../lib/firebase";

export async function updateProject(formData: FormData) {
  const session = await auth();
  if (!session) return false;

  const projectId = formData.get("projectId") as string;
  const profileId = formData.get("profileId") as string;
  const projectName = formData.get("projectName") as string;
  const projectDescription = formData.get("projectDescription") as string;
  const projectUrl = formData.get("projectUrl") as string;
  const file = formData.get("file") as File | null;

  if (!projectId || !profileId) return false;

  try {
    
    const updateData: any = {
      projectName,
      projectDescription,
      projectUrl,
      updatedAt: Timestamp.now().toMillis(),
    };

    if (file && file.size > 0) {
      const storageRef = storage.file(`project-images/${profileId}/${projectId}`);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await storageRef.save(buffer);

      updateData.imagePath = storageRef.name;
    }

    await db
      .collection("profiles")
      .doc(profileId)
      .collection("projects")
      .doc(projectId)
      .update(updateData); 

    return true;
  } catch (error) {
    console.error("Erro ao atualizar o projeto:", error);
    return false;
  }
}