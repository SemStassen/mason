"use client";

import { createClient } from "@mason/supabase/client";
import { Button } from "@mason/ui/button";
import { Icons } from "@mason/ui/icons";

export function GoogleSignIn() {
  const supabase = createClient();

  const handleSignIn = async () => {
    const redirectURL = new URL(
      "/api/v1/auth/callback",
      window.location.origin,
    );

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectURL.toString(),
      },
    });
  };

  return (
    <Button className="gap-2" onClick={handleSignIn}>
      <Icons.Google />
      <span>Continue with Google</span>
    </Button>
  );
}
