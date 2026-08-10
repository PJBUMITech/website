const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix public asset paths for GitHub Pages basePath support. */
export function asset(path: string): string {
  if (!path) return path;
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
