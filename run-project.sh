#!/bin/bash
# Change to the AttachmentManager directory
cd AttachmentManager

# Check which directory we're in
echo "Current directory: $(pwd)"

# Start the application
npx tsx server/index.ts