import { auth } from "@/app/lib/auth";
import { getProfileData, getProfileProjects } from "@/app/server/get-profile-data";
import { redirect } from "next/navigation";
import DesignEditor from "./DesignEditor";
import UserCard from "@/app/components/commons/user-card/userCard";
import ProjectCard from "@/app/components/commons/projectCard";
import { getDownloadURLFromPath } from "@/app/lib/firebase";

export default async function DesignPage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;
  
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login"); 
  }

  const profileData = await getProfileData(profileId);

  if (!profileData) {
    redirect("/404");
  }

  const isOwner = profileData.userId === session.user.id;
  
  if (!isOwner) {
    redirect(`/${profileId}`); 
  }
  const projects = await getProfileProjects(profileId);
  const projectsWithImages = await Promise.all(
      projects.map(async (project) => {
        const imageUrl = (await getDownloadURLFromPath(project.imagePath)) || "";
        return { ...project, imageUrl };
      }),
    );
  const isSubscribed = session.user.isSubscribed ?? false;

  const projectCards = projectsWithImages.map(project => (
    <ProjectCard
      key={project.id}
      isOwner={false}
      name={project.projectName}
      description={project.projectDescription}
      img={project.imageUrl}
    />
  ));

  return (
    <div className="min-h-screen bg-background-primary">
      <DesignEditor 
        profileId={profileId}
        isSubscribed={isSubscribed}
        userCard={<UserCard profileData={profileData} isOwner={true} />}
        projectCards={projectCards}
      />
    </div>
  );
}
