import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple header */}
      <header className="py-4 px-4 sm:px-6 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="AI-Gen" width={32} height={32} />
            <span className="font-bold text-xl hidden sm:inline">AI-Gen</span>
          </Link>
        </div>
      </header>
      
      {/* Main content - this will render the sign-in page */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
      {/* Simple footer */}
      <footer className="py-4 px-4 sm:px-6 border-t text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} AI-Gen. All rights reserved.</p>
      </footer>
    </div>
  );
}