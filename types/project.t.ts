export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  bullets?: string[];
  image: string;
  imageAlt?: string;
  github?: string;
  live?: string;
  page?: string;
  techs?: string[];
};
