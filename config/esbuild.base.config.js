module.exports = {
  entryPoints: [
    { out: "global", in: "src/styles/global.css" },
    {
      out: "duffel-ancillaries",
      in: "src/components/DuffelAncillaries/DuffelAncillariesCustomElement.tsx",
    },
    {
      out: "duffel-payments",
      in: "src/components/DuffelPayments/DuffelPaymentsCustomElement.tsx",
    },
    {
      out: "duffel-card-form",
      in: "src/components/DuffelCardForm/DuffelCardFormCustomElement.tsx",
    },
    {
      out: "create3DSSession",
      in: "src/functions/create3DSSession/create3DSSession.ts"
    }
    // Created a new custom element wrapper for a components
    // and want to make it available on the CDN? Add it here.
  ],
  bundle: true,
  minify: true,
  sourcemap: true,
  treeShaking: true,
  outdir: "cdn-dist",
};
