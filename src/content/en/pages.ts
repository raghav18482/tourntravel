import type {
  AboutContent,
  ContactContent,
  DestinationsPageContent,
  FeedbackContent,
  GalleryContent,
  HomeContent,
  LegalContent,
} from "../types";

export const home: HomeContent = {
  seo: {
    title: "Deepak Tour & Travel | Rishikesh, Manali & Rajasthan Tours",
    description:
      "Custom tour packages for Rishikesh, Uttarakhand, Himachal, Manali, Rajasthan and Mathura Vrindavan, planned with Deepak Swami. Enquire on WhatsApp.",
  },
  hero: {
    eyebrow: "Personal trip planning across North India",
    h1: "Tour packages planned around you, across North India",
    subheading:
      "Custom trips to Uttarakhand, Himachal Pradesh, Manali, Rajasthan and Mathura Vrindavan, planned with Deepak Swami. Share your dates on WhatsApp and get a day-by-day plan you can tweak before you book.",
    image: "homeHero",
    points: ["Custom itineraries", "Transparent pricing", "Quick WhatsApp replies"],
  },
  featured: {
    eyebrow: "Newly launched",
    heading: "Rishikesh in 6 days: yoga, aarti, waterfalls and a night under the stars",
    body: "Our new Rishikesh package goes beyond the usual checklist, with yoga every morning, Ganga Aarti at the special ghats, offbeat waterfalls, a Himalayan sunrise and a trek with camping.",
    bullets: [
      "Morning yoga with a trainer certified by Patanjali University",
      "Ganga Aarti at the special ghats",
      "Waterfalls, a trek and a night of camping",
      "Kunjapuri sunrise over the Himalayas",
    ],
    image: "rishikeshMorningYoga",
  },
  destinations: {
    eyebrow: "Where we travel",
    heading: "Choose your destination",
    intro:
      "Five regions we plan trips to, each with honest advice on the best places, when to go and how many days you'll need.",
  },
  whyUs: {
    eyebrow: "Why travel with us",
    heading: "A small agency with a big eye for detail",
    intro: "When you plan with us, you talk to the person who builds your trip, not a call centre.",
    points: [
      {
        icon: "compass",
        title: "Local expertise",
        body: "We know these routes, the right viewpoints and the best time to reach them, so your days are spent seeing, not waiting.",
      },
      {
        icon: "route",
        title: "Custom itineraries",
        body: "Every plan is built around your dates, pace and budget. Swap a city, add a rest day or upgrade a stay: it's your trip.",
      },
      {
        icon: "rupee",
        title: "Transparent pricing",
        body: "A clear quote showing what's included and what isn't, before you pay anything. No surprise add-ons on the road.",
      },
      {
        icon: "chat",
        title: "24/7 WhatsApp support", // VERIFY: confirm round-the-clock support is offered
        body: "From your first question to the drive home, we're a message away whenever you need us.",
      },
      {
        icon: "shield",
        title: "Trusted stays & transport", // VERIFY
        body: "We work with hotels, camps and drivers we know, and share their details with you before you travel.",
      },
      {
        icon: "users",
        title: "Families, couples & groups",
        body: "Gentle pacing for elderly parents, fun for children, and good-value plans for friends travelling together.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Traveller stories",
    heading: "What our travellers say",
    intro: "Real feedback from people who have travelled with us.",
  },
  gallery: {
    eyebrow: "On the road",
    heading: "Moments from our trips",
    intro: "Follow us on Instagram for new routes, offers and photos from the road.",
    images: [
      "rishikeshGangaAarti",
      "manaliSolang",
      "rajasthanJaisalmer",
      "mathuraPremMandir",
      "uttarakhandPeaks",
      "himachalDharamshala",
    ],
  },
  faqs: {
    heading: "Questions before you plan",
    items: [
      {
        question: "How do I book a trip with Deepak Tour & Travel?",
        answer:
          "Message us on WhatsApp or fill in the enquiry form with your destination, dates and number of travellers. We'll reply with a day-by-day plan and a clear quote, and confirm the booking once you're happy with it.",
      },
      {
        question: "Can you customise a package for my family or group?",
        answer:
          "Yes, every trip is customised. Tell us who's travelling, your budget and the kind of stays you like, and we'll shape the itinerary around you.",
      },
      {
        question: "Do your packages include hotels and transport?",
        answer:
          "Your quote lists exactly what's included, typically stays, local transport and sightseeing. If you'd rather book some parts yourself, we can plan around that too.", // VERIFY
      },
      {
        question: "Which destinations do you cover?",
        answer:
          "We plan trips across Uttarakhand (including our Rishikesh package), Himachal Pradesh and Manali, Rajasthan, and Mathura Vrindavan. If you have another destination in mind, just ask us on WhatsApp.",
      },
      {
        question: "How quickly will you reply?",
        answer: "We aim to reply on WhatsApp the same day, and usually much sooner.", // VERIFY
      },
    ],
  },
  cta: {
    heading: "Ready to plan your next trip?",
    body: "Tell us where you'd like to go and when. We'll send a day-by-day plan on WhatsApp.",
  },
};

export const destinationsPage: DestinationsPageContent = {
  seo: {
    title: "Tour Destinations | Uttarakhand, Himachal, Rajasthan & More",
    description:
      "Explore Rishikesh and Uttarakhand, Himachal and Manali, Rajasthan, and Mathura Vrindavan, with the best places, seasons and trip lengths for each.",
  },
  h1: "Our Destinations",
  intro:
    "From the Ganga at Rishikesh to the dunes of Jaisalmer, these are the regions we plan trips to. Each guide covers the top places, the best time to go and how many days you'll need, so you can start planning with confidence.",
  regionsHeading: "Explore by region",
  howItWorks: {
    heading: "How planning works",
    steps: [
      {
        title: "Share your idea",
        body: "Tell us the destination, dates and who's travelling, on WhatsApp or through the enquiry form.",
      },
      {
        title: "Get a day-by-day plan",
        body: "We send a clear itinerary with stays, transport and a transparent quote.",
      },
      {
        title: "Tweak & confirm",
        body: "Change anything you like. When it feels right, we confirm the booking and stay in touch throughout your trip.",
      },
    ],
  },
  faqs: [
    {
      question: "Which destination is best for a first trip to North India?",
      answer:
        "If you love culture and food, Rajasthan is hard to beat. For mountains and snow, choose Himachal or Manali. For spirituality and nature together, Rishikesh and Uttarakhand are perfect, and Mathura Vrindavan is ideal for a short pilgrimage.",
    },
    {
      question: "Can I combine two destinations in one trip?",
      answer:
        "Yes. Popular combinations include Rishikesh with Mussoorie, Shimla with Manali, and Mathura Vrindavan with Agra or Jaipur. We'll suggest a route that keeps travel time sensible.",
    },
  ],
};

// TO CONFIRM: personalise the story and founder paragraphs with Deepak's own background.
export const about: AboutContent = {
  seo: {
    title: "About Deepak Tour & Travel | Meet Deepak Swami",
    description:
      "Meet Deepak Swami, founder of Deepak Tour & Travel, and see how we plan honest, personal trips to Rishikesh, the Himalaya, Rajasthan and Mathura Vrindavan.",
  },
  h1: "About Deepak Tour & Travel",
  intro: "A small, personal travel company that plans every trip the way we'd plan one for our own family.",
  story: {
    heading: "Our story",
    paragraphs: [
      "Deepak Tour & Travel was started by Deepak Swami with a simple belief: a good trip comes from honest advice and a plan built around the people travelling, not from a one-size-fits-all package.",
      "Today we plan trips across Uttarakhand, Himachal Pradesh, Manali, Rajasthan and Mathura Vrindavan for families, couples, friends and solo travellers. We'd love every traveller to come home and tell their friends about us, so we put the same care into every enquiry, big or small.",
      "Our newest trip, the six-day Rishikesh package, brings together everything we love about the town: morning yoga, Ganga Aarti at the special ghats, hidden waterfalls and a night of camping under the stars.",
    ],
  },
  owner: {
    heading: "Meet the founder",
    name: "Deepak Swami",
    role: "Founder & trip planner",
    paragraphs: [
      "Deepak looks after enquiries personally, from the first WhatsApp message to the moment you're home. He knows the roads, the viewpoints and the people who make a trip run smoothly, and he's always happy to talk through your plans.",
      "Have a question before you decide? Send him a message. There's no obligation, and you'll get a straight answer.",
    ],
    image: "ownerPortrait",
  },
  // VERIFY: seating capacity, AC and whether this vehicle is owned or hired before launch.
  vehicle: {
    heading: "Travel in comfort",
    paragraphs: [
      "Many of our trips run in this tourist van, with individual high-back seats and curtains for the sunny stretches of road.",
      "Tell us your group size and dates on WhatsApp and we'll confirm the right vehicle for your trip.",
    ],
    photos: ["vanExterior", "vanInterior"],
  },
  values: {
    heading: "What we stand for",
    points: [
      {
        icon: "shield",
        title: "Honesty first",
        body: "Clear quotes, realistic plans and straight answers, even when that means telling you a route is too ambitious.",
      },
      {
        icon: "heart",
        title: "Personal care",
        body: "You talk to the person planning your trip, and we stay reachable throughout your journey.",
      },
      {
        icon: "mountain",
        title: "Love for the places",
        body: "We plan trips to places we genuinely love, and we want you to see their best side.",
      },
    ],
  },
};

export const gallery: GalleryContent = {
  seo: {
    title: "Travel Photo Gallery | Deepak Tour & Travel",
    description:
      "Photos from Rishikesh, Manali, Himachal, Rajasthan, Uttarakhand and Mathura Vrindavan. Browse by destination and get inspired for your next trip.",
  },
  h1: "Travel Gallery",
  intro:
    "A glimpse of the places we travel to. Filter by destination, tap any photo to see it larger, and message us when something catches your eye.",
  // Mixed order so each destination filter visibly changes the grid. A photo can sit under several filters
  // (Rishikesh photos also show under Uttarakhand, Manali photos under Himachal Pradesh).
  items: [
    { image: "rishikeshGangaAarti", tags: ["rishikesh-6-day-tour", "uttarakhand"] },
    { image: "manaliSolang", tags: ["manali", "himachal-pradesh"] },
    { image: "rajasthanJaisalmer", tags: ["rajasthan"] },
    { image: "uttarakhandPeaks", tags: ["uttarakhand"] },
    { image: "himachalKullu", tags: ["himachal-pradesh"] },
    { image: "mathuraPremMandir", tags: ["mathura-vrindavan"] },
    { image: "rishikeshMorningYoga", tags: ["rishikesh-6-day-tour", "uttarakhand"] },
    { image: "manaliHadimba", tags: ["manali", "himachal-pradesh"] },
    { image: "rajasthanAmerFort", tags: ["rajasthan"] },
    { image: "uttarakhandNainital", tags: ["uttarakhand"] },
    { image: "himachalSpiti", tags: ["himachal-pradesh"] },
    { image: "mathuraVishramGhat", tags: ["mathura-vrindavan"] },
    { image: "rishikeshKunjapuri", tags: ["rishikesh-6-day-tour", "uttarakhand"] },
    { image: "manaliOldManali", tags: ["manali", "himachal-pradesh"] },
    { image: "rajasthanUdaipur", tags: ["rajasthan"] },
    { image: "uttarakhandLaxmanJhula", tags: ["rishikesh-6-day-tour", "uttarakhand"] },
    { image: "himachalShimla", tags: ["himachal-pradesh"] },
    { image: "vrindavanBankeBihari", tags: ["mathura-vrindavan"] },
    { image: "rishikeshNeerGarh", tags: ["rishikesh-6-day-tour", "uttarakhand"] },
    { image: "manaliAtalTunnel", tags: ["manali", "himachal-pradesh"] },
    { image: "rajasthanJodhpur", tags: ["rajasthan"] },
    { image: "uttarakhandMussoorie", tags: ["uttarakhand"] },
    { image: "himachalDharamshala", tags: ["himachal-pradesh"] },
    { image: "mathuraHoli", tags: ["mathura-vrindavan"] },
    { image: "rishikeshCamping", tags: ["rishikesh-6-day-tour", "uttarakhand"] },
    { image: "rishikeshAncientTemple", tags: ["rishikesh-6-day-tour", "uttarakhand"] },
  ],
};

export const contact: ContactContent = {
  seo: {
    title: "Contact Deepak Tour & Travel | Call or WhatsApp",
    description:
      "Plan your trip with Deepak Tour & Travel. Call or WhatsApp +91 99285 45048, or send an enquiry with your destination, dates and number of travellers.",
  },
  h1: "Plan your trip with us",
  intro:
    "WhatsApp is the quickest way to reach us. Fill in the form and your details arrive as a ready-made WhatsApp message, or call us directly.",
  formHeading: "Trip enquiry",
  formIntro: "Takes under a minute. We'll reply on WhatsApp with a plan and a clear quote.",
  directHeading: "Talk to us directly",
  responseNote: "We aim to reply the same day.", // VERIFY
  mapHeading: "Find our office",
};

export const feedback: FeedbackContent = {
  seo: {
    title: "Share Your Trip Feedback | Deepak Tour & Travel",
    description:
      "Travelled with Deepak Tour & Travel? Share your rating and feedback. It helps us improve and helps other travellers plan with confidence.",
  },
  h1: "Share your feedback",
  intro:
    "Thank you for travelling with us. A few honest words help us improve every trip and help future travellers decide.",
  formHeading: "Your feedback",
  reviewPrompt: "Enjoyed your trip? A short review on Justdial helps other travellers find us.",
};

// TO CONFIRM: have this policy reviewed before launch; it is a plain-language draft, not legal advice.
export const privacy: LegalContent = {
  seo: {
    title: "Privacy Policy | Deepak Tour & Travel",
    description:
      "How Deepak Tour & Travel collects, uses and protects the information you share through our enquiry and feedback forms, WhatsApp and website analytics.",
  },
  h1: "Privacy Policy",
  updated: "15 October 2026",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "This website is operated by Deepak Tour & Travel, owned by Deepak Swami. If you have any questions about this policy, contact us on WhatsApp or by phone at +91 99285 45048.",
      ],
    },
    {
      heading: "Information we collect",
      paragraphs: [
        "When you send an enquiry or feedback, we collect what you choose to share: your name, phone number, email address, destination, travel dates, number of travellers, budget, rating and message.",
        "We never ask for card or bank details on this website.",
      ],
    },
    {
      heading: "How your enquiry reaches us",
      paragraphs: [
        "Our forms don't send messages on their own. When you submit a form, your details are placed into a WhatsApp message on your device, and it is only sent if you tap Send.",
        "So that no request is missed, a copy of the form details may also be saved to our private enquiry records when you submit the form.",
      ],
    },
    {
      heading: "How we use your information",
      paragraphs: [
        "We use your details only to reply to your enquiry, plan and manage your trip, and improve our service. If you give permission on the feedback form, we may publish your feedback with your first name and trip. We never sell your personal information.",
      ],
    },
    {
      heading: "Analytics and cookies",
      paragraphs: [
        "We may use Google Analytics to understand how visitors use the site, for example which pages are popular and how many people tap our WhatsApp or call buttons. Google Analytics uses cookies and collects information such as device type, browser and approximate location.",
        "You can block cookies in your browser settings or install Google's opt-out browser add-on.",
      ],
    },
    {
      heading: "Third-party services",
      paragraphs: [
        "WhatsApp, Google and any form-storage service we use process data under their own privacy policies. Links to Instagram, Facebook, Justdial and Google Maps take you to those services, which have their own policies.",
      ],
    },
    {
      heading: "How long we keep your data",
      paragraphs: [
        "We keep enquiry details only as long as needed to plan your trip and keep basic records, and delete them when they are no longer required.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        "You can ask us to show, correct or delete the personal information we hold about you at any time by contacting us on WhatsApp or by phone. If we've published your feedback and you'd like it removed, just let us know.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this policy from time to time. The latest version will always be on this page, with the date it was last updated.",
      ],
    },
  ],
};
