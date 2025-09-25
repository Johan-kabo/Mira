
import React from 'react';
import type { Testimonial, PlanFeature, FaqItem } from './types';

export const NAV_LINKS = ["Feature", "Use Case", "Testimonial", "Pricing", "FAQ"];

export const GALLERY_IMAGES_TOP = [
  "https://picsum.photos/seed/cat1/400/300",
  "https://picsum.photos/seed/bridge2/400/300",
  "https://picsum.photos/seed/dogs1/400/300",
  "https://picsum.photos/seed/soldier1/400/300",
];

export const GALLERY_IMAGES_BOTTOM = [
  "https://picsum.photos/seed/frog1/400/300",
  "https://picsum.photos/seed/train2/400/300",
  "https://picsum.photos/seed/robot1/400/300",
  "https://picsum.photos/seed/castle2/400/300",
];

export const ALL_GALLERY_IMAGES = [
    ...GALLERY_IMAGES_TOP,
    ...GALLERY_IMAGES_BOTTOM,
    "https://picsum.photos/seed/graffiti/400/300",
    "https://picsum.photos/seed/warrior/400/300",
    "https://picsum.photos/seed/cat-window/400/300",
    "https://picsum.photos/seed/autumn-street/400/300",
    "https://picsum.photos/seed/comics/400/300",
    "https://picsum.photos/seed/woman-phone/400/300",
    "https://picsum.photos/seed/bird/400/300",
    "https://picsum.photos/seed/paper-flower/400/300",
    "https://picsum.photos/seed/lizard/400/300",
    "https://picsum.photos/seed/temple/400/300",
]

export const USE_CASES = [
  {
    icon: <IconMarketing />,
    title: "Marketing & Advertising",
    description: "Create eye-catching visuals for campaigns in seconds.",
  },
  {
    icon: <IconContentCreators />,
    title: "Content Creators",
    description: "Enhance your videos, blogs, or social media with unique art.",
  },
  {
    icon: <IconChrome />,
    title: "Chrome Extension",
    description: "Take your creativity to the next level with our Chrome Extension.",
  },
  {
    icon: <IconDesign />,
    title: "Design Inspiration",
    description: "Use AI-generated images as a starting point for your creative projects.",
  },
  {
    icon: <IconModels />,
    title: "Multiple Models for Outputs",
    description: "Our platform provides access to multiple AI models, each tailored for different creative needs.",
  },
  {
    icon: <IconPrompt />,
    title: "Smart Prompt Optimization",
    description: "Experience effortless creativity with our Smart Prompt Optimization feature.",
  },
];


export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Jerry Tang",
    role: "Recent graduate, Marketing at Sweatpals",
    avatarUrl: "https://picsum.photos/seed/jerry/100/100",
    quote: "Using Text-to-Image has saved me countless hours. The multilingual support allows me to reach students around the world with high-quality visual content.",
  },
  {
    name: "Jasseline",
    role: "Recent graduate, Marketing at Sweatpals",
    avatarUrl: "https://picsum.photos/seed/jasseline/100/100",
    quote: "Integrating the API into my app was seamless, and the image quality has impressed my users. Highly recommend it for developers!",
  },
  {
    name: "Alice",
    role: "Freelance graphic designer",
    avatarUrl: "https://picsum.photos/seed/alice/100/100",
    quote: "I absolutely love using this platform to seamlessly add unique and captivating images to my design presentations. It enhances the overall experience.",
  },
  {
    name: "Ethan",
    role: "UI/UX Designer at Creativo",
    avatarUrl: "https://picsum.photos/seed/ethan/100/100",
    quote: "The feature is a game-changer for accessibility. A whole new dimension to user experience.",
  },
  {
    name: "Alexis",
    role: "UX Designer at TechHub",
    avatarUrl: "https://picsum.photos/seed/alexis/100/100",
    quote: "I've been using the Text-to-Image tool for user testing, and it has significantly improved the feedback process.",
  },
];

export const PRICING_FEATURES: PlanFeature[] = [
    { name: "Generations", free: "5 images per month", pro: "50 images per month", enterprise: "Unlimited" },
    { name: "Styles", free: "Basic Styles", pro: "All Premium Styles", enterprise: "All Styles & Advanced Models" },
    { name: "Resolution", free: "Low-resolution", pro: "High-resolution", enterprise: "Custom Resolutions" },
    { name: "24/7 customer support", free: true, pro: true, enterprise: true },
    { name: "Customization", free: "Limited", pro: "Full Customization", enterprise: "Full White-label Options" },
    { name: "API Access", free: false, pro: false, enterprise: true },
    { name: "Chrome Extension", free: false, pro: true, enterprise: true },
    { name: "Multiple Models for Output", free: false, pro: true, enterprise: true },
    { name: "Smart Prompt Optimization", free: false, pro: true, enterprise: true },
    { name: "Team Collaboration", free: false, pro: false, enterprise: true },
];

export const FAQ_ITEMS: FaqItem[] = [
  { question: "What types of images can I create?", answer: "You can create a wide range of images, including illustrations, landscapes, portraits, and even abstract art. The possibilities are endless!" },
  { question: "Is there a limit to how many images I can generate?", answer: "The number of images you can generate depends on your chosen plan. Our free plan offers a limited number of generations, while our paid plans offer more generous limits or even unlimited generations." },
  { question: "Can I customize the style of the generated images?", answer: "Yes! Our platform offers various style presets and advanced options to customize the look and feel of your generated images to match your creative vision." },
  { question: "Are the images copyright-free?", answer: "Images generated under our paid plans are yours to use commercially, royalty-free. For the free plan, certain restrictions may apply. Please refer to our terms of service for details." },
  { question: "Does the AI support multiple languages?", answer: "Currently, our AI performs best with English prompts. However, we are continuously working on expanding our language support to cater to a global audience." },
  { question: "How long does it take to generate images?", answer: "Image generation time can vary from a few seconds to a minute, depending on the complexity of the prompt and the current server load. We strive to provide results as quickly as possible." },
];

// SVG Icons
function IconMarketing() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.332 12.309 16.226 16 12.228 16H10a4 4 0 01-4.564-.317z" />
        </svg>
    )
}

function IconContentCreators() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
        </svg>
    )
}

function IconChrome() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01M12 6v.01M12 18v.01" />
        </svg>
    )
}

function IconDesign() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
    )
}

function IconModels() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 18h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
        </svg>
    )
}

function IconPrompt() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    )
}
