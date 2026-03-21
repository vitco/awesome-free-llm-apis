# Contributing

Thanks for wanting to add to this list!

## Adding a provider

Open a pull request that adds a new line to the appropriate section in `readme.md`. Your entry should include:

- Provider name, linked to their API key or signup page.
- Country flag for where they're headquartered.
- A short dash-separated description listing top models, rate limits (RPM/RPD), and any notable restrictions.
- A link to the official docs that confirm the free tier and its limits.

## What counts

- Permanent free tiers only. No trial credits, no time-limited promotions, no "free for 90 days."
- No credit card required to sign up.
- The provider must offer a REST API for text/LLM inference (not just a playground or chat UI).

## What doesn't count

- "$X in free credits" that expire.
- Free tiers that require a credit card on file.
- Providers that only offer free access through a web UI, not an API.

## Format

Follow the existing style:

```
- [Provider Name](https://link-to-api-key-page) FLAG - Model A, Model B, Model C +N more. X RPM, Y RPD.
```

Keep descriptions on a single line. End with a period.
