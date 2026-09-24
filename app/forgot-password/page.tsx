import { getBranding } from "@/lib/branding";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export default async function ForgotPasswordPage() {
  const branding = await getBranding();
  return <ForgotPasswordForm logoUrl={branding.logoUrl} clubName={branding.clubName} />;
}
