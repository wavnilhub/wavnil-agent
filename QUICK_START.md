# Wavnil CLI - Quick Start Guide

## Installation

### From npm

```bash
npm install -g wavnil

# Or with pnpm
pnpm add -g wavnil
```

## Setup

### 1. Get Your API Key

1. Log in to your Wavnil account at https://wavnil.com
2. Navigate to Settings → API Keys
3. Generate a new API key

### 2. Set Environment Variable

```bash
# Bash/Zsh
export WAVNIL_API_KEY=your_api_key_here

# Fish
set -x WAVNIL_API_KEY your_api_key_here

# PowerShell
$env:WAVNIL_API_KEY="your_api_key_here"
```

To make it permanent, add it to your shell profile:

```bash
# ~/.bashrc or ~/.zshrc
echo 'export WAVNIL_API_KEY=your_api_key_here' >> ~/.bashrc
source ~/.bashrc
```

### 3. Verify Installation

```bash
wavnil --help
```

## Basic Commands

### Create a Post

```bash
# Simple post
wavnil posts:create -c "Hello World!" -i "twitter-123"

# Post with multiple images
wavnil posts:create \
  -c "Check these out!" \
  -m "img1.jpg,img2.jpg" \
  -i "twitter-123"

# Post with comments (each can have different media!)
wavnil posts:create \
  -c "Main post" -m "main.jpg" \
  -c "First comment" -m "comment1.jpg" \
  -c "Second comment" -m "comment2.jpg" \
  -i "twitter-123"

# Scheduled post
wavnil posts:create \
  -c "Future post" \
  -s "2024-12-31T12:00:00Z" \
  -i "twitter-123"
```

### List Posts

```bash
# List all posts
wavnil posts:list

# With pagination
wavnil posts:list -p 2 -l 20

# Search
wavnil posts:list -s "keyword"
```

### Delete a Post

```bash
wavnil posts:delete abc123xyz
```

### List Integrations

```bash
wavnil integrations:list
```

### Upload Media

```bash
wavnil upload ./path/to/image.png
```

## Common Workflows

### 1. Check What's Connected

```bash
# See all your connected social media accounts
wavnil integrations:list
```

The output will show integration IDs like:
```json
[
  { "id": "twitter-123", "provider": "twitter" },
  { "id": "linkedin-456", "provider": "linkedin" }
]
```

### 2. Create Multi-Platform Post

```bash
# Use the integration IDs from step 1
wavnil posts:create \
  -c "Posting to multiple platforms!" \
  -i "twitter-123,linkedin-456,facebook-789"
```

### 3. Schedule Multiple Posts

```bash
# Morning post
wavnil posts:create -c "Good morning!" -s "2024-01-15T09:00:00Z"

# Afternoon post
wavnil posts:create -c "Lunch time update!" -s "2024-01-15T12:00:00Z"

# Evening post
wavnil posts:create -c "Good night!" -s "2024-01-15T20:00:00Z"
```

### 4. Upload and Post Image

```bash
# First upload the image
wavnil upload ./my-image.png

# Copy the URL from the response, then create post
wavnil posts:create -c "Check out this image!" --image "url-from-upload"
```

## Tips & Tricks

### Using with jq for JSON Parsing

```bash
# Get just the post IDs
wavnil posts:list | jq '.[] | .id'

# Get integration names
wavnil integrations:list | jq '.[] | .provider'
```

### Script Automation

```bash
#!/bin/bash
# Create a batch of posts

for hour in 09 12 15 18; do
  wavnil posts:create \
    -c "Automated post at ${hour}:00" \
    -s "2024-01-15T${hour}:00:00Z"
  echo "Created post for ${hour}:00"
done
```

### Environment Variables

```bash
# Custom API endpoint (for self-hosted)
export WAVNIL_API_URL=https://your-instance.com

# Use the CLI with custom endpoint
wavnil posts:list
```

## Troubleshooting

### API Key Not Set

```
❌ Error: WAVNIL_API_KEY environment variable is required
```

**Solution:** Set the environment variable:
```bash
export WAVNIL_API_KEY=your_key
```

### Command Not Found

```
wavnil: command not found
```

**Solution:**
1. Install the CLI globally: `npm install -g wavnil`, then open a new terminal.
2. If it is still not found, add npm's global folder to your PATH (`npm prefix -g` prints it).
3. Or run it without installing: `npx wavnil --help`

### API Errors

```
❌ API Error (401): Unauthorized
```

**Solution:** Check your API key is valid and has proper permissions.

```
❌ API Error (404): Not Found
```

**Solution:** Verify the post ID exists when deleting.

## Getting Help

```bash
# General help
wavnil --help

# Command-specific help
wavnil posts:create --help
wavnil posts:list --help
wavnil posts:delete --help
```

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check [SKILL.md](./SKILL.md) for AI agent integration patterns
- See [examples/](./examples/) for more usage examples

## Links

- [Wavnil Website](https://wavnil.com)
- [API Documentation](https://wavnil.com/api-docs)
- [GitHub Repository](https://github.com/wavnilhub/wavnil-agent)
- [Report Issues](https://github.com/wavnilhub/wavnil-agent/issues)
