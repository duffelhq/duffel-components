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
    {
      out: "results-page",
      in: "src/components/ResultsPage/ResultsPageCustomElement.tsx",
    },
    {
      out: "search-page",
      in: "src/components/SearchPage/SearchPageCustomElement.tsx",
    },
    { out: "global", in: "src/styles/global.css" },
  ],
  bundle: true,
  minify: true,
  sourcemap: true,
  treeShaking: true,
  outdir: "cdn-dist",
};
