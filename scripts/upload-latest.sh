#!/usr/bin/env bash

# Exit if a command fails
set -e
 
gcloud storage rm -r "gs://duffel-assets/ancillaries-component/latest"

# javascript
gcloud storage cp dist/components/DuffelCheckoutCustomElement.js "gs://duffel-assets/ancillaries-component/latest/DuffelCheckoutCustomElement.js"
gcloud storage cp dist/components/DuffelCheckoutCustomElement.js.map "gs://duffel-assets/ancillaries-component/latest/DuffelCheckoutCustomElement.js.map"

# styles
gcloud storage cp dist/styles/global.css "gs://duffel-assets/ancillaries-component/latest/global.css"
gcloud storage cp dist/styles/global.css.map "gs://duffel-assets/ancillaries-component/latest/global.css.map"

# fixture data
gcloud storage cp -r dist/fixtures "gs://duffel-assets/ancillaries-component/latest/fixtures"