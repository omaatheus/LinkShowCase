"use server";

import { Link } from "../actions/add-custom-links";
import { db } from "../lib/firebase";

export type ProfileData = {
  userId: string;
  name: string;
  description: string;
  imagePath: string;
  totalVisits: number;
  createdAt: number;
  isSubscribed?: boolean;
  socialMedias: {
    github?: string,
    instagram?: string,
    linkedin?: string,
    twitter?: string,

  };
  link1?: Link;
  link2?: Link;
  link3?: Link;
  updatedAt?: number;
  theme?: {
    bgColor: string;
    cardColor: string;
    fontColor: string;
  }
};

export type ProjectData = {
  id: string;
  userId: string;
  projectName: string;
  projectDescription: string;
  projectUrl: string;
  imagePath: string;
  createdAt: string;
  totalVisits?: number;
};

export type UserData = {
  isSubscribed?: boolean;
  email: string;
  image: string;
  name: string;
  customerId?: string;
}

export async function getUserData(userId: string){
  const snapshot = await db
    .collection("users")
    .doc(userId)
    .get();

  return snapshot.data() as UserData;
}

export async function getProfileData(profileId: string) {
  const profileSnapshot = await db
    .collection("profiles")
    .doc(profileId)
    .get();

  const profileData = profileSnapshot.data() as ProfileData;

  const userData = await getUserData(profileData.userId);

  return {
    ...profileData,
    isSubscribed: userData?.isSubscribed ?? false,
  };
}

export async function getProfileProjects(profileId: string) {
  const snapshot = await db
    .collection("profiles")
    .doc(profileId)
    .collection("projects")
    .get();

  return snapshot.docs.map((doc) => doc.data() as ProjectData);
}

export async function getProfileId(userId?: string) {
  if (!userId) return null;

  const snapshot = await db
    .collection("profiles")
    .where("userId", "==", userId)
    .get();

    return snapshot.docs.map((doc) => doc.id)[0];
}