import { getBranding } from "@/lib/branding";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  const branding = await getBranding();
  return <LoginForm logoUrl={branding.logoUrl} clubName={branding.clubName} />;
}
