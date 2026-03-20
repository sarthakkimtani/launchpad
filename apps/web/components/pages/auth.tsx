import Image from "next/image";
import Link from "next/link";

import { AuthButton } from "@/components/auth/auth-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import logo from "@/assets/logo.png";

const authHighlights = [
  "Track apps, databases, edge services, and environments side by side.",
  "Track environments, rollouts, and infrastructure from one focused workspace.",
];

export const Auth = () => {
  return (
    <main className="min-h-svh bg-linear-to-b from-primary/8 via-background to-background px-6 py-10">
      <div className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_26rem]">
        <section className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-medium text-foreground">
              <div className="flex size-8 items-center justify-center rounded-full bg-background shadow-sm">
                <Image src={logo} alt="Launchpad logo" className="size-5 object-contain" priority />
              </div>
              <span>Launchpad</span>
            </div>
            <div className="space-y-3">
              <h1 className="max-w-xl text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                One place to manage every deployment across your stack.
              </h1>
              <p className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                Launchpad gives engineering teams a unified control layer for shipping and operating
                apps across Vercel, Cloudflare, Supabase, Neon, PlanetScale, and the rest of their
                platform stack.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {authHighlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-primary/10 bg-background/80 px-4 py-4 text-sm leading-6 text-muted-foreground shadow-sm"
              >
                {highlight}
              </div>
            ))}
          </div>
        </section>

        <Card className="border border-primary/10 bg-background/95 py-0 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
          <CardHeader className="space-y-3 border-b border-border/70 px-6 pt-8 pb-6">
            <CardTitle className="text-2xl tracking-tight">Continue to Launchpad</CardTitle>
            <CardDescription className="max-w-sm text-sm leading-6">
              Sign in with GitHub to open your workspace for releases, infrastructure, and
              environments across your stack.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pt-5 pb-8">
            <AuthButton />
            <p className="text-center text-xs leading-5 text-muted-foreground">
              By signing in you agree to our{" "}
              <Link href="/terms" className="underline hover:text-foreground">
                Terms of Service
              </Link>{" "}
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
