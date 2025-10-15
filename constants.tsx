import React from 'react';
// FIX: Import NavLink to be used for type assertion.
import type { Testimonial, PlanFeature, FaqItem, NavLink, Page } from './types';

// SVG Icons (remain unchanged)
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

const testimonialsData: Omit<Testimonial, 'quote'>[] = [
  { name: "Jerry Tang", role: "Recent graduate, Marketing at Sweatpals", avatarUrl: "https://picsum.photos/seed/jerry/100/100" },
  { name: "Jasseline", role: "Recent graduate, Marketing at Sweatpals", avatarUrl: "https://picsum.photos/seed/jasseline/100/100" },
  { name: "Alice", role: "Freelance graphic designer", avatarUrl: "https://picsum.photos/seed/alice/100/100" },
  { name: "Ethan", role: "UI/UX Designer at Creativo", avatarUrl: "https://picsum.photos/seed/ethan/100/100" },
  { name: "Alexis", role: "UX Designer at TechHub", avatarUrl: "https://picsum.photos/seed/alexis/100/100" },
];


export const translations = {
  en: {
    toolNavLinks: [
      { name: "AI Video Generator", page: "video-generator" },
      { name: "AI Audio Generator", page: "text-to-audio" },
      { name: "Background Remover", page: "background-remover" },
      { name: "Image to Prompt", page: "image-to-prompt" },
      { name: "AI Image Editor", page: "ai-image-editor" },
      { name: "Creative Upscaler", page: "creative-upscaler" }
    ] as NavLink[],
    navLinks: ["Feature", "Use Case", "Testimonial", "Pricing", "FAQ"],
    signIn: "Sign In",
    hero: {
      speechRelease: "Speech to speech release!",
      getAccess: "Get early access",
      title: "Turn Your Words into <br /> Stunning Visuals",
      subtitle: "Whether you need concept art, marketing materials, or personal projects, our text-to-image generator brings your imagination to life.",
      button: "Create image",
      placeholder: "a cyberpunk dystopia with a sprawling, rain-soaked cityscape",
      error: "Please enter a prompt."
    },
    features: {
        title: "Explore the powerful features behind our AI generator",
        subtitle: "Our AI generator is built with cutting-edge technology to deliver exceptional results. Whether you're a designer, content creator, or business owner, these features will elevate your creative process to the next level.",
        cards: {
            video_generator: {
                title: "AI Video Generator",
                description: "Create short, high-quality video clips from a simple text description. Perfect for social media, ads, or animated concepts."
            },
            text_to_audio: {
                title: "AI Audio Generator",
                description: "Transform text into lifelike speech. Choose from various voices, adjust speed and pitch, and bring your words to life."
            },
            remover: {
                title: "Background Remover",
                description: "Effortlessly remove image backgrounds in seconds with our advanced AI technology. Perfect for creating stunning visuals, professional presentations, or e-commerce product photos."
            },
            image_to_prompt: {
                title: "Image to Prompt",
                description: "Upload an image and let our AI analyze it to generate a detailed, creative text prompt. Discover the magic behind the art."
            },
            style_transfer: {
                title: "AI Style Transfer",
                description: "Apply the artistic style of one image to another. Turn your photos into works of art in the style of famous painters or abstract designs."
            },
            upscaler: {
                title: "Creative Upscaler",
                description: "From Blurry to Beautiful: Our AI-powered Creative Upscaler instantly transforms low-quality images into crisp, high-definition masterpieces."
            }
        }
    },
    useCases: {
        title: "Endless possibilities with AI art",
        items: [
          { title: "Marketing & Advertising", description: "Create eye-catching visuals for campaigns in seconds." },
          { title: "Content Creators", description: "Enhance your videos, blogs, or social media with unique art." },
          { title: "Chrome Extension", description: "Take your creativity to the next level with our Chrome Extension." },
          { title: "Design Inspiration", description: "Use AI-generated images as a starting point for your creative projects." },
          { title: "Multiple Models for Outputs", description: "Our platform provides access to multiple AI models, each tailored for different creative needs." },
          { title: "Smart Prompt Optimization", description: "Experience effortless creativity with our Smart Prompt Optimization feature." }
        ]
    },
    testimonials: {
        title: "What our users are saying",
        subtitle: "Don't just take our word for it — see how our platform has helped creators, businesses, and developers bring their projects to life with high-quality AI visuals.",
        quotes: [
            "Using Text-to-Image has saved me countless hours. The multilingual support allows me to reach students around the world with high-quality visual content.",
            "Integrating the API into my app was seamless, and the image quality has impressed my users. Highly recommend it for developers!",
            "I absolutely love using this platform to seamlessly add unique and captivating images to my design presentations. It enhances the overall experience.",
            "The feature is a game-changer for accessibility. A whole new dimension to user experience.",
            "I've been using the Text-to-Image tool for user testing, and it has significantly improved the feedback process."
        ].map((quote, index) => ({ ...testimonialsData[index], quote }))
    },
    pricing: {
        title: "Affordable plans for every creator",
        subtitle: "Choose a plan that fits your needs. Whether you're a creator just starting out or a business seeking advanced features, we have the perfect plan for you.",
        compare: "Compare plans",
        compareSubtitle: "Choose your workspace plan according to your organisational plan",
        freePlan: "Free Plan",
        proPlan: "Pro Plan",
        enterprisePlan: "Enterprise Plan",
        choosePackage: "Choose package",
        popular: "Popular",
        features: [
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
        ]
    },
    faq: {
        title: "Have questions?",
        subtitle: "Have questions about how our Text-to-Image AI works? Find the answers to the most common inquiries below. If you don't see your question, feel free to reach out!",
        button: "View all questions",
        items: [
            { question: "What types of images can I create?", answer: "You can create a wide range of images, including illustrations, landscapes, portraits, and even abstract art. The possibilities are endless!" },
            { question: "Is there a limit to how many images I can generate?", answer: "The number of images you can generate depends on your chosen plan. Our free plan offers a limited number of generations, while our paid plans offer more generous limits or even unlimited generations." },
            { question: "Can I customize the style of the generated images?", answer: "Yes! Our platform offers various style presets and advanced options to customize the look and feel of your generated images to match your creative vision." },
            { question: "Are the images copyright-free?", answer: "Images generated under our paid plans are yours to use commercially, royalty-free. For the free plan, certain restrictions may apply. Please refer to our terms of service for details." },
            { question: "Does the AI support multiple languages?", answer: "Currently, our AI performs best with English prompts. However, we are continuously working on expanding our language support to cater to a global audience." },
            { question: "How long does it take to generate images?", answer: "Image generation time can vary from a few seconds to a minute, depending on the complexity of the prompt and the current server load. We strive to provide results as quickly as possible." },
        ]
    },
    footer: {
      description: "Streamline Operations, Boost Productivity, and Drive Innovation with Our All-in-One Platform",
      about: "About",
      aboutLinks: [
        { name: "About Us", page: "about" as Page }
      ],
      contact: "Contact",
      copyright: "© 2024 Mira. All rights reserved."
    },
    aboutPage: {
        title: "About Mira",
        subtitle: "Mira, a product of the Danma brand, positions itself as a bridge between artificial intelligence and human imagination. Our mission is to make digital creation intuitive and accessible to everyone, allowing each person to transform their ideas into unique works, without technical barriers. With Mira, art and technology merge to unleash everyone's creative potential.",
        missionTitle: "Our Mission",
        missionText: "Our mission is to empower creators with intuitive and powerful AI tools. We believe that technology should amplify imagination, not replace it. Mira is designed to be a partner in your creative journey, helping you bring your most ambitious ideas to life with unprecedented speed and quality.",
        teamTitle: "Our Team",
        teamText: "We are a diverse team of AI researchers, software engineers, and UX designers united by a passion for innovation. Based in Tokyo, we draw inspiration from both the city's technological advancement and its rich artistic heritage. We are dedicated to pushing the boundaries of what's possible in generative art while ensuring our platform is user-friendly and respects privacy.",
    },
    featurePages: {
        videoGenerator: {
            title: "AI Video Generator",
            subtitle: "Describe a scene, optionally add a source image, and watch it come to life. Create short, high-quality video clips.",
            promptLabel: "1. Describe your video (optional if image)",
            promptPlaceholder: "e.g., 'A neon hologram of a cat driving a sports car at top speed'",
            imageLabel: "2. Add an image (optional)",
            uploadFile: "Upload a file",
            uploadInstructions: "or drag & drop or paste",
            uploadHint: "PNG, JPG up to 4.5MB",
            imagePreview: "Image Preview",
            generateButton: "Generate Video",
            generatingButton: "Generating...",
            loadingRequest: "Sending request to the model...",
            loadingProgress: "Video generation in progress... This may take a few minutes.",
            loadingStatus: "Checking video status... Please wait.",
            loadingFinalizing: "Finalizing your video...",
            errorPrompt: "Please enter a prompt or upload an image to generate a video.",
            errorSize: "Image size is too large (max 4.5MB). Please upload a smaller file.",
            errorApiKey: "API key is not configured. Please check your setup.",
            errorDownload: "Failed to download video: {statusText}. Details: {errorBody}",
            errorGeneric: "An unknown error occurred during video generation.",
            resultsPlaceholder: "Your generated video will appear here.",
            resultsTitle: "Your Video is Ready!",
        },
        textToAudio: {
            title: "AI Audio Generator",
            subtitle: "Transform your text into lifelike speech. Select a voice, adjust the speed and pitch, and listen to your words.",
            textLabel: "Your Text",
            textPlaceholder: "Enter text here...",
            voiceLabel: "Voice",
            rateLabel: "Speed: {rate}x",
            pitchLabel: "Pitch: {pitch}",
            downloadHint: "To enable download, your browser will ask you to share this tab's audio. We do not capture your screen.",
            errorPermission: "Permission to capture audio was denied. To enable download, please allow sharing your tab's audio.",
            errorSpeech: "Speech error: {error}",
            errorText: "Please enter some text to speak.",
            generateButton: "Listen & Prepare Download",
            processingButton: "Processing... (Click to stop)",
            loadingVoices: "Loading voices...",
            downloadReady: "Ready to download!",
            downloadButton: "Download Audio",
        },
        backgroundRemover: {
            title: "AI Background Remover",
            subtitle: "Upload an image to automatically remove the background in seconds. Perfect for product photos, portraits, and more.",
            uploadLabel: "Upload Image",
            uploadFile: "Upload a file",
            uploadInstructions: "or drag and drop or paste",
            uploadHint: "PNG, JPG up to 4.5MB",
            preview: "Preview",
            removeButton: "Remove Background",
            processingButton: "Processing...",
            errorUpload: "Please upload an image first.",
            errorSize: "Image size is too large (max 4.5MB). Please upload a smaller file.",
            errorNoResponse: "The AI model did not return a valid response. Your request may have been blocked by safety filters.",
            errorNoImage: "Could not find an image in the model's response.",
            resultsPlaceholder: "Your processed image will appear here.",
            resultsTitle: "Result",
            downloadButton: "Download Image",
        },
        imageToPrompt: {
            title: "Image to Prompt Generator",
            subtitle: "Upload an image and let our AI analyze it to generate a detailed, creative text prompt.",
            uploadLabel: "Upload Image",
            uploadFile: "Upload a file",
            uploadInstructions: "or drag and drop or paste",
            uploadHint: "PNG, JPG up to 4.5MB",
            preview: "Image Preview",
            generateButton: "Generate Prompt",
            analyzingButton: "Analyzing...",
            errorUpload: "Please upload an image first.",
            errorSize: "Image size is too large (max 4.5MB). Please upload a smaller file.",
            resultsPlaceholder: "Your generated prompt will appear here.",
            resultsTitle: "Generated Prompt",
            copyButton: "Copy Prompt",
            copySuccess: "Prompt copied to clipboard!",
        },
        aiImageEditor: {
            title: "AI Image Editor",
            subtitle: "Upload one or more images, then describe how you want to combine or edit them. For example, you can merge concepts or transfer artistic styles.",
            uploadLabel: "1. Upload Image(s)",
            uploadFile: "Upload file(s)",
            uploadInstructions: "or drag & drop or paste",
            preview: "Image Preview",
            previews: "Image Previews",
            promptLabel: "2. Describe your edit",
            promptPlaceholder: "e.g., 'Merge these two images' or 'Apply the style of the second image to the first'",
            applyButton: "Apply Edit",
            editingButton: "Editing...",
            errorUpload: "Please upload at least one image.",
            errorPrompt: "Please enter an editing instruction.",
            errorSize: "Total image size is too large (max 4.5MB). Please upload smaller files.",
            errorNoResponse: "The AI model did not return a valid response. Your request may have been blocked by safety filters.",
            errorNoImage: "Could not find an image in the model's response.",
            resultsPlaceholder: "Upload an image and describe your edit.",
            resultsTitle: "Result",
            downloadButton: "Download",
        },
        creativeUpscaler: {
            title: "Creative AI Upscaler",
            subtitle: "Transform your low-resolution images into stunning, high-definition masterpieces with a single click.",
            uploadHint: "Click to upload or paste an image",
            uploadSelected: "{name} selected",
            fileTypes: "PNG, JPG up to 4.5MB",
            upscaleButton: "Upscale Image",
            upscalingButton: "Upscaling...",
            errorUpload: "Please upload an image first.",
            errorSize: "Image size is too large (max 4.5MB). Please upload a smaller file.",
            resultsPlaceholder: "The comparison will appear here.",
            originalTitle: "Original",
            resultTitle: "Upscaled Result",
            downloadButton: "Download Image",
            waiting: "Waiting for result...",
        }
    }
  },
  fr: {
    toolNavLinks: [
      { name: "Générateur Vidéo IA", page: "video-generator" },
      { name: "Générateur Audio IA", page: "text-to-audio" },
      { name: "Suppresseur d'arrière-plan", page: "background-remover" },
      { name: "Image vers Prompt", page: "image-to-prompt" },
      { name: "Éditeur d'images IA", page: "ai-image-editor" },
      { name: "Améliorateur créatif", page: "creative-upscaler" }
    ] as NavLink[],
    navLinks: ["Fonctionnalités", "Cas d'usage", "Témoignages", "Tarifs", "FAQ"],
    signIn: "Se connecter",
    hero: {
      speechRelease: "Lancement de la conversion de la parole !",
      getAccess: "Accès anticipé",
      title: "Transformez vos mots en <br /> visuels époustouflants",
      subtitle: "Que vous ayez besoin de concept art, de supports marketing ou de projets personnels, notre générateur de texte en image donne vie à votre imagination.",
      button: "Créer votre image",
      placeholder: "une dystopie cyberpunk avec un paysage urbain tentaculaire et détrempé par la pluie",
      error: "Veuillez entrer un prompt."
    },
    features: {
        title: "Découvrez les puissantes fonctionnalités de notre générateur IA",
        subtitle: "Notre générateur IA est doté d'une technologie de pointe pour des résultats exceptionnels. Que vous soyez designer, créateur de contenu ou propriétaire d'entreprise, ces fonctionnalités sublimeront votre processus créatif.",
        cards: {
            video_generator: {
                title: "Générateur Vidéo IA",
                description: "Créez de courtes séquences vidéo de haute qualité à partir d'une simple description textuelle. Parfait pour les réseaux sociaux, les publicités ou les concepts animés."
            },
            text_to_audio: {
                title: "Générateur Audio IA",
                description: "Transformez du texte en parole vivante. Choisissez parmi diverses voix, ajustez la vitesse et le ton, et donnez vie à vos mots."
            },
            remover: {
                title: "Suppresseur d'arrière-plan",
                description: "Supprimez sans effort les arrière-plans d'images en quelques secondes grâce à notre technologie IA avancée. Parfait pour créer des visuels saisissants, des présentations professionnelles ou des photos de produits e-commerce."
            },
            image_to_prompt: {
                title: "Image vers Prompt",
                description: "Téléchargez une image et laissez notre IA l'analyser pour générer un prompt textuel détaillé et créatif. Découvrez la magie derrière l'art."
            },
            style_transfer: {
                title: "Transfert de Style IA",
                description: "Appliquez le style artistique d'une image à une autre. Transformez vos photos en œuvres d'art dans le style de peintres célèbres ou de designs abstraits."
            },
            upscaler: {
                title: "Améliorateur créatif",
                description: "Du flou au magnifique : Notre améliorateur créatif alimenté par l'IA transforme instantanément les images de basse qualité en chefs-d'œuvre nets et en haute définition."
            }
        }
    },
    useCases: {
        title: "Des possibilités infinies avec l'art de l'IA",
        items: [
          { title: "Marketing et Publicité", description: "Créez des visuels accrocheurs pour vos campagnes en quelques secondes." },
          { title: "Créateurs de contenu", description: "Améliorez vos vidéos, blogs ou médias sociaux avec un art unique." },
          { title: "Extension Chrome", description: "Passez au niveau supérieur de votre créativité avec notre extension Chrome." },
          { title: "Inspiration de conception", description: "Utilisez les images générées par l'IA comme point de départ pour vos projets créatifs." },
          { title: "Plusieurs modèles de sortie", description: "Notre plateforme donne accès à plusieurs modèles d'IA, chacun adapté à des besoins créatifs différents." },
          { title: "Optimisation intelligente des prompts", description: "Faites l'expérience d'une créativité sans effort avec notre fonction d'optimisation intelligente des prompts." }
        ]
    },
    testimonials: {
        title: "Ce que disent nos utilisateurs",
        subtitle: "Ne nous croyez pas sur parole — découvrez comment notre plateforme a aidé des créateurs, des entreprises et des développeurs à donner vie à leurs projets avec des visuels IA de haute qualité.",
        quotes: [
            "Utiliser Text-to-Image m'a fait gagner un temps précieux. Le support multilingue me permet de toucher des étudiants du monde entier avec un contenu visuel de haute qualité.",
            "L'intégration de l'API dans mon application s'est faite sans problème, et la qualité des images a impressionné mes utilisateurs. Je le recommande vivement aux développeurs !",
            "J'adore utiliser cette plateforme pour ajouter de manière transparente des images uniques et captivantes à mes présentations de design. Cela améliore l'expérience globale.",
            "Cette fonctionnalité change la donne en matière d'accessibilité. Une toute nouvelle dimension à l'expérience utilisateur.",
            "J'utilise l'outil Text-to-Image pour les tests utilisateurs, et il a considérablement amélioré le processus de feedback."
        ].map((quote, index) => ({ ...testimonialsData[index], quote }))
    },
    pricing: {
        title: "Des forfaits abordables pour chaque créateur",
        subtitle: "Choisissez un forfait qui correspond à vos besoins. Que vous soyez un créateur débutant ou une entreprise recherchant des fonctionnalités avancées, nous avons le forfait parfait pour vous.",
        compare: "Comparer les forfaits",
        compareSubtitle: "Choisissez votre forfait d'espace de travail en fonction de votre plan organisationnel",
        freePlan: "Forfait Gratuit",
        proPlan: "Forfait Pro",
        enterprisePlan: "Forfait Entreprise",
        choosePackage: "Choisir le forfait",
        popular: "Populaire",
        features: [
            { name: "Générations", free: "5 images/mois", pro: "50 images/mois", enterprise: "Illimité" },
            { name: "Styles", free: "Styles de base", pro: "Tous les styles Premium", enterprise: "Tous les styles et modèles avancés" },
            { name: "Résolution", free: "Basse résolution", pro: "Haute résolution", enterprise: "Résolutions personnalisées" },
            { name: "Support client 24/7", free: true, pro: true, enterprise: true },
            { name: "Personnalisation", free: "Limitée", pro: "Personnalisation complète", enterprise: "Options de marque blanche complètes" },
            { name: "Accès API", free: false, pro: false, enterprise: true },
            { name: "Extension Chrome", free: false, pro: true, enterprise: true },
            { name: "Plusieurs modèles de sortie", free: false, pro: true, enterprise: true },
            { name: "Optimisation intelligente des prompts", free: false, pro: true, enterprise: true },
            { name: "Collaboration d'équipe", free: false, pro: false, enterprise: true },
        ]
    },
    faq: {
        title: "Vous avez des questions ?",
        subtitle: "Vous avez des questions sur le fonctionnement de notre IA Text-to-Image ? Trouvez les réponses aux questions les plus fréquentes ci-dessous. Si vous ne trouvez pas votre question, n'hésitez pas à nous contacter !",
        button: "Voir toutes les questions",
        items: [
            { question: "Quels types d'images puis-je créer ?", answer: "Vous pouvez créer une large gamme d'images, y compris des illustrations, des paysages, des portraits et même de l'art abstrait. Les possibilités sont infinies !" },
            { question: "Y a-t-il une limite au nombre d'images que je peux générer ?", answer: "Le nombre d'images que vous pouvez générer dépend du forfait que vous avez choisi. Notre forfait gratuit offre un nombre limité de générations, tandis que nos forfaits payants offrent des limites plus généreuses, voire des générations illimitées." },
            { question: "Puis-je personnaliser le style des images générées ?", answer: "Oui ! Notre plateforme offre divers préréglages de style et des options avancées pour personnaliser l'apparence de vos images générées afin qu'elles correspondent à votre vision créative." },
            { question: "Les images sont-elles libres de droits ?", answer: "Les images générées dans le cadre de nos forfaits payants sont à vous pour un usage commercial, sans redevance. Pour le forfait gratuit, certaines restrictions peuvent s'appliquer. Veuillez consulter nos conditions d'utilisation pour plus de détails." },
            { question: "L'IA prend-elle en charge plusieurs langues ?", answer: "Actuellement, notre IA fonctionne mieux avec des prompts en anglais. Cependant, nous travaillons continuellement à étendre notre support linguistique pour répondre à un public mondial." },
            { question: "Combien de temps faut-il pour générer des images ?", answer: "Le temps de génération d'une image peut varier de quelques secondes à une minute, en fonction de la complexité du prompt et de la charge actuelle du serveur. Nous nous efforçons de fournir des résultats le plus rapidement possible." },
        ]
    },
    footer: {
      description: "Rationalisez les opérations, augmentez la productivité et stimulez l'innovation avec notre plateforme tout-en-un.",
      about: "À propos",
      aboutLinks: [
        { name: "Qui sommes-nous ?", page: "about" as Page }
      ],
      contact: "Contact",
      copyright: "© 2024 Mira. Tous droits réservés."
    },
    aboutPage: {
        title: "À propos de Mira",
        subtitle: "Mira, produit de la marque Danma, se positionne comme un pont entre l’intelligence artificielle et l’imagination humaine. Notre mission est de rendre la création numérique intuitive et accessible à tous, en permettant à chacun de transformer ses idées en œuvres uniques, sans barrières techniques. Avec Mira, l’art et la technologie fusionnent pour libérer le potentiel créatif de tous.",
        missionTitle: "Notre Mission",
        missionText: "Notre mission est de doter les créateurs d'outils d'IA intuitifs et puissants. Nous croyons que la technologie doit amplifier l'imagination, et non la remplacer. Mira est conçu pour être un partenaire dans votre parcours créatif, vous aidant à donner vie à vos idées les plus ambitieuses avec une rapidité et une qualité sans précédent.",
        teamTitle: "Notre Équipe",
        teamText: "Nous sommes une équipe diversifiée de chercheurs en IA, d'ingénieurs logiciels et de designers UX unis par une passion pour l'innovation. Basés à Tokyo, nous nous inspirons à la fois de l'avancement technologique de la ville et de son riche héritage artistique. Nous nous consacrons à repousser les limites du possible dans l'art génératif tout en garantissant que notre plateforme est conviviale et respectueuse de la vie privée.",
    },
    featurePages: {
        videoGenerator: {
            title: "Générateur de Vidéo IA",
            subtitle: "Décrivez une scène, ajoutez éventuellement une image source, et regardez-la prendre vie. Créez de courtes séquences vidéo de haute qualité.",
            promptLabel: "1. Décrivez votre vidéo (optionnel si image)",
            promptPlaceholder: "ex: 'Un hologramme néon d'un chat conduisant une voiture de sport à toute vitesse'",
            imageLabel: "2. Ajoutez une image (optionnel)",
            uploadFile: "Télécharger un fichier",
            uploadInstructions: "ou glisser-déposer ou coller",
            uploadHint: "PNG, JPG jusqu'à 4.5Mo",
            imagePreview: "Aperçu de l'image",
            generateButton: "Générer la vidéo",
            generatingButton: "Génération...",
            loadingRequest: "Envoi de la requête au modèle...",
            loadingProgress: "Génération de la vidéo en cours... Cela peut prendre quelques minutes.",
            loadingStatus: "Vérification du statut de la vidéo... Veuillez patienter.",
            loadingFinalizing: "Finalisation de votre vidéo...",
            errorPrompt: "Veuillez entrer un prompt ou télécharger une image pour générer une vidéo.",
            errorSize: "La taille de l'image est trop grande (max 4.5Mo). Veuillez télécharger un fichier plus petit.",
            errorApiKey: "La clé API n'est pas configurée. Veuillez vérifier votre configuration.",
            errorDownload: "Échec du téléchargement de la vidéo : {statusText}. Détails : {errorBody}",
            errorGeneric: "Une erreur inconnue est survenue lors de la génération de la vidéo.",
            resultsPlaceholder: "Votre vidéo générée apparaîtra ici.",
            resultsTitle: "Votre Vidéo est Prête !",
        },
        textToAudio: {
            title: "Générateur Audio IA",
            subtitle: "Transformez votre texte en parole vivante. Choisissez une voix, ajustez la vitesse et le ton, et écoutez vos mots.",
            textLabel: "Votre Texte",
            textPlaceholder: "Écrivez quelque chose ici...",
            voiceLabel: "Voix",
            rateLabel: "Vitesse : {rate}x",
            pitchLabel: "Ton : {pitch}",
            downloadHint: "Pour activer le téléchargement, votre navigateur vous demandera de partager l'audio de cet onglet. Nous ne capturons pas votre écran.",
            errorPermission: "La permission de capturer l'audio a été refusée. Pour activer le téléchargement, veuillez autoriser le partage de l'audio de votre onglet.",
            errorSpeech: "Erreur de synthèse vocale : {error}",
            errorText: "Veuillez entrer du texte à vocaliser.",
            generateButton: "Écouter et Préparer le Téléchargement",
            processingButton: "En cours... (Cliquer pour arrêter)",
            loadingVoices: "Chargement des voix...",
            downloadReady: "Prêt à télécharger !",
            downloadButton: "Télécharger l'audio",
        },
        backgroundRemover: {
            title: "Suppresseur d'Arrière-plan IA",
            subtitle: "Téléchargez une image pour supprimer automatiquement l'arrière-plan en quelques secondes. Parfait pour les photos de produits, les portraits, et plus encore.",
            uploadLabel: "Télécharger une Image",
            uploadFile: "Télécharger un fichier",
            uploadInstructions: "ou glisser-déposer ou coller",
            uploadHint: "PNG, JPG jusqu'à 4.5Mo",
            preview: "Aperçu",
            removeButton: "Supprimer l'arrière-plan",
            processingButton: "Traitement en cours...",
            errorUpload: "Veuillez d'abord télécharger une image.",
            errorSize: "La taille de l'image est trop grande (max 4.5Mo). Veuillez télécharger un fichier plus petit.",
            errorNoResponse: "Le modèle IA n'a pas renvoyé de réponse valide. Votre requête a peut-être été bloquée par les filtres de sécurité.",
            errorNoImage: "Impossible de trouver une image dans la réponse du modèle.",
            resultsPlaceholder: "Votre image traitée apparaîtra ici.",
            resultsTitle: "Résultat",
            downloadButton: "Télécharger l'Image",
        },
        imageToPrompt: {
            title: "Générateur d'Image vers Prompt",
            subtitle: "Téléchargez une image et laissez notre IA l'analyser pour générer un prompt textuel détaillé et créatif.",
            uploadLabel: "Télécharger une Image",
            uploadFile: "Télécharger un fichier",
            uploadInstructions: "ou glisser-déposer ou coller",
            uploadHint: "PNG, JPG jusqu'à 4.5Mo",
            preview: "Aperçu de l'image",
            generateButton: "Générer le Prompt",
            analyzingButton: "Analyse en cours...",
            errorUpload: "Veuillez d'abord télécharger une image.",
            errorSize: "La taille de l'image est trop grande (max 4.5Mo). Veuillez télécharger un fichier plus petit.",
            resultsPlaceholder: "Votre prompt généré apparaîtra ici.",
            resultsTitle: "Prompt Généré",
            copyButton: "Copier le Prompt",
            copySuccess: "Prompt copié dans le presse-papiers !",
        },
        aiImageEditor: {
            title: "Éditeur d'Images IA",
            subtitle: "Téléchargez une ou plusieurs images, puis décrivez comment vous souhaitez les combiner ou les modifier. Par exemple, vous pouvez fusionner des concepts ou transférer des styles artistiques.",
            uploadLabel: "1. Télécharger Image(s)",
            uploadFile: "Télécharger fichier(s)",
            uploadInstructions: "ou glisser-déposer ou coller",
            preview: "Aperçu de l'image",
            previews: "Aperçus des images",
            promptLabel: "2. Décrivez votre modification",
            promptPlaceholder: "ex: 'Mélange ces deux images' ou 'Applique le style de la deuxième image à la première'",
            applyButton: "Appliquer",
            editingButton: "Édition en cours...",
            errorUpload: "Veuillez télécharger au moins une image.",
            errorPrompt: "Veuillez entrer une instruction de modification.",
            errorSize: "La taille totale des images est trop grande (max 4.5Mo). Veuillez télécharger des fichiers plus petits.",
            errorNoResponse: "Le modèle IA n'a pas renvoyé de réponse valide. Votre requête a peut-être été bloquée par les filtres de sécurité.",
            errorNoImage: "Impossible de trouver une image dans la réponse du modèle.",
            resultsPlaceholder: "Téléchargez une image et décrivez votre modification.",
            resultsTitle: "Résultat",
            downloadButton: "Télécharger",
        },
        creativeUpscaler: {
            title: "Améliorateur Créatif IA",
            subtitle: "Transformez vos images de basse résolution en chefs-d'œuvre éblouissants et en haute définition en un seul clic.",
            uploadHint: "Cliquez pour télécharger ou coller une image",
            uploadSelected: "{name} sélectionné",
            fileTypes: "PNG, JPG jusqu'à 4.5Mo",
            upscaleButton: "Améliorer l'Image",
            upscalingButton: "Amélioration en cours...",
            errorUpload: "Veuillez d'abord télécharger une image.",
            errorSize: "La taille de l'image est trop grande (max 4.5Mo). Veuillez télécharger un fichier plus petit.",
            resultsPlaceholder: "La comparaison apparaîtra ici.",
            originalTitle: "Original",
            resultTitle: "Résultat Amélioré",
            downloadButton: "Télécharger l'Image",
            waiting: "En attente du résultat...",
        }
    }
  }
};

export const USE_CASE_ICONS = [
    <IconMarketing />,
    <IconContentCreators />,
    <IconChrome />,
    <IconDesign />,
    <IconModels />,
    <IconPrompt />,
];

export const TOOL_ICONS: Record<Page, React.ReactNode> = {
    'video-generator': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    'text-to-audio': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>,
    'background-remover': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /><path strokeLinecap="round" strokeLinejoin="round" d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z" opacity="0.3" /></svg>,
    'image-to-prompt': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11h.01" /></svg>,
    'ai-image-editor': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>,
    'creative-upscaler': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" /></svg>,
    'home': <></>,
    'about': <></>
};