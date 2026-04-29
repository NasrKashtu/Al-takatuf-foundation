# Admin auth setup

The admin panel at `/admin` uses Supabase Auth + Google OAuth, with an
`admins` table acting as the allowlist. Only Google accounts whose email is
in `admins` can sign in. Anyone else signed in with Google is shown a
"not authorized" screen.

There is no password to forget — Google handles credentials.

## One-time setup (do this before the first prod deploy)

### 1. Create a Google OAuth client

1. Go to https://console.cloud.google.com/apis/credentials
2. Create a project if you don't have one (e.g. "Altakathuf Site")
3. Configure the OAuth consent screen
   - User type: **External**
   - App name: **Altakathuf Foundation**
   - User support email + developer contact: an email you control
   - Scopes: leave defaults (email, profile, openid)
   - Test users: add the emails of the first few admins while the app is in
     "Testing" mode; or publish the app to skip this
4. Credentials → Create credentials → **OAuth client ID**
   - Application type: **Web application**
   - Name: **Altakathuf Supabase**
   - Authorized JavaScript origins: leave empty
   - **Authorized redirect URIs:** add this exact URL (replace the project ref
     if you ever migrate Supabase projects):
     ```
     https://byqpldqxvbcupictfnuc.supabase.co/auth/v1/callback
     ```
5. Copy the **Client ID** and **Client Secret**

### 2. Wire Google into Supabase

1. Go to https://supabase.com/dashboard/project/byqpldqxvbcupictfnuc/auth/providers
2. Find **Google** and toggle it on
3. Paste the Client ID + Client Secret
4. Click **Save**

### 3. Set the site URL & redirect URLs in Supabase

1. https://supabase.com/dashboard/project/byqpldqxvbcupictfnuc/auth/url-configuration
2. **Site URL:** the production origin (e.g. `https://altakathuf.org`)
3. **Redirect URLs:** add every origin where `/admin` is served, one per line:
   ```
   http://localhost:5173/admin
   https://altakathuf.org/admin
   https://*.vercel.app/admin
   ```

### 4. Set the env vars on Vercel

Project → Settings → Environment Variables:

- `VITE_SUPABASE_URL` = `https://byqpldqxvbcupictfnuc.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = the publishable key from
  https://supabase.com/dashboard/project/byqpldqxvbcupictfnuc/settings/api

Redeploy.

### 5. Sign in for the first time

The seed admin is `hamzakhaledlklk@gmail.com`. Visit `/admin`, click
**Sign in with Google**, sign in as that account. Once in, open the
**Settings** tab to add more admins by email.

## Day-to-day: adding / removing admins

`/admin` → **Settings** → type the new admin's Google email → **Add**.
That email can sign in immediately on their next visit.

You cannot remove yourself — log in as another admin first if you need to
revoke your own access.

## What to do if you lose access to all admin accounts

There is no app-side reset. Recovery is a one-time SQL insert in the
Supabase dashboard:

1. https://supabase.com/dashboard/project/byqpldqxvbcupictfnuc/sql/new
2. Run:
   ```sql
   insert into public.admins (email, added_by_email)
   values ('your-new-admin@gmail.com', 'recovery');
   ```

## Threat model notes

- The publishable (anon) key in the bundle is fine to expose — it's
  designed to be public. Row-Level Security on `admins` ensures it can
  only read/write rows when the caller is an authenticated admin.
- If you rotate the Google OAuth client, update the secret in Supabase
  and re-add any redirect URIs.
- If a Google account is compromised, remove it from `admins` and have
  the owner change their Google password.
