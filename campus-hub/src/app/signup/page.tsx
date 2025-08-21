'use client';

import { SignupForm } from "@/components/signup-form"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          #campus-hub
        </a>
        <SignupForm onSubmit={() => router.push("/notices/main")} />
      </div>
    </div>
  )
}
