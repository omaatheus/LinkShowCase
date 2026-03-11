"use client";

import { useState } from "react";
import Button from "./button";
import TextInput from "./textinput";
import { signIn } from "next-auth/react";

export default function CreateNow() {
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await signIn("google", {
            redirectTo: `/criar?link=${link}`,
          });
    } catch (error) {
      console.error("Erro ao criar link:", error);
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col md:flex-row items-center gap-2 w-full mt-[10vh] px-4 mb-4 md:mb-0">
      <span className="text-black text-xl">linkslie.com/</span>
      <TextInput
        placeholder="Seu link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full md:w-auto"
      />
      <Button
        onClick={handleCreate}
        isLoading={isLoading}
        className="mt-4 md:mt-0"
      >
        Criar agora
      </Button>
    </div>
  );
}
