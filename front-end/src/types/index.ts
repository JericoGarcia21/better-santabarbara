export type LanguageType =
  | 'en' // English
  | 'fil' // Filipino (standardized Tagalog)
  | 'pag'; // Pangasinan

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}
