export type Locale = "uz" | "ru" | "en";
export type DirectoryType = "employees" | "organizations";
export type Availability = "online" | "offline";

export interface ContactEntity {
  id: string;
  type: DirectoryType;
  name: string;
  title: string;
  description: string;
  department: string;
  availability: Availability;
  workingHours: string;
  tags: string[];
  avatar?: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

export interface TranslationDictionary {
  nav: {
    home: string;
    directory: string;
    faq: string;
  };
  home: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    titleEnd: string;
    description: string;
    request: string;
    faq: string;
    statsLabel: string;
    statsItems: string[];
  };
  request: {
    title: string;
    description: string;
    employees: string;
    organizations: string;
    enter: string;
  };
  directory: {
    title: string;
    employees: string;
    organizations: string;
    search: string;
    all: string;
    onlineOnly: string;
    available: string;
    unavailable: string;
    workingHours: string;
    call: string;
    videoCall: string;
    calling: string;
    status: string;
    noResults: string;
    openProfile: string;
  };
  faq: {
    title: string;
    description: string;
    search: string;
    all: string;
    noResults: string;
    contactPrompt: string;
  };
  rating: {
    title: string;
    description: string;
    placeholder: string;
    submit: string;
    thanks: string;
  };
  common: {
    language: string;
    back: string;
    close: string;
  };
}
