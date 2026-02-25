/**
 * CDN configuration and URL helpers.
 *
 * All media is served through our self-hosted image transform service
 * at cdn.significa.co (Cloudflare → Fly.io → S3), with on-the-fly
 * sharp-based image transforms via URL query parameters.
 */

const CDN_HOSTNAME = "https://cdn.significa.co";

/** Default responsive breakpoints for srcset generation */
const SRCSET_WIDTHS = [640, 960, 1280, 1920];

/** Default image quality */
const DEFAULT_QUALITY = 80;

interface CdnImageOptions {
  width?: number;
  quality?: number;
  format?: "webp" | "avif" | "jpeg" | "png";
}

/**
 * Check whether a src is already an absolute URL (external or full CDN link).
 */
function isAbsoluteUrl(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

/**
 * Build a full CDN URL with optional image transform parameters.
 *
 * If `src` is already an absolute URL it's used as-is (no hostname prepended).
 * Transform query params are still appended when the URL points to our CDN.
 */
export function cdnUrl(src: string, options: CdnImageOptions = {}): string {
  const params = new URLSearchParams();

  if (options.width) params.set("width", String(options.width));
  if (options.quality) params.set("quality", String(options.quality));
  if (options.format) params.set("format", options.format);

  const query = params.toString();

  // Already a full URL — return as-is (with params only for our own CDN)
  if (isAbsoluteUrl(src)) {
    if (!query) return src;
    if (src.startsWith(CDN_HOSTNAME)) {
      const separator = src.includes("?") ? "&" : "?";
      return `${src}${separator}${query}`;
    }
    return src;
  }

  // Relative path — prepend CDN hostname
  const normalizedPath = src.startsWith("/") ? src : `/${src}`;
  return `${CDN_HOSTNAME}${normalizedPath}${query ? `?${query}` : ""}`;
}

/**
 * Generate a srcset string for responsive images.
 *
 * Returns `undefined` for external URLs that aren't on our CDN,
 * since we can't generate width variants for those.
 */
export function cdnSrcset(src: string, options: { quality?: number; widths?: number[] } = {}): string | undefined {
  // External URL not on our CDN — no srcset possible
  if (isAbsoluteUrl(src) && !src.startsWith(CDN_HOSTNAME)) {
    return undefined;
  }

  const quality = options.quality ?? DEFAULT_QUALITY;
  const widths = options.widths ?? SRCSET_WIDTHS;

  return widths.map((w) => `${cdnUrl(src, { width: w, quality })} ${w}w`).join(", ");
}

export { CDN_HOSTNAME, DEFAULT_QUALITY, SRCSET_WIDTHS };
