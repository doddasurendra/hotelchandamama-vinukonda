#!/bin/bash

# Hotel Chandamama - Automatic GitHub Push Script
# This script will push your project to GitHub automatically

echo "=================================="
echo "Hotel Chandamama - GitHub Push"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed${NC}"
    echo "Please install Git first:"
    echo "  Windows: https://git-scm.com/download/win"
    echo "  Mac: brew install git"
    echo "  Linux: sudo apt install git"
    exit 1
fi

echo -e "${GREEN}✓ Git found${NC}"

# Check if we're in the right directory
if [ ! -f "README.md" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo -e "${RED}❌ Error: Not in hotel-chandamama directory${NC}"
    echo "Please run this script from the hotel-chandamama folder"
    exit 1
fi

echo -e "${GREEN}✓ In correct directory${NC}"
echo ""

# Initialize git if not already
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
    echo -e "${GREEN}✓ Git initialized${NC}"
fi

# Add all files
echo "Adding all files..."
git add .
echo -e "${GREEN}✓ Files added${NC}"

# Commit
echo "Creating commit..."
git commit -m "Initial commit - Hotel Chandamama Restaurant Management System

Features:
- Beautiful peacock blue themed website
- Admin panel for restaurant management
- Kitchen display system
- QR code ordering
- Mobile responsive PWA
- Complete documentation
- Free hosting setup

Built with React, Node.js, MongoDB, Tailwind CSS
Ready for deployment on Vercel + Render + MongoDB Atlas (all free)"

echo -e "${GREEN}✓ Commit created${NC}"

# Add remote
echo "Adding GitHub remote..."
git remote remove origin 2>/dev/null  # Remove if exists
git remote add origin https://github.com/doddasurendra/hotelchandamama-vinukonda.git
echo -e "${GREEN}✓ Remote added${NC}"

# Set branch name
git branch -M main
echo -e "${GREEN}✓ Branch set to main${NC}"

echo ""
echo "=================================="
echo -e "${YELLOW}Ready to push to GitHub!${NC}"
echo "=================================="
echo ""
echo "Repository: https://github.com/doddasurendra/hotelchandamama-vinukonda"
echo ""
echo "When prompted, enter:"
echo "  Username: doddasurendra"
echo "  Password: Your GitHub Personal Access Token"
echo ""
echo -e "${YELLOW}Don't have a token? Get one at:${NC}"
echo "  https://github.com/settings/tokens"
echo ""
read -p "Press Enter to continue with push..."

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "=================================="
    echo -e "${GREEN}✅ SUCCESS!${NC}"
    echo "=================================="
    echo ""
    echo "Your code is now on GitHub! 🎉"
    echo ""
    echo "View it at:"
    echo "  https://github.com/doddasurendra/hotelchandamama-vinukonda"
    echo ""
    echo "Next steps:"
    echo "  1. ✅ Code is on GitHub (DONE!)"
    echo "  2. 🚀 Deploy frontend to Vercel"
    echo "  3. 🚀 Deploy backend to Render"
    echo "  4. 💾 Setup MongoDB Atlas"
    echo ""
    echo "See DEPLOYMENT.md for complete deployment guide"
    echo ""
else
    echo ""
    echo "=================================="
    echo -e "${RED}❌ Push Failed${NC}"
    echo "=================================="
    echo ""
    echo "Common issues:"
    echo "  1. Wrong username/password"
    echo "     → Use Personal Access Token as password"
    echo "  2. Token doesn't have permissions"
    echo "     → Create new token with 'repo' scope"
    echo "  3. Repository already has content"
    echo "     → Run: git pull origin main --allow-unrelated-histories"
    echo ""
    echo "Need help? Share the error message above."
fi
