# dsh-wavnil

[![npm](https://img.shields.io/npm/v/dsh-wavnil)](https://www.npmjs.com/package/dsh-wavnil)

**npm:** [`dsh-wavnil`](https://www.npmjs.com/package/dsh-wavnil) ·
**source:** [wavnilhub/wavnil-agent](https://github.com/wavnilhub/wavnil-agent/tree/main/plugins/dsh-wavnil)

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`) plugin for
[Wavnil](https://wavnil.com), the open-source social media scheduler. It connects the agent
to the Wavnil MCP server so it can list your connected channels, fetch each platform's
posting rules, and schedule, draft, or publish posts across 28+ platforms (X, LinkedIn,
Instagram, Facebook, Threads, TikTok, YouTube, Reddit, Pinterest, Bluesky, Mastodon,
Discord, Slack, Telegram, and more).

## Install

From the repository:

```bash
dsh plugin --profile web add "github:wavnilhub/wavnil-agent#path:/plugins/dsh-wavnil"
```

Or from npm:

```bash
dsh plugin --profile web add dsh-wavnil
```

Then give it a Wavnil API key. Copy it from **Wavnil → Settings → Developers → Public API**
and export it before starting dsh, or put it in `$DSH_HOME/.env`:

```bash
export WAVNIL_API_KEY=your-api-key
dsh web
```

Restart the profile after installing. Ask the agent *"List my connected social media
accounts"* to verify the connection.

## What you get

The bundle mounts two rows:

| Row | Package | Role |
|---|---|---|
| `wavnil` | `dsh-wavnil` (this package) | Reads the API key, exposes `ctx.wavnil` (`url`, `headers`), and registers the `wavnil` skill that teaches the agent the posting workflow and the HTML content rules. |
| `wavnil-mcp` | `@deepseek-ai/dsh-mcp-client` (shipped with dsh) | Connects to `https://mcp.wavnil.com/mcp` over streamable HTTP with a `Bearer` header and registers the server's tools. |

The model sees the Wavnil MCP tools under the `mcp__wavnil__` namespace:

| Tool | What it does |
|---|---|
| `mcp__wavnil__integrationList` | List connected channels (optionally filtered by group) |
| `mcp__wavnil__groupList` | List customer groups |
| `mcp__wavnil__integrationSchema` | Posting rules, character limits, and required settings for a platform |
| `mcp__wavnil__triggerTool` | Platform helpers (list Discord channels, search subreddits, list LinkedIn pages) |
| `mcp__wavnil__schedulePostTool` | Schedule, draft, or immediately publish posts |
| `mcp__wavnil__postsListTool` | List posts scheduled between two dates |
| `mcp__wavnil__postSettingsTool` | Update settings of an unpublished post |
| `mcp__wavnil__generateImageTool` | Generate an image for a post |
| `mcp__wavnil__generateVideoOptions` / `videoFunctionTool` / `generateVideoTool` | Video generation options and generation |

The tool list comes from the server at connect time, so new Wavnil tools appear without a
plugin update. See the [Wavnil MCP tools reference](https://docs.wavnil.com/mcp/tools).

## Configuration

Override the `wavnil` row in your profile's `cordis.patch.yml` (`$DSH_HOME/profiles/web/cordis.patch.yml`).
A bare `id:` configures the existing row:

```yaml
- id: wavnil
  config:
    apiKeyEnv: WAVNIL_API_KEY          # env var that holds the key (default)
    baseUrl: https://mcp.wavnil.com    # self-hosted: https://your-wavnil-server.com
    skill: true                        # register the `wavnil` workflow skill
```

| Field | Default | Description |
|---|---|---|
| `apiKeyEnv` | `WAVNIL_API_KEY` | Environment variable read at boot for the API key. |
| `apiKey` | `''` | Inline key. Prefer the env var; this exists for patch-level overrides. |
| `baseUrl` | `https://mcp.wavnil.com` | Wavnil host. The MCP endpoint is `<baseUrl>/mcp`. Self-hosted instances point this at their backend. |
| `skill` | `true` | Register the `wavnil` skill on `ctx.skills`. |

Without a key the `wavnil` row logs a warning naming the variable to set, and the
`wavnil-mcp` row registers no tools. dsh keeps booting.

## Self-hosted Wavnil

The MCP server is part of the Wavnil backend and listens at `/mcp` (Bearer auth). Point
`baseUrl` at your backend and make sure your reverse proxy forwards `/mcp` with streaming
HTTP enabled. See [Reverse Proxies](https://docs.wavnil.com/self-host/reverse-proxies/caddy).

## Development

```bash
cd plugins/dsh-wavnil
pnpm install
pnpm test
```

Link a local checkout into a profile:

```bash
dsh plugin --profile web add /absolute/path/to/wavnil-agent/plugins/dsh-wavnil
```

## Related

- [Wavnil CLI](https://github.com/wavnilhub/wavnil-agent) — the `wavnil` command-line tool and the Claude Code / Cursor / Grok plugins in this repository.
- [Wavnil MCP docs](https://docs.wavnil.com/mcp/introduction)
- [Wavnil public API](https://docs.wavnil.com/public-api/introduction)

## License

AGPL-3.0, same as the rest of this repository.
