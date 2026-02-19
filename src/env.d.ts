/// <reference path="../.astro/types.d.ts" />

declare module "*.astro" {
  type AstroComponentFactory = import("astro").AstroComponentFactory;

  const component: AstroComponentFactory;
  export default component;
}
