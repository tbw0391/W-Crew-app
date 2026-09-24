export const DEFAULT_BRANDING = {
  clubName: "Westerville Crew",
  appTitle: "W-Crew-app",
  tagline: "Westerville Rowing Club — roster, schedule, lineups, volunteers, and messaging.",
  logoUrl: "/branding/logo-full.png",
  iconUrl: "/icons/icon-512.png",
};

export type BrandingKey = keyof typeof DEFAULT_BRANDING;

export type Branding = Record<BrandingKey, string>;

export const BRANDING_LABELS: Record<BrandingKey, string> = {
  clubName: "Club name",
  appTitle: "Browser tab title",
  tagline: "Tagline (shown in search results/link previews)",
  logoUrl: "Logo image URL",
  iconUrl: "Header icon image URL",
};

export async function getBranding(): Promise<Branding> {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data } = await supabase
    .from("club_settings")
    .select("value")
    .eq("key", "branding")
    .limit(1);
  const row = (data as { value: string | null }[] | null)?.[0];
  return parseBranding(row?.value ?? null);
}

export function parseBranding(raw: string | null | undefined): Branding {
  if (!raw) return { ...DEFAULT_BRANDING };

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ...DEFAULT_BRANDING };
  }

  const obj = (parsed && typeof parsed === "object" ? parsed : {}) as Record<string, unknown>;
  const result = { ...DEFAULT_BRANDING };
  for (const key of Object.keys(DEFAULT_BRANDING) as BrandingKey[]) {
    const value = obj[key];
    if (typeof value === "string" && value.trim()) result[key] = value.trim();
  }
  return result;
}
