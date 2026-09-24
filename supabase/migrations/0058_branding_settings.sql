-- Lets admins customize the club name, browser tab title, tagline, and
-- logo/icon shown across the site (login, signup, header, home, etc.) —
-- same key/value pattern as theme_colors. club_settings is already
-- readable by anon (0052_theme_colors.sql), so this needs no policy change.
-- The point: a duplicated deployment (e.g. a demo instance on its own
-- Supabase project) can show entirely different branding with zero code
-- changes, just a different row here.

insert into club_settings (key, value) values ('branding', null)
on conflict (key) do nothing;
