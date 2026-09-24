import { getBranding } from "@/lib/branding";
import { SignupForm } from "./SignupForm";

export default async function SignupPage() {
  const branding = await getBranding();
  return <SignupForm logoUrl={branding.logoUrl} clubName={branding.clubName} />;
}
