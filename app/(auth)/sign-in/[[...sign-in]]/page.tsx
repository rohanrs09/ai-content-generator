import { SignIn } from "@clerk/nextjs";
import { AppHeader } from "@/components/ui/shared/AppHeader";


export default function SignInPage() {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-[370px] mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        
        <div className="bg-white p-4 shadow rounded-lg">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-white w-full py-3 rounded",
                card: "bg-white shadow-none p-0",
                footer: "hidden",
                formFieldInput: "py-2.5",
                formFieldLabel: "text-gray-700",
                rootBox: "w-full",
                formContainer: "w-full",
                form: "w-full"
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "blockButton"
              },
              variables: {
                spacingUnit: "4px",
                borderRadius: "6px"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}