#!/usr/bin/env bash

# Exit if a command fails
set -e

# Define where to upload files too
GCP_PREFIX=gs://duffel-assets/components/ancillaries

# Gets current version from package.json 
VERSION=$(jq '.version' package.json -r)

# Check if version is empty
if [ -z "$VERSION" ]; then
  echo "Error: version is empty"
  exit 1
fi

# Check if folder exists
if gsutil -q stat "$GCP_PREFIX/$VERSION/index.js"; then
  # Confirm with user before overriding
  read -p "Version \`$VERSION\` already exists. Do you want to override it? (\`Y\` to continue) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Delete old version from GCP
    gcloud storage rm -r "$GCP_PREFIX/$VERSION"
  else
    echo "Aborting script."
    exit 1
  fi
fi
 
# Uploads fixtures
gcloud storage cp -r dist/ancillaries "$GCP_PREFIX/$VERSION"

# Check if --latest argument is provided
if [ "$1" == "--latest" ]; then
  # Copies the current version into the latest folder 
  gcloud storage cp -r "$GCP_PREFIX/$VERSION" "$GCP_PREFIX/latest"
fi