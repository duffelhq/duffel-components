export function loadEvervaultScript() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://js.evervault.com/v2";

  document.body.appendChild(script);
}
