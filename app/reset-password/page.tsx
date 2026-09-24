import { getBranding } from "@/lib/branding";
import { ResetPasswordForm } from "./ResetPasswordForm";

export default async function ResetPasswordPage() {
  const branding = await getBranding();
  return <ResetPasswordForm logoUrl={branding.logoUrl} clubName={branding.clubName} />;
}
