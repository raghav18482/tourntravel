import type { Destination } from "../../types";

export const himachalPradesh: Destination = {
  slug: "himachal-pradesh",
  name: "Himachal Pradesh",
  state: "Himachal Pradesh",
  seo: {
    title: "Himachal Tour Packages | Shimla, Manali, Dharamshala",
    description:
      "Custom Himachal Pradesh tour packages: Shimla, Manali, Dharamshala, Kasol and Spiti Valley. Honest routes, good stays and snow trips, planned on WhatsApp.",
  },
  h1: "Himachal Pradesh Tour Packages",
  heroTagline: "Snow valleys, apple orchards, monasteries and mountain cafés across the Himalaya.",
  cardSummary: "Shimla, Dharamshala, Kasol and Spiti, from easy family breaks to high-altitude road trips.",
  highlights: ["Shimla & Kufri", "Manali & Solang", "Dharamshala & McLeodganj", "Kasol & Parvati Valley", "Spiti Valley"],
  intro: [
    "Himachal Pradesh is where many Indians see snow for the first time, and where many come back again and again. The state stretches from the colonial hill town of Shimla to the cold desert of Spiti, with apple orchards, deodar forests, Tibetan monasteries and riverside cafés in between. Whether you want an easy family holiday, a honeymoon with mountain views or a high-altitude road trip, there's a version of Himachal that fits.",
    "Distances look short on a map, but mountain roads are slow, so a good Himachal trip is built around a few well-chosen bases. The classic first route links Shimla and Manali through the Kullu valley, usually around eight hours apart by road. Dharamshala and McLeodganj, home of the Dalai Lama, sit further west in the Kangra valley and pair beautifully with Dalhousie or Bir Billing, India's paragliding capital. The Parvati valley around Kasol draws backpackers and trekkers, while Spiti, beyond the high passes, is a world of its own that deserves a full week.",
    "We build Himachal itineraries around the season, road conditions and the kind of trip you want. In winter that means planning for snow closures and keeping a buffer day; in summer it means beating the crowds at Solang and Rohtang with early starts and the right permits. We choose hotels for their views and location, not just their price, and we're upfront about long driving days so there are no surprises on the road. For a first visit, we usually suggest no more than two or three bases in a week, so you spend your time in the mountains rather than in the car.",
    "If Manali is your main focus, our dedicated Manali guide covers Solang Valley, the Atal Tunnel and Sissu, Old Manali and more. Otherwise, tell us your dates, starting city and travel style on WhatsApp, and we'll suggest a route that makes the most of your days in the mountains.",
  ],
  places: [
    {
      name: "Shimla",
      description:
        "The former summer capital of British India. Walk the Ridge and Mall Road, ride the UNESCO-listed Kalka–Shimla toy train, and take a day trip to Kufri or Narkanda for snow in winter.",
    },
    {
      name: "Manali",
      description:
        "Snow at Solang, the Atal Tunnel to Sissu, cafés in Old Manali and the Hadimba temple. Manali has so much to offer that it has its own guide.",
    },
    {
      name: "Dharamshala & McLeodganj",
      description:
        "Home of the Dalai Lama and the Tibetan community in exile. Visit the Tsuglagkhang complex, walk to Bhagsu waterfall and trek to Triund for sunset over the Dhauladhar range.",
    },
    {
      name: "Kasol & the Parvati Valley",
      description:
        "A laid-back riverside village with cafés, easy walks to Chalal and the trek to the hot springs at Kheerganga. Manikaran Sahib, with its own hot springs, is just a few kilometres away.",
    },
    {
      name: "Kullu valley",
      description:
        "The Beas river valley between Mandi and Manali, known for river rafting, handwoven Kullu shawls, apple orchards and the week-long Kullu Dussehra festival in October.",
    },
    {
      name: "Dalhousie & Khajjiar",
      description:
        "Pine-covered hills, colonial churches and Khajjiar's wide meadow, often called India's “Mini Switzerland”. A calm, family-friendly add-on to Dharamshala.",
    },
    {
      name: "Spiti Valley",
      description:
        "A high-altitude cold desert with ancient monasteries at Key, Tabo and Dhankar, fossil villages like Langza, and night skies full of stars. Best visited from June to September.",
    },
  ],
  bestTime: {
    summary:
      "March to June is ideal for sightseeing and road trips, October and November bring clear skies, and December to February is the season for snow. Avoid July and August if you can, when monsoon landslides affect mountain roads.",
    seasons: [
      {
        name: "Spring & summer",
        months: "March – June",
        description:
          "Pleasant days, blooming orchards and open roads. Peak season for Shimla and Manali, so book hotels early, especially for May and June.",
        recommended: true,
      },
      {
        name: "Monsoon",
        months: "July – August",
        description:
          "Green valleys but frequent landslides and road closures. It is, however, the best time for Spiti and Lahaul, which sit in the rain shadow.",
      },
      {
        name: "Autumn",
        months: "September – November",
        description:
          "Crisp air, clear mountain views and fewer crowds. Excellent for Dharamshala, Kasol and road trips.",
        recommended: true,
      },
      {
        name: "Winter",
        months: "December – February",
        description:
          "Snow in Shimla, Kufri, Manali and Solang. Some high passes close and you'll need warm clothing, but it's the season for snow lovers and honeymooners.",
      },
    ],
  },
  durations: [
    {
      days: "4–5 days",
      title: "Shimla & Kufri",
      route: "Chandigarh → Shimla → Kufri",
      summary: "A relaxed hill-station holiday with the toy train and, in winter, a day in the snow.",
    },
    {
      days: "6–7 days",
      title: "Shimla–Manali",
      route: "Shimla → Kullu → Manali",
      summary: "The classic Himachal circuit, with Solang Valley and the Atal Tunnel.",
    },
    {
      days: "8–10 days",
      title: "Himachal Grand Tour",
      route: "Dharamshala → Manali → Shimla",
      summary: "Monasteries, mountain cafés and snow valleys across three regions.",
    },
  ],
  subSection: {
    heading: "Planning a Manali trip?",
    body: [
      "Manali is Himachal's most popular destination and deserves a few days of its own. Solang Valley is the snow and adventure hub, the Atal Tunnel puts Sissu and the Lahaul valley within easy reach, and Old Manali's cafés are made for slow mornings.",
      "Our Manali guide covers the top places, the best months for snow, Rohtang permits and suggested itineraries from three to six days.",
    ],
    linkLabel: "Read the Manali travel guide",
    linkSlug: "manali",
  },
  faqs: [
    {
      question: "Shimla or Manali: which should I choose?",
      answer:
        "Shimla is easier to reach and great for a relaxed family break with colonial charm. Manali has more adventure, bigger snow landscapes and access to Solang and the Atal Tunnel. With six or seven days, you can comfortably do both.",
    },
    {
      question: "How do I reach Himachal Pradesh?",
      answer:
        "Most trips start from Delhi or Chandigarh. Overnight Volvo buses and private cabs reach Shimla and Manali, and there are small airports at Shimla, Bhuntar (for Kullu and Manali) and Gaggal (for Dharamshala), though flights are limited and weather-dependent.",
    },
    {
      question: "Do I need a permit for Spiti or Rohtang Pass?",
      answer:
        "Vehicles visiting Rohtang Pass need an online permit, which has a daily limit. Indian travellers don't need a permit for Spiti, but foreign nationals need an Inner Line Permit for the stretch near the border. We take care of these details while planning.",
    },
    {
      question: "Is Himachal good for a honeymoon?",
      answer:
        "Very much so. Manali, Shimla, Dharamshala and Dalhousie all have cosy stays with mountain views, and winter brings snow for that classic honeymoon photo. We can plan private cabs, slower days and stays with a view.",
    },
    {
      question: "What should I pack for Himachal?",
      answer:
        "In summer, carry light layers plus a fleece or light jacket for the evenings. From November to February, pack thermals, a heavy jacket, gloves, a woollen cap and waterproof shoes for snow. Sunglasses and sunscreen are essential at altitude in every season.",
    },
  ],
  related: ["manali", "uttarakhand", "rajasthan"],
  geo: { latitude: 31.1048, longitude: 77.1734 },
  images: {
    hero: "himachalKullu",
    gallery: ["himachalShimla", "himachalDharamshala", "himachalSpiti"],
  },
};
