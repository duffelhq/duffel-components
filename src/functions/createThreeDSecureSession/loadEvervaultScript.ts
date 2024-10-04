const SCRIPT_ID = "evervault-script";

export function loadEvervaultScript(): Promise<void> {
  return new Promise((resolve) => {
    // check if it's loaded. If it is, don't load it again
    if (document.getElementById(SCRIPT_ID)) return resolve();

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "text/javascript";
    script.src = "https://js.evervault.com/v2";
    script.onload = () => {
      console.log("Evervault script loaded");
      resolve();
    };

    document.body.appendChild(script);
  });
}
