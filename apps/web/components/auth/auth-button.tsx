"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import GitHubLogo from "@/assets/github.svg";
import { authClient } from "@/lib/auth-client";

export const AuthButton = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGithubSignIn = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const { error } = await authClient.signIn.social({
        callbackURL: window.location.origin,
        provider: "github",
      });

      if (error) {
        setErrorMessage(error.message ?? "Unable to start GitHub sign-in.");
      }
    } catch {
      setIsSubmitting(false);
      setErrorMessage("Unable to start GitHub sign-in.");
    }
  };

  return (
    <div className="space-y-3">
      <Button
        type="button"
        size="lg"
        className="flex h-11 w-full cursor-pointer flex-row items-center gap-2 rounded-md bg-primary shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:bg-primary/90"
        disabled={isSubmitting}
        onClick={handleGithubSignIn}
      >
        <Image src={GitHubLogo} alt="GitHub" width={18} />
        <span className="text-sm font-medium text-primary-foreground">
          {isSubmitting ? "Redirecting to GitHub..." : "Continue with GitHub"}
        </span>
      </Button>
      {errorMessage ? (
        <p className="text-center text-xs leading-5 text-destructive">{errorMessage}</p>
      ) : null}
    </div>
  );
};
