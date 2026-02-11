/**
 * Throw a build-time error with actionable context.
 * Used in MDX components and page templates to catch content issues early.
 */
export function contentError(
  component: string,
  file: string,
  message: string,
): never {
  throw new Error(
    `[${component}] in ${file}: ${message}\nFix the content and rebuild.`,
  );
}
