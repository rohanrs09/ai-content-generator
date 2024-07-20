"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()


  return (
    <div>
      <h2>Home page</h2>
      <Button type="button" onClick={() => router.push('/dashboard')}>Subscribe</Button>
    </div>
  );
}
