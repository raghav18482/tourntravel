// Required photo for each placeholder in public/images/.
// Replace a placeholder by saving your photo with the SAME file name (same .jpg extension).
export const PLACEHOLDER_TAG = "DEEPAK-TT-PLACEHOLDER";

const HERO = { width: 2400, height: 1350, ratio: "16:9" };
const DAY = { width: 1200, height: 900, ratio: "4:3" };
const LANDSCAPE = { width: 1500, height: 1000, ratio: "3:2" };
const PORTRAIT = { width: 1200, height: 1500, ratio: "4:5" };

export const imageSpecs = [
  { file: "home-hero-himalayan-valley.jpg", ...HERO, usage: "Home page hero", tone: "teal" },

  { file: "rishikesh-ganga-aarti.jpg", ...HERO, usage: "Rishikesh package hero + featured card", tone: "saffron" },
  { file: "rishikesh-morning-yoga-ganga.jpg", ...PORTRAIT, usage: "Home featured package, gallery", tone: "saffron" },
  { file: "rishikesh-triveni-ghat-evening.jpg", ...DAY, usage: "Rishikesh itinerary, Day 1", tone: "saffron" },
  { file: "rishikesh-kunjapuri-sunrise.jpg", ...DAY, usage: "Rishikesh itinerary, Day 2", tone: "saffron" },
  { file: "rishikesh-neer-garh-waterfall.jpg", ...DAY, usage: "Rishikesh itinerary, Day 3", tone: "teal" },
  { file: "rishikesh-camping-bonfire.jpg", ...DAY, usage: "Rishikesh itinerary, Day 4", tone: "terracotta" },
  { file: "rishikesh-ancient-temple-tapkeshwar.jpg", ...DAY, usage: "Rishikesh itinerary, Day 5", tone: "saffron" },
  { file: "rishikesh-riverside-scooty-ride.jpg", ...DAY, usage: "Rishikesh itinerary, Day 6", tone: "teal" },

  { file: "rajasthan-jaisalmer-dunes.jpg", ...HERO, usage: "Rajasthan hero + card", tone: "terracotta" },
  { file: "rajasthan-amer-fort-jaipur.jpg", ...LANDSCAPE, usage: "Rajasthan page, gallery", tone: "terracotta" },
  { file: "rajasthan-udaipur-lake-pichola.jpg", ...PORTRAIT, usage: "Rajasthan page, gallery", tone: "terracotta" },
  { file: "rajasthan-jodhpur-blue-city.jpg", ...LANDSCAPE, usage: "Rajasthan page, gallery", tone: "teal" },

  { file: "uttarakhand-himalayan-peaks.jpg", ...HERO, usage: "Uttarakhand hero + card", tone: "teal" },
  { file: "uttarakhand-mussoorie-hills.jpg", ...LANDSCAPE, usage: "Uttarakhand page, gallery", tone: "teal" },
  { file: "uttarakhand-rishikesh-laxman-jhula.jpg", ...PORTRAIT, usage: "Uttarakhand page, gallery", tone: "saffron" },
  { file: "uttarakhand-nainital-lake.jpg", ...LANDSCAPE, usage: "Uttarakhand page, gallery", tone: "teal" },

  { file: "himachal-kullu-valley.jpg", ...HERO, usage: "Himachal Pradesh hero + card", tone: "teal" },
  { file: "himachal-shimla-ridge.jpg", ...LANDSCAPE, usage: "Himachal page, gallery", tone: "terracotta" },
  { file: "himachal-dharamshala-mcleodganj.jpg", ...PORTRAIT, usage: "Himachal page, gallery", tone: "teal" },
  { file: "himachal-spiti-key-monastery.jpg", ...LANDSCAPE, usage: "Himachal page, gallery", tone: "terracotta" },

  { file: "manali-solang-valley.jpg", ...HERO, usage: "Manali hero + card", tone: "teal" },
  { file: "manali-atal-tunnel-sissu.jpg", ...LANDSCAPE, usage: "Manali page, gallery", tone: "teal" },
  { file: "manali-old-manali-cafes.jpg", ...PORTRAIT, usage: "Manali page, gallery", tone: "terracotta" },
  { file: "manali-hadimba-temple.jpg", ...LANDSCAPE, usage: "Manali page, gallery", tone: "teal" },

  { file: "jammu-kashmir-dal-lake-shikara.jpg", ...HERO, usage: "Jammu & Kashmir hero + card", tone: "teal" },
  { file: "jammu-kashmir-gulmarg-gondola.jpg", ...LANDSCAPE, usage: "Jammu & Kashmir page, gallery", tone: "teal" },
  { file: "jammu-kashmir-pahalgam-betaab-valley.jpg", ...PORTRAIT, usage: "Jammu & Kashmir page, gallery", tone: "teal" },
  { file: "jammu-kashmir-vaishno-devi-katra.jpg", ...LANDSCAPE, usage: "Jammu & Kashmir page, gallery", tone: "saffron" },

  { file: "mathura-vrindavan-prem-mandir.jpg", ...HERO, usage: "Mathura Vrindavan hero + card", tone: "saffron" },
  { file: "vrindavan-banke-bihari-temple.jpg", ...PORTRAIT, usage: "Mathura Vrindavan page, gallery", tone: "saffron" },
  { file: "mathura-vishram-ghat-aarti.jpg", ...LANDSCAPE, usage: "Mathura Vrindavan page, gallery", tone: "saffron" },
  { file: "mathura-vrindavan-holi-celebration.jpg", ...LANDSCAPE, usage: "Mathura Vrindavan page, gallery", tone: "terracotta" },

  { file: "tourist-van-exterior.jpg", width: 780, height: 1040, ratio: "3:4", usage: "About page, our vehicle", tone: "teal" },
  { file: "tourist-van-interior.jpg", width: 900, height: 1200, ratio: "3:4", usage: "About page, our vehicle", tone: "teal" },
  { file: "deepak-swami-owner-portrait.jpg", width: 800, height: 1000, ratio: "4:5", usage: "About page owner photo", tone: "terracotta" },
];
