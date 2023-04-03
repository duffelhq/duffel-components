#!/usr/bin/env bash

# Exit if a command fails
set -e
 
VERSION=$(jq '.version' package.json -r)

gcloud storage rm -r "gs://duffel-assets/ancillaries-component/latest"

gcloud storage cp dist/components/DuffelCheckoutCustomElement.js "gs://duffel-assets/ancillaries-component/latest/DuffelCheckoutCustomElement.js"
gcloud storage cp dist/components/DuffelCheckoutCustomElement.js.map "gs://duffel-assets/ancillaries-component/latest/DuffelCheckoutCustomElement.js.map"
gcloud storage cp dist/styles/global.css "gs://duffel-assets/ancillaries-component/latest/global.css"
gcloud storage cp dist/styles/global.css.map "gs://duffel-assets/ancillaries-component/latest/global.css.map"
