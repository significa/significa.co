export type StoryblokLinks = Record<string, StoryblokLink>;

export type StoryblokLink = {
  alternates: {
    lang: string;
    path: string;
    name: string | null;
  }[];
  id: number;
  slug: string;
  name: string;
  is_folder: boolean;
  parent_id: number;
  published: boolean;
  position: number;
  uuid: string;
  is_startpage: boolean;
  real_path: string;
};
