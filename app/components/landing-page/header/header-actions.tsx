"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/button";
import { manageAuth } from "@/app/actions/manage-auth";

interface HeaderActionsProps {
  isAuthenticated: boolean;
  profileId?: string | null;
}

export default function HeaderActions({ isAuthenticated, profileId }: HeaderActionsProps) {
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const router = useRouter();

  const handleProfilePage = () => {
    if (!profileId) return;
    setIsLoadingProfile(true);
    router.push(`/${profileId}`);
  };

  const handleAuth = async () => {
    setIsLoadingAuth(true);
    try {
      await manageAuth();
    } catch (error) {
      console.error("Erro ao gerenciar autenticação:", error);
      setIsLoadingAuth(false);
    }
  };

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {isAuthenticated && profileId && (
        <Button onClick={handleProfilePage} isLoading={isLoadingProfile}>
          Minha Página
        </Button>
      )}
      
      <Button onClick={handleAuth} isLoading={isLoadingAuth}>
        {isAuthenticated ? "Sair" : "Login"}
      </Button>
    </div>
  );
}