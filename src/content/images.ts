// Every image on the site is registered here. To swap a photo, save it over the
// file in public/images/ with the same name, then update its alt text below so
// it describes the new photo. Width, height and blur placeholders are automatic.
import type { StaticImageData } from "next/image";

import homeHero from "../../public/images/home-hero-himalayan-valley.jpg";
import rishikeshGangaAarti from "../../public/images/rishikesh-ganga-aarti.jpg";
import rishikeshMorningYoga from "../../public/images/rishikesh-morning-yoga-ganga.jpg";
import rishikeshTriveniGhat from "../../public/images/rishikesh-triveni-ghat-evening.jpg";
import rishikeshKunjapuri from "../../public/images/rishikesh-kunjapuri-sunrise.jpg";
import rishikeshNeerGarh from "../../public/images/rishikesh-neer-garh-waterfall.jpg";
import rishikeshCamping from "../../public/images/rishikesh-camping-bonfire.jpg";
import rishikeshAncientTemple from "../../public/images/rishikesh-ancient-temple-tapkeshwar.jpg";
import rishikeshScooty from "../../public/images/rishikesh-riverside-scooty-ride.jpg";
import rajasthanJaisalmer from "../../public/images/rajasthan-jaisalmer-dunes.jpg";
import rajasthanAmerFort from "../../public/images/rajasthan-amer-fort-jaipur.jpg";
import rajasthanUdaipur from "../../public/images/rajasthan-udaipur-lake-pichola.jpg";
import rajasthanJodhpur from "../../public/images/rajasthan-jodhpur-blue-city.jpg";
import uttarakhandPeaks from "../../public/images/uttarakhand-himalayan-peaks.jpg";
import uttarakhandMussoorie from "../../public/images/uttarakhand-mussoorie-hills.jpg";
import uttarakhandLaxmanJhula from "../../public/images/uttarakhand-rishikesh-laxman-jhula.jpg";
import uttarakhandNainital from "../../public/images/uttarakhand-nainital-lake.jpg";
import himachalKullu from "../../public/images/himachal-kullu-valley.jpg";
import himachalShimla from "../../public/images/himachal-shimla-ridge.jpg";
import himachalDharamshala from "../../public/images/himachal-dharamshala-mcleodganj.jpg";
import himachalSpiti from "../../public/images/himachal-spiti-key-monastery.jpg";
import manaliSolang from "../../public/images/manali-solang-valley.jpg";
import manaliAtalTunnel from "../../public/images/manali-atal-tunnel-sissu.jpg";
import manaliOldManali from "../../public/images/manali-old-manali-cafes.jpg";
import manaliHadimba from "../../public/images/manali-hadimba-temple.jpg";
import jammuKashmirDalLake from "../../public/images/jammu-kashmir-dal-lake-shikara.jpg";
import jammuKashmirGulmarg from "../../public/images/jammu-kashmir-gulmarg-gondola.jpg";
import jammuKashmirPahalgam from "../../public/images/jammu-kashmir-pahalgam-betaab-valley.jpg";
import jammuKashmirVaishnoDevi from "../../public/images/jammu-kashmir-vaishno-devi-katra.jpg";
import mathuraPremMandir from "../../public/images/mathura-vrindavan-prem-mandir.jpg";
import vrindavanBankeBihari from "../../public/images/vrindavan-banke-bihari-temple.jpg";
import mathuraVishramGhat from "../../public/images/mathura-vishram-ghat-aarti.jpg";
import mathuraHoli from "../../public/images/mathura-vrindavan-holi-celebration.jpg";
import ownerPortrait from "../../public/images/deepak-swami-owner-portrait.jpg";
import vanExterior from "../../public/images/tourist-van-exterior.jpg";
import vanInterior from "../../public/images/tourist-van-interior.jpg";

export type SiteImage = { src: StaticImageData; alt: string };

