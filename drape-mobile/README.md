# Drape — Android app (build guide)

This is a ready-to-build Android project (Capacitor). It contains the full Drape app:
photo-fitted 3D you, dress try-on, closet counter, daily looks, saved data.
New in the mobile version: **camera + gallery permissions, location/weather setting, daily reminder notification.**

## What you need (one time)
- **Node.js 20+**
- **Android Studio** (latest; includes the Android SDK and JDK 21)

## Build
```
npm install
npx cap add android
npm run assets        # makes launcher icons + splash from /resources
npm run android       # copies the 3D engine, adds permissions, syncs, opens Android Studio
```
Then in Android Studio press ▶ Run to test on a phone (USB debugging) or emulator.

**Before you build, change two things**
1. `capacitor.config.json` → `"appId": "com.yourname.drape"` (unique; can never change after publishing).
2. `www/index.html` → search for `SUPPORT_EMAIL` and put your real email (Google Play expects a way to report AI output).

## How the AI works on the phone
Inside Claude, Drape used Claude's built-in connection. On a phone that doesn't exist, so the app calls Claude itself:
- **Easiest (personal use):** open the app → **Settings → AI connection** → paste your Claude API key (console.anthropic.com).
  The key stays on the phone, is never in backups, and usage is billed to your account.
- **For public release:** never put your own key in the app. Deploy `proxy/worker.js` (instructions inside) and enter its URL in Settings,
  or build proper sign-in + per-user limits first. A shared token inside a public app can be extracted.

## Permissions and settings (already built in)
- **Camera**, **photos/gallery** (Android's photo picker), **location** (approximate, for weather), **notifications** (daily reminder).
- Each one shows a plain-language explanation first, then Android's own prompt, only when you use the feature.
- **Settings tab:** permission status, location (off / my location / pick a city), reminder time, AI connection.
- Weather comes from Open-Meteo (no key needed) and fills in the weather for your daily look automatically.

## Make the release file and publish
1. Android Studio → **Build → Generate Signed App Bundle** → Android App Bundle → create a keystore (**back it up; you can't update the app without it**).
2. In `android/app/build.gradle` set `versionCode 1` / `versionName "1.0"` (raise versionCode every update).
3. Create a **Google Play Console** account ($25 one time, ID verification).
4. Create the app, upload the `.aab`, and fill in: store listing (`STORE_LISTING.md`), screenshots (2+ phone), 512×512 icon, 1024×500 feature graphic,
   content rating, **Data safety form (`DATA_SAFETY.md`)**, and a public **privacy policy URL** (host `PRIVACY_POLICY.md` on GitHub Pages or similar).
5. New personal developer accounts usually must run a **closed test with about 12 testers for 14 days** before production. Check the Play Console for the current rule.

## Good to know
- The app works offline for the 3D designer, saved looks and closet list. Photo reading, style advice, weather need internet.
- Data is saved on the phone. Use **Saved → Export backup** to keep a copy (it opens the Android share sheet).
- Google Play has an **AI-generated content policy**: keep the "Report a problem" link in Settings and review your listing wording against the current policy.
- If a feature fails on your phone, run `npx cap doctor` and check that Android Studio finished syncing Gradle.
