import { GoogleSignIn } from "~/components/google-sign-in";

function LoginPage() {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <GoogleSignIn />
    </div>
  );
}

export { LoginPage };
