import { SignIn } from "@clerk/nextjs";
import { AppHeader } from "@/components/ui/shared/AppHeader";


export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        
        <div className="bg-white p-4 sm:p-8 shadow rounded-lg">
          {/* SignIn component from Clerk with custom appearance */}
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-white w-full py-2 rounded",
                card: "bg-white shadow-none",
                footer: "hidden"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}