import { GoogleSignIn } from "@/components/google-sign-in";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative max-w-96">
        <GoogleSignIn />
      </div>
    </div>
  );
}
