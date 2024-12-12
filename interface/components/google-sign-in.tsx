import { createBrowserClient } from "@mason/supabase/browser";
import { Button } from "@mason/ui/button";
import { Icons } from "@mason/ui/icons";

export function GoogleSignIn() {
  const supabase = createBrowserClient();

  const handleSignIn = async () => {
    const { origin } = window.location;
    const redirectURL = `${origin}/api/auth.callback`;

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectURL,
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
