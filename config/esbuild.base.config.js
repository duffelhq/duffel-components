module.exports = {
  entryPoints: [
    {
      out: "duffel-ancillaries",
      in: "src/components/DuffelAncillaries/DuffelAncillariesCustomElement.tsx",
    },
    {
      out: "duffel-payments",
      in: "src/components/DuffelPayments/DuffelPaymentsCustomElement.tsx",
    },
    { out: "global", in: "src/styles/global.css" },
  ],
  bundle: true,
  minify: true,
  sourcemap: true,
  treeShaking: true,
  outdir: "cdn-dist",
};
