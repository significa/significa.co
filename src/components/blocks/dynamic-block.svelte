<script lang="ts" context="module">
  import Comparison from './comparison.svelte';
  import ImageGrid from './image-grid.svelte';
  import Image from './image.svelte';

  const map = {
    'about-grid': AboutGrid,
    'awards-list': AwardsList,
    'awards-grid': AwardsGrid,
    'draw-segg': DrawSegg,
    'blog-list': BlogList,
    image: Image,
    'careers-list': CareersList,
    'contact-us-form': ContactUsForm,
    comparison: Comparison,
    canvas: Canvas,
    'core-values': CoreValues,
    'form-budget-range': FormBudgetRange,
    'image-grid': ImageGrid,
    'richtext-code-block': RichTextCodeBlock,
    'two-columns': TwoColumns,
    'richtext-testimonial': RichTextTestimonial,
    video: Video,
    'richtext-box': RichTextBox,
    list: List,
    hero: Hero,
    packages: Packages,
    physics: Physics,
    'prefooter-form': PrefooterForm,
    'projects-two-columns': ProjectsTwoColumns,
    'work-recognitions': WorkRecognitions,
    estimation: Estimation,
    newton: Newton,
    'office-cards': OfficeCards,
    'open-positions': OpenPositions,
    slogan: Slogan,
    slideshow: Slideshow,
    steps: Steps,
    services: Services,
    testimonials: Testimonials,
    'timeline-services': TimelineServices,
    timeline: Timeline,
    timezone: Timezone,
    'vertical-list': VerticalList,
    clients: Clients,
    projects: Projects,
    'cta-card': CtaCard
  };

  export type Blocks = keyof typeof map;

  const isBlock = (block: { component: string }): block is { component: Blocks } => {
    return !!block.component && block.component in map;
  };
</script>

<script lang="ts">
  import { dev } from '$app/environment';
  import type { ComponentType } from 'svelte';
  import RichTextCodeBlock from './rich-text-code-block.svelte';
  import TwoColumns from './two-columns.svelte';
  import RichTextTestimonial from './rich-text-testimonial.svelte';
  import Video from './video.svelte';
  import RichTextBox from './rich-text-box.svelte';
  import Hero from './hero.svelte';
  import Packages from './packages.svelte';
  import WorkRecognitions from './work-recognitions.svelte';
  import Estimation from './estimation.svelte';
  import Steps from './steps.svelte';
  import Services from './services.svelte';
  import Testimonials from './testimonials.svelte';
  import Clients from './clients.svelte';
  import Projects from './projects.svelte';
  import CtaCard from './cta-card.svelte';
  import OfficeCards from './office-cards.svelte';
  import PrefooterForm from './prefooter-form.svelte';
  import CoreValues from './core-values.svelte';
  import AwardsList from './awards-list.svelte';
  import AwardsGrid from './awards-grid.svelte';
  import TimelineServices from './timeline-services.svelte';
  import Timeline from './timeline.svelte';
  import Physics from './physics.svelte';
  import CareersList from './careers-list.svelte';
  import BlogList from './blog-list.svelte';
  import AboutGrid from './about-grid.svelte';
  import Newton from './newton.svelte';
  import Slogan from './slogan.svelte';
  import Slideshow from './slideshow.svelte';
  import Timezone from './timezone.svelte';
  import FormBudgetRange from './form-budget-range.svelte';
  import List from './list.svelte';
  import ContactUsForm from './contact-us-form.svelte';
  import OpenPositions from './open-positions.svelte';
  import DrawSegg from './draw-segg.svelte';
  import Canvas from './canvas.svelte';
  import ProjectsTwoColumns from './projects-two-columns.svelte';
  import VerticalList from './vertical-list.svelte';

  export let block: { component: string };

  const component: ComponentType | null = isBlock(block) ? map[block.component] : null;

  if (!component && dev) {
    console.error('Uncaught component', block.component);
  }
</script>

{#if component}
  <svelte:component this={component} {block} {...$$restProps} />
{/if}
