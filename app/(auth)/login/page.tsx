"use client";

import Spinner from "@/components/common/Spinner";
import LoginForm from "@/components/ui/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginForm />
    </Suspense>
  );
}
