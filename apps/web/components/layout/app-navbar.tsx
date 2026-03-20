"use client";

import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "@/assets/logo.png";
import { useSession } from "@/contexts/session-context";
import { authClient } from "@/lib/auth-client";

export const AppNavbar = () => {
  const router = useRouter();
  const session = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const userInitials = getUserInitials(session.user.name, session.user.email);

  const handleSignOut = async (e: Event) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();
      if (error) {
        setErrorMessage(error.message ?? "Unable to sign out.");
        return;
      }

      router.replace("/auth");
    } catch {
      setErrorMessage("Unable to sign out.");
      setIsSigningOut(false);
    }
  };

  return (
    <header className="border-b border-border/70 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full border border-primary/15 bg-primary/8 shadow-sm">
            <Image src={logo} alt="Launchpad logo" className="size-6 object-contain" priority />
          </div>
          <p className="text-xl font-bold tracking-tight text-foreground">Launchpad</p>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto cursor-pointer gap-3 rounded-xl px-2 py-2 hover:bg-muted"
            >
              <p className="text-sm font-medium text-foreground">{session.user.name}</p>
              <Avatar className="border border-border/70">
                <AvatarImage src={session.user.image ?? undefined} alt={session.user.name} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 min-w-64">
            <DropdownMenuLabel className="space-y-1">
              <p className="font-medium text-foreground">{session.user.name}</p>
              <p className="truncate text-muted-foreground">{session.user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              disabled={isSigningOut}
              onSelect={handleSignOut}
            >
              <LogOutIcon />
              {isSigningOut ? "Signing out..." : "Sign out"}
            </DropdownMenuItem>
            {errorMessage ? (
              <>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs text-destructive">{errorMessage}</div>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

function getUserInitials(name: string, email: string) {
  const source = name.trim() || email.trim();
  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}
