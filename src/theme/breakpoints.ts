const sizes: { [key: string]: number } = {
  small: 32,
  medium: 48,
  large: 64,
  largest: 80,
  xlarge: 100,
  xxlarge: 120,
}

export const media = {
  // max-width
  small: `@media (max-width: ${sizes.small}em)`,
  medium: `@media (max-width: ${sizes.medium}em)`,
  large: `@media (max-width: ${sizes.large}em)`,
  largest: `@media (max-width: ${sizes.largest}em)`,
  // mi@media n-width
  xlarge: `@media (min-width: ${sizes.xlarge}em)`,
  xxlarge: `@media (min-width: ${sizes.xxlarge}em)`,
  // other medias
  hover: `@media (hover: hover)`,
}
