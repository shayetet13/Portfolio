#!/bin/bash

echo "🧹 Cleaning up Git submodules..."

# Remove submodule entries from .gitmodules
if [ -f ".gitmodules" ]; then
    echo "Removing .gitmodules file..."
    rm .gitmodules
fi

# Remove submodule entries from .git/config
echo "Cleaning Git config..."
git config --remove-section submodule.Portfolio 2>/dev/null || true

# Remove submodule directory from index
echo "Removing Portfolio from Git index..."
git rm --cached Portfolio 2>/dev/null || true

# Remove submodule directory
echo "Removing Portfolio directory..."
rm -rf Portfolio

# Remove from .git/modules
echo "Cleaning .git/modules..."
rm -rf .git/modules/Portfolio

# Clean up any remaining references
git submodule deinit -f --all 2>/dev/null || true

echo "✅ Cleanup complete!"
echo "📝 Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Remove problematic submodule'"
echo "3. git push origin main"
