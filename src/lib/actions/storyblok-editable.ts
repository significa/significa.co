/**
 * Storyblok Editable Action - STUB
 *
 * This action is no longer used since we migrated from Storyblok to WordPress.
 * It's kept as a no-op to prevent breaking existing components that reference it.
 */

export const storyblokEditable = (node: HTMLElement, _value: any) => {
  // No-op: WordPress doesn't have live editing like Storyblok
  return {
    update(_newValue: any) {
      // No-op
    },
    destroy() {
      // No cleanup needed
    }
  };
};
