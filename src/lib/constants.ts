export const DOTORI_FILTER_TYPES = {
  LATEST_ORDER: "saveTime,desc" as const,
  OLDEST_ORDER: "saveTime,asc" as const,
  FREQUENTLY_VISITED: "clickCount,desc" as const,
  LESS_VISITED: "clickCount,asc" as const,
};

export const SERVER_URL = "https://dotoriham.duckdns.org";
export const GOOGLE_CLIENT_ID =
  "291594006814-9tmu29asficp56tn7q8ronumev1s39ru.apps.googleusercontent.com";
export const USER_STORAGE_KEY = "DOTORI_USER";
