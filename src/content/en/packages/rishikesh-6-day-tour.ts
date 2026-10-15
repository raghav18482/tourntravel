import type { TourPackage } from "../../types";

export const rishikesh6DayTour: TourPackage = {
  slug: "rishikesh-6-day-tour",
  name: "Rishikesh 6-Day Package",
  shortName: "Rishikesh 6 Days",
  badge: "Newly Launched",
  destination: "uttarakhand",
  location: "Rishikesh, Uttarakhand",
  seo: {
    title: "Rishikesh Tour Package 6 Days | Yoga, Camping & Ganga Aarti",
    description:
      "6-day Rishikesh tour package with daily yoga, Ganga Aarti, waterfalls, a trek with camping, Kunjapuri sunrise and hidden spots. Enquire on WhatsApp.",
  },
  h1: "Rishikesh 6-Day Tour Package",
  tagline: "Yoga every morning, Ganga Aarti in the evenings, and the Rishikesh most visitors never see.",
  heroHighlights: ["6 days / 5 nights", "Daily yoga with a certified trainer", "A night of camping"],
  cardSummary: "Daily yoga, Ganga Aarti at the special ghats, waterfalls, a trek with camping and hidden spots.",
  overview: [
    "This is Rishikesh the way we love it: not a rushed checklist, but six unhurried days that move between riverside mornings, forest waterfalls, Himalayan viewpoints and evenings by the Ganga. Every morning begins with a yoga session led by a yoga trainer certified by Patanjali University, and most evenings end with an aarti at one of the special ghats.",
    "Alongside the famous spots, we take you to hidden and offbeat corners of Rishikesh, less-crowded waterfalls where you can actually get a good photo, and the view-point cafés we'd recommend to our own family. There's a day trek with a night of camping and a bonfire, a sunrise over the Himalayan range from Kunjapuri, and visits to the area's most special ancient temples.",
    "The trip suits friends, couples, solo travellers and small groups who want a mix of calm and adventure. Tell us your dates on WhatsApp and we'll confirm availability, stay options and the final plan.",
  ],
  durationDays: 6,
  durationNights: 5, // VERIFY: 6 days / 5 nights
  price: {
    amount: null, // TO CONFIRM: starting price per person in ₹ (leave null to show "Price on request")
    currency: "INR",
    unit: "per person",
    onRequestLabel: "Price on request",
  },
  facts: [
    { label: "Duration", value: "6 days / 5 nights", fallback: "6 days" },
    { label: "Pickup & drop", value: null, fallback: "Confirmed on enquiry" }, // TO CONFIRM: pickup/drop point
    { label: "Stay", value: null, fallback: "Confirmed on enquiry" }, // TO CONFIRM: stay type (hotel / hostel / camp)
    { label: "Meals", value: null, fallback: "Confirmed on enquiry" }, // TO CONFIRM: which meals are included
    { label: "Group size", value: null, fallback: "Confirmed on enquiry" }, // TO CONFIRM: min / max group size
    { label: "Cancellation", value: null, fallback: "Shared before booking" }, // TO CONFIRM: cancellation policy
  ],
  days: [
    {
      day: 1,
      title: "Arrival & First Aarti",
      summary:
        "Arrive in Rishikesh, check in and settle in. As the sun sets, join the evening Ganga Aarti at Triveni Ghat, then dinner at a riverside view-point café.",
      activities: [
        "Arrival and check-in",
        "Settle in and explore the neighbourhood",
        "Evening Ganga Aarti at Triveni Ghat",
        "Dinner at a riverside view-point café",
      ],
      image: "rishikeshTriveniGhat",
    },
    {
      day: 2,
      title: "Sunrise & Himalayas",
      summary:
        "Morning yoga and an early drive to Kunjapuri hilltop for sunrise over the Himalayan range, then the hidden side of Rishikesh and the evening aarti at Parmarth Niketan.",
      activities: [
        "Morning yoga session with a yoga trainer certified by Patanjali University",
        "Early drive to Kunjapuri hilltop for sunrise and Himalayan range views",
        "Hidden places of Rishikesh, including the Beatles Ashram and lesser-known spots",
        "Evening Ganga Aarti at Parmarth Niketan",
      ],
      image: "rishikeshKunjapuri",
    },
    {
      day: 3,
      title: "Waterfalls & Night Fun",
      summary:
        "A waterfall trail through the forest with photoshoots at less-crowded spots, followed by a fun night at Sai Ghat.",
      activities: [
        "Morning yoga session with a yoga trainer certified by Patanjali University",
        "Waterfall trail, including Neer Garh and Patna waterfalls",
        "Photoshoot at less-crowded spots",
        "Night fun at Sai Ghat with Sangrachna Club", // VERIFY: spelling of "Sangrachna Club"
      ],
      image: "rishikeshNeerGarh",
    },
    {
      day: 4,
      title: "Trek & Camp",
      summary: "A one-day trek into the hills and a night at camp with a bonfire under the stars.",
      activities: ["Morning yoga session with a yoga trainer certified by Patanjali University", "1-day trek", "Overnight camping with a bonfire"],
      image: "rishikeshCamping",
    },
    {
      day: 5,
      title: "Ancient Temples",
      summary:
        "Return from camp and visit the area's ancient temples, including Neelkanth Mahadev, before a special-location Ganga Aarti and a café dinner with a view.",
      activities: [
        "Return from camp",
        "Ancient temples, including Neelkanth Mahadev",
        "Ganga Aarti at a special location",
        "Café dinner with a view",
      ],
      image: "rishikeshAncientTemple",
    },
    {
      day: 6,
      title: "Free Exploration & Departure",
      summary:
        "A final morning yoga session and free time to explore at your own pace, with an optional scooty rental, before departure.",
      activities: ["Morning yoga session with a yoga trainer certified by Patanjali University", "Free time, with optional scooty rental", "Departure"],
      image: "rishikeshScooty",
    },
  ],
  inclusions: [
    "Stay provided throughout the trip",
    "Morning yoga session every day with a yoga trainer certified by Patanjali University",
    "Hidden and offbeat places of Rishikesh",
    "Ganga Aarti at all the special ghats",
    "Night fun at Sai Ghat with Sangrachna Club", // VERIFY: spelling of "Sangrachna Club"
    "All major waterfalls plus a 1-day trek, with photoshoots at less-crowded spots",
    "Hilltop viewpoint with the Himalayan range in view",
    "Meals at the best view-point cafés",
    "All the special ancient temples",
    "1-day camping experience",
  ],
  addOns: [
    {
      title: "Scooty rental",
      description: "Explore Rishikesh at your own pace at night or on the last day.",
      note: "Paid separately · valid driving licence required",
    },
  ],
  // VERIFY: exclusions are typical for this kind of trip; confirm before launch.
  exclusions: [
    "Travel to and from Rishikesh, unless pickup is confirmed for your booking",
    "Scooty rental and fuel (available as an add-on)",
    "Adventure activities not listed above, such as rafting or bungee jumping",
    "Personal expenses, shopping and tips",
    "Travel insurance",
  ],
  thingsToCarry: [
    "Government photo ID (needed at hotels and camps)",
    "Comfortable walking or trekking shoes",
    "Light layers plus a warm jacket for early mornings and the camp night",
    "Quick-dry clothes and slippers for the waterfalls",
    "Modest clothing for temples and aarti",
    "Reusable water bottle",
    "Sunscreen, sunglasses and a cap",
    "Power bank and a small torch",
    "Any personal medicines",
  ],
  faqs: [
    {
      question: "Who is this Rishikesh package for?",
      answer:
        "It suits friends, couples, solo travellers and small groups who want a mix of calm and adventure: daily yoga and aartis alongside waterfalls, a trek and a night of camping. If you're travelling with children or elderly parents, tell us and we'll adjust the pace.",
    },
    {
      question: "Do I need any yoga experience?",
      answer:
        "No. The morning sessions are led by a yoga trainer certified by Patanjali University. They are open to beginners, and regular practitioners are welcome too. Just bring comfortable clothes.",
    },
    {
      question: "How difficult is the trek?",
      answer:
        "It's a one-day hike planned for travellers with average fitness. We'll share the route, distance and difficulty when you enquire, so tell us about any health concerns and we'll plan around them.",
    },
    {
      question: "Is the day-by-day plan fixed?",
      answer:
        "It's our recommended flow, but we adjust it for weather, river levels and your interests. Some activities may swap days so you get the best conditions.",
    },
    {
      question: "When is the best time for this trip?",
      answer:
        "September to June is ideal. Heavy monsoon rain in July and August can affect waterfalls, treks and camping, so we'll advise you on conditions for your dates.",
    },
    {
      question: "How do I book?",
      answer:
        "Tap “Enquire on WhatsApp” or fill in the form with your dates and number of travellers. We'll confirm availability, the final price and stay details on WhatsApp before you pay anything.",
    },
  ],
  images: { hero: "rishikeshGangaAarti", card: "rishikeshGangaAarti" },
};
