# How to Run the Wavnil CLI

There are several ways to run the CLI, depending on your needs.

## Option 1: Direct Execution (Quick Test) ⚡

The built file at `apps/cli/dist/index.js` is already executable!

```bash
# From the monorepo root
node apps/cli/dist/index.js --help

# Or run it directly (it has a shebang)
./apps/cli/dist/index.js --help

# Example command
export WAVNIL_API_KEY=your_key
node apps/cli/dist/index.js posts:list
```

## Option 2: Link Globally (Recommended for Development) 🔗

This creates a global `wavnil` command you can use anywhere:

```bash
# From the monorepo root
cd apps/cli
pnpm link --global

# Now you can use it anywhere!
wavnil --help
wavnil posts:list
wavnil posts:create -c "Hello!" -i "twitter-123"

# To unlink later
pnpm unlink --global
```

**After linking, you can use `wavnil` from any directory!**

## Option 3: Use pnpm Filter (From Root) 📦

```bash
# From the monorepo root
pnpm --filter wavnil start -- --help
pnpm --filter wavnil start -- posts:list
pnpm --filter wavnil start -- posts:create -c "Hello" -i "twitter-123"
```

## Option 4: Use npm/npx (After Publishing) 🌐

Once published to npm:

```bash
# Install globally
npm install -g wavnil

# Or use with npx (no install)
npx wavnil --help
npx wavnil posts:list
```

## Quick Setup Guide

### Step 1: Build the CLI

```bash
# From monorepo root
pnpm run build:cli
```

### Step 2: Set Your API Key

```bash
export WAVNIL_API_KEY=your_api_key_here

# To make it permanent, add to your shell profile:
echo 'export WAVNIL_API_KEY=your_api_key' >> ~/.bashrc
# or ~/.zshrc if you use zsh
```

### Step 3: Choose Your Method

**For quick testing:**
```bash
node apps/cli/dist/index.js --help
```

**For regular use (recommended):**
```bash
cd apps/cli
pnpm link --global
wavnil --help
```

## Troubleshooting

### "Command not found: wavnil"

If you linked globally but still get this error:

```bash
# Check if it's linked
which wavnil

# If not found, try linking again
cd apps/cli
pnpm link --global

# Or check your PATH
echo $PATH
```

### "WAVNIL_API_KEY is not set"

```bash
export WAVNIL_API_KEY=your_key

# Verify it's set
echo $WAVNIL_API_KEY
```

### Permission Denied

If you get permission errors:

```bash
# Make the file executable
chmod +x apps/cli/dist/index.js

# Then try again
./apps/cli/dist/index.js --help
```

### Rebuild After Changes

After making code changes, rebuild:

```bash
pnpm run build:cli
```

If you linked globally, the changes will be reflected immediately (no need to re-link).

## Testing the CLI

### Test Help Command

```bash
wavnil --help
wavnil posts:create --help
```

### Test with Sample Command (requires API key)

```bash
export WAVNIL_API_KEY=your_key

# List integrations
wavnil integrations:list

# Create a test post
wavnil posts:create \
  -c "Test post from CLI" \
  -i "your-integration-id"
```

## Development Workflow

### 1. Make Changes

Edit files in `apps/cli/src/`

### 2. Rebuild

```bash
pnpm run build:cli
```

### 3. Test

```bash
# If linked globally
wavnil --help

# Or direct execution
node apps/cli/dist/index.js --help
```

### 4. Watch Mode (Auto-rebuild)

```bash
# From apps/cli directory
pnpm run dev

# In another terminal, test your changes
wavnil --help
```

## Environment Variables

### Required

- `WAVNIL_API_KEY` - Your Wavnil API key (required for all operations)

### Optional

- `WAVNIL_API_URL` - Custom API endpoint (default: `https://api.wavnil.com`)

### Setting Environment Variables

**Temporary (current session):**
```bash
export WAVNIL_API_KEY=your_key
export WAVNIL_API_URL=https://custom-api.com
```

**Permanent (add to shell profile):**
```bash
# For bash
echo 'export WAVNIL_API_KEY=your_key' >> ~/.bashrc
source ~/.bashrc

# For zsh
echo 'export WAVNIL_API_KEY=your_key' >> ~/.zshrc
source ~/.zshrc
```

## Using Aliases

Create a convenient alias:

```bash
# Add to ~/.bashrc or ~/.zshrc
alias pz='wavnil'

# Now you can use
pz posts:list
pz posts:create -c "Quick post" -i "twitter-123"
```

## Production Deployment

### Publish to npm

```bash
# From monorepo root
pnpm run publish-cli

# Or from apps/cli
cd apps/cli
pnpm run publish
```

### Install from npm

```bash
# Global install
npm install -g wavnil

# Project-specific
npm install wavnil
npx wavnil --help
```

## Summary of Methods

| Method | Command | Use Case |
|--------|---------|----------|
| **Direct Node** | `node apps/cli/dist/index.js` | Quick testing, no installation |
| **Direct Execution** | `./apps/cli/dist/index.js` | Same as above, slightly shorter |
| **Global Link** | `wavnil` (after `pnpm link --global`) | **Recommended** for development |
| **pnpm Filter** | `pnpm --filter wavnil start --` | From monorepo root |
| **npm Global** | `wavnil` (after `npm i -g wavnil`) | After publishing to npm |
| **npx** | `npx wavnil` | One-off usage without installing |

## Recommended Setup

For the best development experience:

```bash
# 1. Build
pnpm run build:cli

# 2. Link globally
cd apps/cli
pnpm link --global

# 3. Set API key
export WAVNIL_API_KEY=your_key

# 4. Test
wavnil --help
wavnil integrations:list

# 5. Start using!
wavnil posts:create -c "My first post" -i "twitter-123"
```

Now you can use `wavnil` from anywhere! 🚀
