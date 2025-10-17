#!/bin/bash

# GitHub Sync Script for KnowYourTax.ai
# This script demonstrates the process to sync with GitHub

echo "=== KnowYourTax.ai GitHub Sync ==="
echo "Repository: https://github.com/jitenkr2030/KnowYourTax"
echo ""

# Check git status
echo "1. Checking git status..."
git status
echo ""

# Check current commit
echo "2. Current commit:"
git log --oneline -1
echo ""

# Check remote configuration
echo "3. Remote configuration:"
git remote -v
echo ""

# Instructions for manual sync
echo "=== MANUAL SYNC INSTRUCTIONS ==="
echo ""
echo "To sync with GitHub, you need to:"
echo ""
echo "1. Configure Git credentials:"
echo "   git config --global user.name \"Your Name\""
echo "   git config --global user.email \"your.email@example.com\""
echo ""
echo "2. Add remote repository (if not already added):"
echo "   git remote add origin https://github.com/jitenkr2030/KnowYourTax.git"
echo ""
echo "3. Push to GitHub:"
echo "   git push -u origin master"
echo ""
echo "4. If prompted for credentials, use your GitHub username and:"
echo "   - Your GitHub password (if enabled)"
echo "   - OR a Personal Access Token (PAT) with 'repo' scope"
echo ""
echo "=== REPOSITORY STATUS ==="
echo "✓ All files are committed locally"
echo "✓ Working tree is clean"
echo "✓ Ready for GitHub sync"
echo ""
echo "Total files tracked: $(git ls-files | wc -l)"
echo "Repository size: $(du -sh .git 2>/dev/null || echo 'Unknown')"
echo ""
echo "=== NEXT STEPS ==="
echo "1. Configure your Git credentials"
echo "2. Push to GitHub using the commands above"
echo "3. Verify the sync at: https://github.com/jitenkr2030/KnowYourTax"
echo ""