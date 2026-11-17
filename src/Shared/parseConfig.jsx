// Initializes Parse once, before any model is used.
// Keys come from environment variables (see .env.example) so each deployment
// (Vercel main / develop) and each developer can configure their own.
import Parse from "parse";

const appId = import.meta.env.VITE_PARSE_APP_ID;
const jsKey = import.meta.env.VITE_PARSE_JS_KEY;
const serverURL =
  import.meta.env.VITE_PARSE_SERVER_URL || "https://parseapi.back4app.com";

if (!appId || !jsKey) {
  throw new Error(
    "Missing VITE_PARSE_APP_ID or VITE_PARSE_JS_KEY. Copy .env.example to .env.local and fill them in."
  );
}

Parse.initialize(appId, jsKey);
Parse.serverURL = serverURL;
export default Parse;
