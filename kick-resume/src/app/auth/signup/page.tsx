import AuthForm from "../AuthForm";

export default function SignUpPage() {
  return (
    <div className="bg-[linear-gradient(to_right,#fff,#8bcadf,#fff)] h-screen flex items-center justify-center">
      <AuthForm mode="signup" />
    </div>
  );
}
