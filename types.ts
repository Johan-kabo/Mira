
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
