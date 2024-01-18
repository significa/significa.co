import type { AssetStoryblok, MultilinkStoryblok } from '$types/bloks';
import { sanitizeSlug } from './paths';

export function getAnchorFromCmsLink(link: MultilinkStoryblok | undefined) {
  const attributes: {
    href?: string;
    rel?: string;
    target?: '_blank';
  } = {};

  switch (link?.linktype) {
    case 'story': {
      if ('story' in link && link.story?.full_slug) {
        attributes.href = sanitizeSlug(link.story.full_slug);
      } else if (link.cached_url) {
        attributes.href = sanitizeSlug(link.cached_url);
      }
      break;
    }
    case 'email': {
      attributes.href = `mailto:${link.email}`;
      break;
    }
    default: {
      const href = link?.url || link?.cached_url || undefined;
      attributes.href = href;

      if (href && href.startsWith('http')) {
        attributes.target = '_blank';
        attributes.rel = 'noopener noreferrer';
      }

      break;
    }
  }

  return attributes;
}

const getStoryblokImageSize = (src: string) => {
  const width = src.split('/')[5].split('x')[0];
  const height = src.split('/')[5].split('x')[1];

  return { width, height };
};

export interface ImageAttributesOptions {
  /**
   * The size argument assumes an array of 2 numbers (width, height)
   */
  size: number[];
  /**
   * The fit-in argument specifies that the image should
   * not be auto-cropped but auto-resized (shrunk) to
   * fit inside the imaginary width and height box instead.
   */
  fitIn: boolean;
  /**
   * To use with fitIn argument, this argument
   * will fill empty areas with the provided color.
   *
   * You should provide a valid HEX color
   */
  fill: string | 'transparent';
  /**
   * To change the image format, use the format filter
   */
  format: 'webp' | 'jpeg' | 'png';
  /**
   * You can change the compression rate of your
   * JPEG images using the quality filter.
   * The value can be 0-100
   */
  quality: number;
  /**
   * Facial detection and smart cropping
   *
   * When cropping an image, define a smart filter that crops around the focal point.
   */
  smart: boolean;
  focal: Record<'left' | 'top' | 'right' | 'bottom', string>;
  /**
   * You can serve black and white images with the grayscale filter
   */
  grayscale: boolean;
  /**
   * You can blur images with the blur filter.
   * This is particularly useful for placeholders for lazy-loaded images
   *
   * An int value between 0 and 150. the higher the number, the more blurred the image will be
   */
  blur: number;
  /**
   * You rotate your images with rotate filter.
   * Angle is the following values 90, 180, 270
   */
  rotate: 90 | 180 | 270;
  /**
   * Flip your images with the resizing parameter.
   */
  flip: 'horizontal' | 'vertical' | 'both';
  /**
   * Set the brightness of your image with the param,
   * brightness(amount) where the amount is a value between -100 and 100
   */
  brightness: number;
  /**
   * Add rounded corners to your image with the round_corner filter
   */
  roundCorner: {
    /**
     * An integer representing the radius size
     */
    radius: number;
    /**
     * The background color outside the rounded corners
     *
     * @default [255, 255, 255]
     */
    rgb?: number[];
    /**
     * An optional value from 0 to 1 to set the opacity of the background color
     *
     * @default 1
     */
    transparency?: number;
  };
}

export type ImageAttributes = {
  alt: string;
  title?: string;
  src: string;
  width: string;
  height: string;
};

export function getImageAttributes(
  image: AssetStoryblok,
  options?: Partial<ImageAttributesOptions>
): ImageAttributes {
  let src = image.filename + '/m/';

  const imgSizeAttr = getStoryblokImageSize(image.filename);
  const sizeInUrl = { width: '0', height: '0' };
  const alt = image.alt || image.name || '';
  const title = image.title;

  const filters: Record<string, string | number> = {};

  if (options?.size) {
    const [width, height] = options.size;
    if (width) {
      sizeInUrl.width = width.toString();
    }
    if (height) {
      sizeInUrl.height = height.toString();
    }
  }

  if (options?.fitIn) {
    src += 'fit-in/';
  }

  if (options?.format) {
    filters.format = options.format;
  }

  if (options?.quality) {
    filters.quality = options.quality;
  }

  if (options?.focal) {
    const { focal } = options;
    filters.focal = `${focal.left}x${focal.top}:${focal.right}x${focal.bottom}`;
  }

  if (options?.grayscale) {
    filters.grayscale = '';
  }

  if (options?.blur) {
    filters.blur = options.blur;
  }

  if (options?.rotate) {
    filters.rotate = options.rotate;
  }

  if (options?.flip) {
    if (options.flip === 'horizontal' || options.flip === 'both') {
      sizeInUrl.width = `-${sizeInUrl.width}`;
    }
    if (options.flip === 'vertical' || options.flip === 'both') {
      sizeInUrl.height = `-${sizeInUrl.height}`;
    }
  }

  if (options?.brightness) {
    filters.brightness = options.brightness;
  }

  if (options?.roundCorner) {
    const rgb = Array(3)
      .fill(255)
      .map((def, idx) => {
        return options.roundCorner?.rgb?.[idx] || def;
      });

    const result = [options.roundCorner.radius, ...rgb];

    if (options.roundCorner.transparency) {
      result.push(options.roundCorner.transparency);
    }

    filters.round_corner = result.join(',');
  }

  if (options?.fill) {
    filters.fill = options.fill;
  }

  src += `${sizeInUrl.width}x${sizeInUrl.height}/`;

  if (options?.smart) {
    src += 'smart/';
  }

  if (Object.keys(filters).length > 0) {
    const strFilters = Object.entries(filters).map(([key, value]) => {
      return `${key}(${value || ''})`;
    });
    src += `filters:${strFilters.join(':')}`;
  }

  return {
    alt,
    title,
    src,
    ...imgSizeAttr
  };
}
