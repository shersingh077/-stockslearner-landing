export function getSafeNextPath(
  requestedPath: string | null,
  origin: string,
  fallback = "/dashboard",
) {
  if (
    !requestedPath?.startsWith("/") ||
    requestedPath.startsWith("//")
  ) {
    return fallback;
  }

  try {
    const destination = new URL(requestedPath, origin);

    if (destination.origin !== origin) {
      return fallback;
    }

    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return fallback;
  }
}
