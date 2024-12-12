import { GoogleSignIn } from "~/components/google-sign-in";

function Login() {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <GoogleSignIn />
    </div>
  );
}

export { Login };
