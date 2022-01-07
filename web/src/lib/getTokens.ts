export default function getTokens() {
  const key = "TOKENS";

  const tokens = localStorage.getItem(key);
  try {
    if (!tokens) return null;
    const parsedTokens = JSON.parse(tokens) as any; // 나중에 타입 지정
    return parsedTokens;
  } catch (e) {
    localStorage.removeItem(key);
    return null;
  }
}
