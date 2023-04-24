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

# Uploads javascript and stylesheet
gcloud storage cp dist/components/DuffelAncillariesCustomElement.js "$GCP_PREFIX/$VERSION/index.js"
gcloud storage cp dist/styles/global.css "$GCP_PREFIX/$VERSION/global.css"

# Uploads sourcemaps
gcloud storage cp dist/components/DuffelAncillariesCustomElement.js.map "$GCP_PREFIX/$VERSION/index.js.map"
gcloud storage cp dist/styles/global.css.map "$GCP_PREFIX/$VERSION/global.css.map"

# Uploads fixtures
gcloud storage cp -r dist/fixtures "$GCP_PREFIX/$VERSION/fixtures"

# Check if --latest argument is provided
if [ "$1" == "--latest" ]; then
  # Copies the current version into the latest folder 
  gsutil -m cp -r "$GCP_PREFIX/$VERSION" "$GCP_PREFIX/latest"
fi