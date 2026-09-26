# Changelog

All notable changes to the Wavnil CLI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.19] - 2026-09-21

### Added
- `clipping:create <url>` - Turn a long YouTube video into short vertical clips with burned-in captions via `POST /public/v1/clipping` (`--clips` 1-10, `--fit blur|crop`, `--integrations` to draft every clip on the given channels).
- `clipping:status <id>` - Get a clipping's progress and its clips (hosted video URL, title, post text) via `GET /public/v1/clipping/:id`.
- `clipping:list` - List previous clippings via `GET /public/v1/clipping` (`--page`, 20 per page).

## [2.0.18] - 2026-09-11

### Added
- Gemini CLI extension: a root `gemini-extension.json` so the repo installs with `gemini extensions install https://github.com/wavnilhub/wavnil-agent`. It exposes the `wavnil` skill from `skills/wavnil` and declares the hosted Wavnil MCP server (`https://mcp.wavnil.com/mcp-oauth-dynamic`, OAuth on first connect via Gemini CLI's automatic OAuth discovery). The repo carries the `gemini-cli-extension` topic, so the [Gemini CLI extensions gallery](https://geminicli.com/extensions/browse/) indexes it from the latest tag.
- DeepSeek Harness plugin: `plugins/dsh-wavnil` is an installable `dsh` bundle (`dsh plugin --profile web add dsh-wavnil`). It mounts one `@deepseek-ai/dsh-mcp-client` row pointed at the hosted Wavnil MCP server (`https://mcp.wavnil.com/mcp`, Bearer auth from `WAVNIL_API_KEY`) and registers a `wavnil` skill describing the integrationList → integrationSchema → schedulePostTool workflow. Self-hosted instances override `baseUrl` on the `wavnil` row. Listed on [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin); the repo now carries the `dsh-plugin` topic.

## [2.0.17] - 2026-09-01

### Added
- Grok Build plugin support: `.grok-plugin/plugin.json` and `.grok-plugin/marketplace.json` (validated with xAI's `validate-catalog.py`). The Grok manifest also declares the hosted Wavnil MCP server (`https://mcp.wavnil.com/mcp-oauth-dynamic`, OAuth on first connect) via its `mcpServers` field. The Claude Code and Cursor plugins stay skill/CLI-only — there is intentionally no root `.mcp.json`, so installing those plugins never registers a second Wavnil MCP server next to an existing connector.

## [2.0.16] - 2026-09-01

### Added
- Cursor plugin support: `.cursor-plugin/plugin.json` and `.cursor-plugin/marketplace.json` so the repo installs as a [Cursor plugin](https://cursor.com/docs/reference/plugins) alongside the existing Claude Code plugin. `skills/wavnil/SKILL.md` is now a real file instead of a symlink, regenerated from the root `SKILL.md` by a GitHub Action on every published release (or `pnpm sync-skill` locally).
- `posts:settings` - Update a post's provider settings via `PUT /public/v1/posts/:id/settings` (merged — only the keys you pass change; unpublished DRAFT/QUEUE posts only).

### Changed
- `posts:list` responses now include each post's current `settings`.

## [1.0.0] - 2026-02-13

### Added
- Initial release of Wavnil CLI
- `posts:create` - Create new social media posts
- `posts:list` - List all posts with pagination and search
- `posts:delete` - Delete posts by ID
- `integrations:list` - List connected social media integrations
- `upload` - Upload media files (images)
- Environment variable configuration (WAVNIL_API_KEY, WAVNIL_API_URL)
- Comprehensive help documentation
- Example scripts for basic usage and AI agent integration
- SKILL.md for AI agent usage patterns

### Features
- Command-line interface for Wavnil API
- Support for scheduled posts
- Multi-platform posting via integrations
- Media upload functionality
- User-friendly error messages with emojis
- JSON output for programmatic parsing
- Comprehensive examples for AI agents
