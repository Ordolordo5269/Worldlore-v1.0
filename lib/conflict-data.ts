export interface NewsItem {
  date: string
  title: string
  source: string
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export interface KeyLocation {
  name: string
  description: string
  lat: number
  lng: number
  type: "city" | "base" | "incident" | "headquarters" | "refugee"
}

export interface PartyStrategy {
  actor: string
  objectives: string
  strategy: string
  resources: string
}

export interface Source {
  title: string
  url: string
  type: "news" | "academic" | "government" | "ngo" | "analysis"
  description: string
}

export interface Conflict {
  id: string
  name: string
  description: string
  startYear: number
  casualties: number
  peopleAffected: number
  displaced: number
  rootCauses: string
  keyActors: string[]
  affectedCountries: string[]
  economicImpact: string
  intensity: "Low" | "Medium" | "Severe"
  timeline: TimelineEvent[]
  latestNews: NewsItem[]
  mapPosition?: {
    x: number
    y: number
    radius: number
  }
  // New fields
  mapCenter: {
    lat: number
    lng: number
    zoom: number
  }
  keyLocations: KeyLocation[]
  partiesAnalysis: PartyStrategy[]
  sources: Source[]
  humanitarianSituation: string
  internationalResponse: string
}

export const conflictData: Conflict[] = [
  {
    id: "nagorno-karabakh",
    name: "Nagorno-Karabakh",
    description: "Territorial dispute between Armenia and Azerbaijan",
    startYear: 1988,
    casualties: 50000,
    peopleAffected: 200000,
    displaced: 90000,
    rootCauses: "Territorial dispute over Nagorno-Karabakh region following Soviet Union collapse",
    keyActors: ["Azerbaijan", "Armenia", "Republic of Artsakh", "Russia", "Turkey"],
    affectedCountries: ["Armenia", "Azerbaijan"],
    economicImpact: "Billions in military spending; displacement of populations; infrastructure damage",
    intensity: "Medium",
    timeline: [
      {
        year: "1988-1994",
        title: "First Nagorno-Karabakh War",
        description: "Results in Armenian control",
      },
      {
        year: "April 2016",
        title: "Four-Day War",
        description: "Results in Azerbaijan gaining small territories",
      },
      {
        year: "July 2020",
        title: "Border clashes",
        description: "Escalates tensions",
      },
      {
        year: "Sept-Nov 2020",
        title: "Second Nagorno-Karabakh War",
        description: "Azerbaijan regains control of much of the region",
      },
      {
        year: "Sept 2023",
        title: "Azerbaijani offensive",
        description: "Complete takeover of the region, mass exodus of ethnic Armenians",
      },
    ],
    latestNews: [
      {
        date: "Jul 29, 2024",
        title: "Armenia and Azerbaijan Leaders Meet for Peace Negotiations",
        source: "Eurasianet",
      },
      {
        date: "Jul 24, 2024",
        title: "Former Nagorno-Karabakh Officials Face Trial in Azerbaijan",
        source: "Radio Free Europe",
      },
      {
        date: "Jul 19, 2024",
        title: "Russian Peacekeepers Begin Withdrawal from Border Areas",
        source: "TASS",
      },
      {
        date: "Jul 16, 2024",
        title: "EU Announces Aid Package for Armenian Communities",
        source: "EU Observer",
      },
      {
        date: "Jul 12, 2024",
        title: "Azerbaijan Opens New Transport Corridor through South Armenia",
        source: "Trend News Agency",
      },
    ],
    mapCenter: {
      lat: 39.8,
      lng: 46.8,
      zoom: 9,
    },
    keyLocations: [
      {
        name: "Stepanakert/Khankendi",
        description: "Capital of the disputed region",
        lat: 39.826,
        lng: 46.763,
        type: "city",
      },
      {
        name: "Shusha/Shushi",
        description: "Strategic city recaptured by Azerbaijan in 2020",
        lat: 39.759,
        lng: 46.749,
        type: "city",
      },
      {
        name: "Lachin Corridor",
        description: "Strategic corridor connecting Armenia to Nagorno-Karabakh",
        lat: 39.639,
        lng: 46.546,
        type: "incident",
      },
      {
        name: "Refugee Settlement",
        description: "Major displacement camp for those fleeing the conflict",
        lat: 40.192,
        lng: 44.529,
        type: "refugee",
      },
    ],
    partiesAnalysis: [
      {
        actor: "Azerbaijan",
        objectives: "Restore territorial integrity and sovereignty over Nagorno-Karabakh",
        strategy:
          "Military modernization, diplomatic isolation of Armenia, leveraging energy resources for international support",
        resources: "Oil and gas revenues, Turkish military support, Israeli weapons systems",
      },
      {
        actor: "Armenia",
        objectives: "Protect ethnic Armenians in Nagorno-Karabakh, maintain de facto independence of the region",
        strategy:
          "Defensive military posture, international advocacy based on self-determination principles, Russian security guarantees",
        resources: "Russian military support, diaspora funding, defensive terrain advantage",
      },
      {
        actor: "Russia",
        objectives: "Maintain influence in South Caucasus, prevent NATO expansion",
        strategy: "Peacekeeping presence, arms sales to both sides, mediation role",
        resources: "Military bases in Armenia, economic leverage, historical ties",
      },
    ],
    sources: [
      {
        title: "International Crisis Group: Nagorno-Karabakh",
        url: "https://www.crisisgroup.org/europe-central-asia/caucasus/nagorno-karabakh-conflict",
        type: "ngo",
        description: "Comprehensive analysis and reports on the conflict dynamics",
      },
      {
        title: "Carnegie Endowment: The Nagorno-Karabakh Conflict",
        url: "https://carnegieendowment.org/regions/nagorno-karabakh",
        type: "academic",
        description: "Academic research and policy recommendations",
      },
      {
        title: "OSCE Minsk Group",
        url: "https://www.osce.org/mg",
        type: "government",
        description: "Official mediation body for the conflict",
      },
    ],
    humanitarianSituation:
      "The conflict has resulted in significant humanitarian challenges, including displacement of nearly 90,000 ethnic Armenians from Nagorno-Karabakh following the 2023 Azerbaijani offensive. Limited access to basic services, destruction of civilian infrastructure, and presence of landmines continue to affect local populations. International humanitarian organizations face access constraints in delivering aid.",
    internationalResponse:
      "The OSCE Minsk Group has historically led mediation efforts, though with limited success. The EU has increased its engagement through the European Partnership framework and humanitarian assistance. Russia maintains a peacekeeping force in the region since the 2020 ceasefire agreement. Turkey provides strong support to Azerbaijan, while Iran has offered to mediate.",
  },
  {
    id: "ukraine-russia",
    name: "Ukraine-Russia War",
    description: "Military conflict following Russian invasion of Ukraine",
    startYear: 2022,
    casualties: 120000,
    peopleAffected: 14000000,
    displaced: 8000000,
    rootCauses: "Russian territorial claims, NATO expansion concerns, and historical tensions",
    keyActors: ["Russia", "Ukraine", "United States", "European Union", "NATO"],
    affectedCountries: ["Ukraine", "Russia", "Belarus", "Poland", "Moldova"],
    economicImpact: "Trillions in damages; global energy crisis; food security issues; sanctions",
    intensity: "Severe",
    timeline: [
      {
        year: "Feb 2022",
        title: "Russian Invasion",
        description: "Full-scale invasion of Ukraine",
      },
      {
        year: "Apr 2022",
        title: "Withdrawal from Kyiv",
        description: "Russian forces retreat from Kyiv region",
      },
      {
        year: "Nov 2022",
        title: "Kherson Liberation",
        description: "Ukrainian forces recapture Kherson",
      },
      {
        year: "Jun 2023",
        title: "Ukrainian Counteroffensive",
        description: "Limited gains in southern and eastern regions",
      },
      {
        year: "Feb 2024",
        title: "Avdiivka Falls",
        description: "Russian forces capture strategic eastern city",
      },
    ],
    latestNews: [
      {
        date: "Jul 30, 2024",
        title: "New Peace Talks Scheduled for August in Switzerland",
        source: "Reuters",
      },
      {
        date: "Jul 26, 2024",
        title: "US Announces $3.5 Billion Military Aid Package for Ukraine",
        source: "Associated Press",
      },
      {
        date: "Jul 22, 2024",
        title: "Russian Missile Strikes Target Energy Infrastructure Across Ukraine",
        source: "BBC",
      },
      {
        date: "Jul 18, 2024",
        title: "Ukrainian Forces Report Advances in Kursk Region",
        source: "Kyiv Independent",
      },
      {
        date: "Jul 14, 2024",
        title: "EU Extends Sanctions Against Russia for Another Six Months",
        source: "Politico",
      },
    ],
    mapCenter: {
      lat: 49.0,
      lng: 31.5,
      zoom: 6,
    },
    keyLocations: [
      {
        name: "Kyiv",
        description: "Capital of Ukraine, target of initial Russian offensive",
        lat: 50.45,
        lng: 30.523,
        type: "city",
      },
      {
        name: "Bakhmut",
        description: "Site of intense fighting and Russian capture in 2023",
        lat: 48.598,
        lng: 37.996,
        type: "city",
      },
      {
        name: "Zaporizhzhia Nuclear Plant",
        description: "Largest nuclear power plant in Europe, occupied by Russian forces",
        lat: 47.507,
        lng: 34.585,
        type: "incident",
      },
      {
        name: "NATO HQ Brussels",
        description: "Coordination center for Western military support",
        lat: 50.879,
        lng: 4.422,
        type: "headquarters",
      },
    ],
    partiesAnalysis: [
      {
        actor: "Russia",
        objectives: "Prevent NATO expansion, establish buffer zone, secure territorial gains in eastern Ukraine",
        strategy: "Full-scale invasion, targeting critical infrastructure, energy leverage against Europe",
        resources: "Large conventional military, nuclear deterrent, energy exports, Wagner Group",
      },
      {
        actor: "Ukraine",
        objectives: "Preserve sovereignty and territorial integrity, pursue EU and NATO membership",
        strategy: "Defensive operations, counteroffensives, international coalition building, information warfare",
        resources: "Western military aid, international financial support, motivated military and civilian population",
      },
      {
        actor: "United States/NATO",
        objectives: "Support Ukraine, weaken Russia's military capabilities, deter future aggression",
        strategy: "Military aid, intelligence sharing, economic sanctions against Russia, diplomatic isolation",
        resources: "Advanced weapons systems, economic power, intelligence capabilities",
      },
    ],
    sources: [
      {
        title: "Institute for the Study of War",
        url: "https://www.understandingwar.org/",
        type: "analysis",
        description: "Daily battlefield updates and analysis",
      },
      {
        title: "UN Office for the Coordination of Humanitarian Affairs",
        url: "https://www.unocha.org/ukraine",
        type: "ngo",
        description: "Humanitarian situation reports and needs assessments",
      },
      {
        title: "RAND Corporation: Russia-Ukraine Conflict",
        url: "https://www.rand.org/topics/russia-ukraine.html",
        type: "academic",
        description: "Strategic analysis and policy recommendations",
      },
    ],
    humanitarianSituation:
      "The war has created Europe's largest refugee crisis since World War II, with over 8 million Ukrainians displaced externally and millions more internally displaced. Critical infrastructure including hospitals, schools, and power plants has been severely damaged. Humanitarian access remains challenging in occupied territories. Winter conditions exacerbate vulnerabilities due to power outages and heating disruptions.",
    internationalResponse:
      "Western countries have provided unprecedented military aid to Ukraine and imposed extensive sanctions on Russia. The UN General Assembly has passed multiple resolutions condemning the invasion. Peace initiatives have been proposed by various countries including China, Brazil, and Switzerland, though with limited progress. The International Criminal Court has issued arrest warrants for Russian officials over alleged war crimes.",
  },
  {
    id: "israel-hamas",
    name: "Israel-Hamas Conflict",
    description: "Ongoing conflict between Israel and Hamas in Gaza",
    startYear: 2023,
    casualties: 40000,
    peopleAffected: 2200000,
    displaced: 1800000,
    rootCauses: "Long-standing Israeli-Palestinian tensions, Hamas attack on October 7, 2023",
    keyActors: ["Israel", "Hamas", "United States", "Egypt", "Qatar", "Iran"],
    affectedCountries: ["Israel", "Palestine", "Lebanon", "Egypt", "Jordan"],
    economicImpact: "Billions in infrastructure damage; humanitarian crisis; regional economic disruption",
    intensity: "Severe",
    timeline: [
      {
        year: "Oct 7, 2023",
        title: "Hamas Attack",
        description: "Surprise attack on southern Israel",
      },
      {
        year: "Oct 2023",
        title: "Israeli Military Response",
        description: "Airstrikes and ground operations in Gaza",
      },
      {
        year: "Nov 2023",
        title: "Temporary Ceasefire",
        description: "Brief pause for hostage exchanges",
      },
      {
        year: "Jan 2024",
        title: "Southern Gaza Offensive",
        description: "Israeli operations intensify in Khan Younis",
      },
      {
        year: "May 2024",
        title: "Rafah Operation",
        description: "Military operations in southern Gaza border area",
      },
    ],
    latestNews: [
      {
        date: "Jul 31, 2024",
        title: "Ceasefire Negotiations Resume in Cairo",
        source: "Al Jazeera",
      },
      {
        date: "Jul 27, 2024",
        title: "UN Reports Critical Humanitarian Situation in Northern Gaza",
        source: "United Nations",
      },
      {
        date: "Jul 23, 2024",
        title: "New Hostage Release Deal Proposed by Mediators",
        source: "The Guardian",
      },
      {
        date: "Jul 20, 2024",
        title: "Regional Tensions Rise as Hezbollah Increases Attacks on Northern Israel",
        source: "Washington Post",
      },
      {
        date: "Jul 15, 2024",
        title: "International Aid Conference Pledges $10 Billion for Gaza Reconstruction",
        source: "Financial Times",
      },
    ],
    mapCenter: {
      lat: 31.5,
      lng: 34.45,
      zoom: 9,
    },
    keyLocations: [
      {
        name: "Gaza City",
        description: "Major urban center and site of intense fighting",
        lat: 31.502,
        lng: 34.466,
        type: "city",
      },
      {
        name: "Rafah Crossing",
        description: "Critical border crossing for humanitarian aid",
        lat: 31.246,
        lng: 34.258,
        type: "incident",
      },
      {
        name: "Khan Younis",
        description: "Major city in southern Gaza, site of military operations",
        lat: 31.346,
        lng: 34.303,
        type: "city",
      },
      {
        name: "Kerem Shalom Crossing",
        description: "Main entry point for humanitarian aid",
        lat: 31.223,
        lng: 34.277,
        type: "incident",
      },
    ],
    partiesAnalysis: [
      {
        actor: "Israel",
        objectives: "Eliminate Hamas military capabilities, secure release of hostages, prevent future attacks",
        strategy: "Combined air and ground operations, siege tactics, targeted assassinations of Hamas leadership",
        resources: "Advanced military technology, intelligence capabilities, US military support",
      },
      {
        actor: "Hamas",
        objectives: "End Israeli blockade of Gaza, secure prisoner releases, increase international pressure on Israel",
        strategy: "Asymmetric warfare, tunnel networks, hostage taking, rocket attacks on civilian areas",
        resources: "Tunnel infrastructure, rocket arsenals, foreign support from Iran and others",
      },
      {
        actor: "United States",
        objectives: "Support Israel's security, prevent regional escalation, address humanitarian crisis",
        strategy: "Diplomatic support for Israel, arms supplies, humanitarian aid to Gaza, ceasefire mediation",
        resources: "Military aid, diplomatic influence, economic leverage",
      },
    ],
    sources: [
      {
        title: "UN Office for the Coordination of Humanitarian Affairs - Gaza",
        url: "https://www.ochaopt.org/",
        type: "ngo",
        description: "Humanitarian situation reports and needs assessments",
      },
      {
        title: "International Crisis Group: Israel/Palestine",
        url: "https://www.crisisgroup.org/middle-east-north-africa/east-mediterranean-mena/israelpalestine",
        type: "analysis",
        description: "Conflict analysis and policy recommendations",
      },
      {
        title: "Carnegie Endowment: Middle East Program",
        url: "https://carnegieendowment.org/regions/middle-east",
        type: "academic",
        description: "Research and analysis on regional dynamics",
      },
    ],
    humanitarianSituation:
      "Gaza faces a catastrophic humanitarian crisis with over 80% of its 2.2 million population displaced. Critical shortages of food, water, medicine, and fuel persist. Most hospitals are non-functional or severely damaged. Waterborne diseases are spreading due to damaged water and sanitation infrastructure. Humanitarian access remains severely restricted, with aid deliveries insufficient to meet the scale of needs.",
    internationalResponse:
      "The UN Security Council has called for humanitarian pauses and eventual ceasefire. Egypt, Qatar, and the US have led mediation efforts for hostage releases and ceasefires. The International Court of Justice has ordered provisional measures related to the prevention of genocide. Regional tensions have increased with Hezbollah-Israel exchanges and Houthi attacks on shipping in solidarity with Gaza.",
  },
  {
    id: "taiwan-strait",
    name: "Taiwan Strait Tensions",
    description: "Geopolitical tensions between China and Taiwan over sovereignty claims",
    startYear: 1949,
    casualties: 0,
    peopleAffected: 23500000,
    displaced: 0,
    rootCauses: "Unresolved civil war outcome, One China policy, competing sovereignty claims",
    keyActors: ["China", "Taiwan", "United States", "Japan", "ASEAN"],
    affectedCountries: ["Taiwan", "China", "United States", "Japan", "Philippines"],
    economicImpact: "Semiconductor supply chain concerns; military spending increases; trade uncertainties",
    intensity: "Medium",
    timeline: [
      {
        year: "1949",
        title: "Chinese Civil War End",
        description: "Nationalist government retreats to Taiwan after Communist victory in mainland China",
      },
      {
        year: "1971",
        title: "UN Recognition Change",
        description: "UN recognizes PRC instead of Taiwan (ROC) as China's representative",
      },
      {
        year: "1996",
        title: "Third Taiwan Strait Crisis",
        description: "China conducts missile tests near Taiwan before presidential elections",
      },
      {
        year: "2016",
        title: "Tsai Ing-wen Election",
        description: "DPP candidate wins presidency, relations with mainland deteriorate",
      },
      {
        year: "2022-2023",
        title: "Increased Military Activities",
        description: "China conducts large-scale military exercises around Taiwan following US official visits",
      },
    ],
    latestNews: [
      {
        date: "Jul 28, 2024",
        title: "China Conducts Naval Exercises in Taiwan Strait",
        source: "South China Morning Post",
      },
      {
        date: "Jul 25, 2024",
        title: "US Approves $500 Million Defense Package for Taiwan",
        source: "Reuters",
      },
      {
        date: "Jul 21, 2024",
        title: "Taiwan Reports Record Number of Chinese Aircraft in Defense Zone",
        source: "Taiwan News",
      },
      {
        date: "Jul 17, 2024",
        title: "G7 Leaders Express Concern Over Taiwan Strait Stability",
        source: "Nikkei Asia",
      },
      {
        date: "Jul 13, 2024",
        title: "Taiwan Conducts Annual Han Kuang Military Exercises",
        source: "Focus Taiwan",
      },
    ],
    mapCenter: {
      lat: 24.0,
      lng: 121.0,
      zoom: 7,
    },
    keyLocations: [
      {
        name: "Taipei",
        description: "Capital of Taiwan",
        lat: 25.033,
        lng: 121.565,
        type: "city",
      },
      {
        name: "Taiwan Semiconductor Manufacturing Company",
        description: "World's largest semiconductor manufacturer",
        lat: 24.774,
        lng: 121.013,
        type: "incident",
      },
      {
        name: "Kinmen Islands",
        description: "Taiwan-controlled islands close to mainland China",
        lat: 24.448,
        lng: 118.321,
        type: "incident",
      },
      {
        name: "US Indo-Pacific Command",
        description: "US military headquarters overseeing the region",
        lat: 21.351,
        lng: -157.951,
        type: "headquarters",
      },
    ],
    partiesAnalysis: [
      {
        actor: "China",
        objectives: "Reunification with Taiwan, prevent formal independence, assert sovereignty claims",
        strategy: "Military pressure, diplomatic isolation, economic integration, gray zone tactics",
        resources: "Growing military capabilities, economic leverage, diplomatic influence",
      },
      {
        actor: "Taiwan",
        objectives: "Maintain de facto independence, strengthen international relationships, deter Chinese aggression",
        strategy: "Asymmetric defense capabilities, international engagement, economic diversification",
        resources: "US security support, advanced technology sector, democratic governance",
      },
      {
        actor: "United States",
        objectives: "Maintain strategic ambiguity, deter Chinese aggression, support Taiwan's self-defense",
        strategy: "Arms sales to Taiwan, naval presence, diplomatic support without formal recognition",
        resources: "Military presence in Asia-Pacific, alliance network, economic influence",
      },
    ],
    sources: [
      {
        title: "Center for Strategic and International Studies: Taiwan",
        url: "https://www.csis.org/regions/asia/taiwan",
        type: "academic",
        description: "Strategic analysis of cross-strait relations",
      },
      {
        title: "Brookings Institution: Taiwan and Cross-Strait Relations",
        url: "https://www.brookings.edu/topic/taiwan/",
        type: "academic",
        description: "Policy research on Taiwan's international position",
      },
      {
        title: "Taiwan Security Research",
        url: "https://www.taiwansecurity.org/",
        type: "analysis",
        description: "Focused research on Taiwan's defense and security challenges",
      },
    ],
    humanitarianSituation:
      "Unlike active conflicts, the Taiwan Strait situation has not created a humanitarian crisis. However, contingency planning for potential conflict scenarios includes concerns about civilian casualties, infrastructure damage, and displacement in the event of military action. Taiwan's dense population and critical role in global supply chains make humanitarian considerations particularly significant in risk assessments.",
    internationalResponse:
      "The international community largely maintains a 'One China' policy while developing unofficial relations with Taiwan. The United States provides defensive arms to Taiwan under the Taiwan Relations Act. Japan has increased its security focus on Taiwan, considering it essential to its own security. The G7 and EU have emphasized the importance of peace and stability in the Taiwan Strait in recent statements.",
  },
]
