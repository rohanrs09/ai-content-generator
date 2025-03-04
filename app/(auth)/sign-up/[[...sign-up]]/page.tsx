import { SignUp } from "@clerk/nextjs";
import { AppHeader } from "@/components/ui/shared/AppHeader";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <div className="pt-[80px] flex justify-center">
        <div className="w-full max-w-md">
          <SignUp 
            path="/sign-up" 
            routing="path" 
            signInUrl="/sign-in" 
            redirectUrl="/dashboard" 
          />
        </div>
      </div>
    </div>
  );
}