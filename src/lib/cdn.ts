/**
 * Bunny CDN configuration and URL helpers.
 *
 * All media is served through Bunny.net CDN with the Optimizer Engine
 * for real-time image transforms via URL query parameters.
 */

const CDN_HOSTNAME = "https://significa.b-cdn.net";

/** Default responsive breakpoints for srcset generation */
const SRCSET_WIDTHS = [640, 960, 1280, 1920];

/** Default image quality */
const DEFAULT_QUALITY = 80;

interface CdnImageOptions {
  width?: number;
  quality?: number;
  format?: "webp" | "avif" | "jpeg" | "png";
  blur?: number;
  sharpen?: boolean;
  aspect_ratio?: string;
}

/**
 * Build a full Bunny CDN URL with optional optimizer parameters.
 */
export function cdnUrl(path: string, options: CdnImageOptions = {}): string {
  const params = new URLSearchParams();

  if (options.width) params.set("width", String(options.width));
  if (options.quality) params.set("quality", String(options.quality));
  if (options.format) params.set("format", options.format);
  if (options.blur) params.set("blur", String(options.blur));
  if (options.sharpen) params.set("sharpen", "true");
  if (options.aspect_ratio) params.set("aspect_ratio", options.aspect_ratio);

  const query = params.toString();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${CDN_HOSTNAME}${normalizedPath}${query ? `?${query}` : ""}`;
}

/**
 * Generate a srcset string for responsive images.
 */
export function cdnSrcset(
  path: string,
  options: { quality?: number; widths?: number[] } = {}
): string {
  const quality = options.quality ?? DEFAULT_QUALITY;
  const widths = options.widths ?? SRCSET_WIDTHS;

  return widths
    .map((w) => `${cdnUrl(path, { width: w, quality })} ${w}w`)
    .join(", ");
}

export { CDN_HOSTNAME, DEFAULT_QUALITY, SRCSET_WIDTHS };
