import { SignUp } from "@clerk/nextjs";
import { AppHeader } from "@/components/ui/shared/AppHeader";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <AppHeader />   */}  //this are commented out because we are not using the header in auth pages
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