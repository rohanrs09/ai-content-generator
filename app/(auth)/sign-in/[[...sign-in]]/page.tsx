import { SignIn } from "@clerk/nextjs";
import { AppHeader } from "@/components/ui/shared/AppHeader";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <AppHeader /> */}
      <div className="pt-[80px] flex justify-center">
        <div className="w-full max-w-md">
          <SignIn 
            path="/sign-in" 
            routing="path" 
            signUpUrl="/sign-up" 
            redirectUrl="/dashboard" 
          />
        </div>
      </div>
    </div>
  );
}