export const images = {
  homeHero: { src: homeHero, alt: "Snow-capped Himalayan peaks above the green Kullu valley" },

  rishikeshGangaAarti: { src: rishikeshGangaAarti, alt: "Priests performing the evening Ganga Aarti at Triveni Ghat, Rishikesh" },
  rishikeshMorningYoga: { src: rishikeshMorningYoga, alt: "Seated meditation practice in a yoga studio in Rishikesh" },
  rishikeshTriveniGhat: { src: rishikeshTriveniGhat, alt: "Evening sun over the Ganga and the ghats of Rishikesh" },
  rishikeshKunjapuri: { src: rishikeshKunjapuri, alt: "Sunrise behind the Kunjapuri Devi temple near Rishikesh" },
  rishikeshNeerGarh: { src: rishikeshNeerGarh, alt: "Neer Garh waterfall dropping down a rock face near Rishikesh" },
  rishikeshCamping: { src: rishikeshCamping, alt: "Campfire glowing under a starry night sky" },
  rishikeshAncientTemple: { src: rishikeshAncientTemple, alt: "Shivling inside the Tapkeshwar Mahadev cave temple, with water dripping from the cave roof" },
  rishikeshScooty: { src: rishikeshScooty, alt: "Riders silhouetted against the sunset on Ram Jhula, Rishikesh" },

  rajasthanJaisalmer: { src: rajasthanJaisalmer, alt: "Camel rider silhouetted at sunset on the Sam sand dunes near Jaisalmer" },
  rajasthanAmerFort: { src: rajasthanAmerFort, alt: "Ganesh Pol gateway inside Amer Fort, Jaipur" },
  rajasthanUdaipur: { src: rajasthanUdaipur, alt: "City Palace and ghats on the shore of Lake Pichola, Udaipur" },
  rajasthanJodhpur: { src: rajasthanJodhpur, alt: "Blue-painted houses of Jodhpur seen from Mehrangarh Fort" },

  uttarakhandPeaks: { src: uttarakhandPeaks, alt: "Nanda Devi peak in bright sunlight above forested ridges in Uttarakhand" },
  uttarakhandMussoorie: { src: uttarakhandMussoorie, alt: "Snow-dusted terraced hills near Mussoorie" },
  uttarakhandLaxmanJhula: { src: uttarakhandLaxmanJhula, alt: "Sunset over Lakshman Jhula bridge and the Ganga in Rishikesh" },
  uttarakhandNainital: { src: uttarakhandNainital, alt: "Rowing boats lined up on Naini Lake with hills behind, Nainital" },

  himachalKullu: { src: himachalKullu, alt: "Snow peaks above the green Kullu valley near Manali" },
  himachalShimla: { src: himachalShimla, alt: "Christ Church and the Ridge in Shimla" },
  himachalDharamshala: { src: himachalDharamshala, alt: "Dhauladhar peaks glowing at sunset above Dharamshala" },
  himachalSpiti: { src: himachalSpiti, alt: "Key Monastery on its hilltop in the Spiti valley" },

  manaliSolang: { src: manaliSolang, alt: "Paraglider above Solang Valley near Manali" },
  manaliAtalTunnel: { src: manaliAtalTunnel, alt: "North portal of the Atal Tunnel at Rohtang" },
  manaliOldManali: { src: manaliOldManali, alt: "Wooden bridge and guesthouses in Old Manali" },
  manaliHadimba: { src: manaliHadimba, alt: "Pagoda-style Hadimba Devi temple among deodar trees, Manali" },

  jammuKashmirDalLake: { src: jammuKashmirDalLake, alt: "Wooden shikara moored among lotus leaves on Dal Lake, Srinagar, with mountains behind" },
  jammuKashmirGulmarg: { src: jammuKashmirGulmarg, alt: "Gulmarg Gondola cable car rising over snow and pine forest" },
  jammuKashmirPahalgam: { src: jammuKashmirPahalgam, alt: "Walking path beside the Lidder river in Betaab Valley, Pahalgam, below a snow peak" },
  jammuKashmirVaishnoDevi: { src: jammuKashmirVaishnoDevi, alt: "Vaishno Devi Bhawan buildings on the forested Trikuta hillside above Katra" },

  mathuraPremMandir: { src: mathuraPremMandir, alt: "Prem Mandir in Vrindavan lit up in pink and teal at night" },
  vrindavanBankeBihari: { src: vrindavanBankeBihari, alt: "Floral chandelier at Banke Bihari Temple, Vrindavan" },
  mathuraVishramGhat: { src: mathuraVishramGhat, alt: "Evening lights at Vishram Ghat on the Yamuna in Mathura" },
  mathuraHoli: { src: mathuraHoli, alt: "Clouds of coloured powder and raised hands during Holi in Mathura" },

  ownerPortrait: { src: ownerPortrait, alt: "Deepak Swami, founder of Deepak Tour & Travel, with snow-capped mountains behind him" },
  vanExterior: { src: vanExterior, alt: "White Force Traveller tourist van parked in front of a sandstone fort palace" },
  vanInterior: { src: vanInterior, alt: "Inside the van: rows of rust-red and white seats with yellow trim and yellow curtains" },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
