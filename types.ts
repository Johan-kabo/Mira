
export type Page = 'home' | 'background-remover' | 'image-to-prompt' | 'ai-image-editor' | 'creative-upscaler' | 'about' | 'video-generator' | 'text-to-audio';
export type Language = 'fr' | 'en';

export interface NavLink {
  name: string;
  page: Page;
}

export interface Testimonial {
  name: string;
  role: string;
  avatarUrl: string;
  quote: string;
}

export interface PlanFeature {
  name: string;
  free: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

export interface PricingPlan {
  name: string;
  price: string;
  priceDetails?: string;
  isPopular?: boolean;
  features: PlanFeature[];
}

export interface FaqItem {
  question: string;
  answer: string;
}