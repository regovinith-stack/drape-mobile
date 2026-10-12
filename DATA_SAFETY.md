# Play Console "Data safety" answers (verify against the current form)

| Data type | Collected? | Shared? | Why | Notes |
|---|---|---|---|---|
| Photos | Yes (processed, not stored by you) | Yes → AI provider (Anthropic or your server) | App functionality | Optional; only when user taps Analyze/Scan |
| Approximate location | Yes (optional) | Yes → Open-Meteo / BigDataCloud | App functionality (weather) | Optional; user can pick a city instead |
| Personal info (name, email) | No | – | – | No accounts |
| Financial info | No | – | – | – |
| Device or other IDs | No | – | – | No analytics or ads |

- Data encrypted in transit: **Yes**
- Users can request data deletion: **Yes**, in-app (Saved → Delete all my data) and by uninstalling
- Permissions to declare: Camera, Approximate/precise location (runtime), Notifications (runtime), Internet
- Also complete the **AI-generated content** declaration and keep an in-app way to report problems (Settings).
- If you ship with a proxy server, update this table: your server then handles photos too.
