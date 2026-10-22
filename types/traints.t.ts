export interface Trait {
  title: string;
  body: string;
}

export interface TraitsPage {
  date: string;
  heading: string;
  intro: string;
  subIntro?: string;
  image: string; // path or external URL
  items: Trait[];
}
