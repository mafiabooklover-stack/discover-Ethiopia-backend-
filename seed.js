require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('./models/Destination');

const destinations = [
    // HISTORICAL SITES
    {
        name: "Lalibela",
        region: "Amhara Region",
        image: "../assets/Lalibela.jpg.jpg",
        description: "Famous for its remarkable rock-hewn churches, often called the 'Eighth Wonder of the World'. These 11 medieval monolithic churches were carved out of rock in the 12th century.",
        longDescription: "Lalibela is one of Ethiopia's holiest cities and a major pilgrimage site for Ethiopian Orthodox Christians. Named after King Lalibela who ruled in the 12th–13th centuries, the town is renowned for its monolithic rock-cut churches which were hewn directly from solid volcanic rock. The complex consists of 11 churches divided into two groups connected by tunnels and trenches. The most famous is Bete Giyorgis (Church of Saint George), a perfectly cruciform structure dedicated to Ethiopia's patron saint. Pilgrims travel from across Ethiopia and the world to worship here, especially during major religious festivals like Ethiopian Christmas (Genna) and Timket (Epiphany). The churches are still active places of worship today.",
        bestTime: "October to March",
        importance: "UNESCO World Heritage Site",
        category: "historical",
        lat: 12.0319,
        lng: 39.0474,
        highlights: ["Rock-hewn churches", "Bete Giyorgis", "Pilgrimage site", "UNESCO Heritage"],
        entryFee: "$50 USD for foreign nationals",
        duration: "2-3 days"
    },
    {
        name: "Axum",
        region: "Tigray Region",
        image: "../assets/Axum.jpg",
        description: "Ancient city with towering obelisks, ruins of the ancient Axumite Empire. Believed to house the Ark of the Covenant according to Ethiopian tradition.",
        longDescription: "Axum (also spelled Aksum) is one of the oldest continuously inhabited places in Africa and was the capital of the ancient Axumite Empire, one of the great civilizations of the ancient world. At its height (1st–7th centuries AD), Axum was a major trading empire and one of the first states to adopt Christianity. The city is famous for its obelisks (stelae), ancient tombs, and the Church of Our Lady Mary of Zion, which Ethiopians believe houses the original Ark of the Covenant. The largest standing obelisk in Axum stands 24 meters tall. The ruins of royal palaces and bath houses from the height of the empire can also be explored in the surrounding area.",
        bestTime: "October to March",
        importance: "Ancient civilization center",
        category: "historical",
        lat: 14.1295,
        lng: 38.7183,
        highlights: ["Ancient obelisks", "Ark of the Covenant", "Royal tombs", "Queen of Sheba's palace"],
        entryFee: "$15 USD",
        duration: "1-2 days"
    },
    {
        name: "Gondar",
        region: "Amhara Region",
        image: "../assets/gondar.jpg",
        description: "Known as the 'Camelot of Africa' with its medieval castles and churches. The Royal Enclosure has several castles built by Ethiopian emperors.",
        longDescription: "Gondar served as Ethiopia's capital from 1636 until the 19th century and is famed for its collection of medieval castles and churches. The Royal Enclosure (Fasil Ghebbi) is a UNESCO World Heritage Site that contains six large castles and several smaller ones, connected by tunnels and high walls. The castles were built by successive emperors starting with Fasilides in 1636. Beyond the Royal Enclosure, the city contains the beautiful Debre Birhan Selassie Church, whose ceiling is covered with 80 painted cherub faces, and the elaborate Kusquam Memorial Palace. Gondar is also a major center for the Beta Israel (Ethiopian Jewish) community, with ancient synagogues and significant cultural heritage.",
        bestTime: "October to March",
        importance: "Historical castles",
        category: "historical",
        lat: 12.6049,
        lng: 37.4558,
        highlights: ["Royal Enclosure", "Fasilides Castle", "Debre Birhan Selassie Church", "Fasil Ghebbi"],
        entryFee: "$15 USD",
        duration: "1-2 days"
    },
    {
        name: "Harar Jugol",
        region: "Harari Region",
        image: "../assets/harar.jpg",
        description: "Ancient walled city with 82 mosques and over 100 shrines. Known as the fourth holiest city of Islam with unique culture and hyena men.",
        longDescription: "Harar Jugol is an ancient walled city in eastern Ethiopia, often called the 'City of Saints' and considered the fourth holiest city in Islam. The old walled city (Jugol) is a UNESCO World Heritage Site containing 82 mosques — three of which date from the 10th century — and 102 shrines. The narrow, winding alleyways of the old city create a labyrinthine urban fabric unique in the world. Harar is also famous for its tradition of feeding wild spotted hyenas, practiced for over 500 years. 'Hyena men' hand-feed hyenas by mouth every evening outside the city walls, a ritual believed to predict the city's fortune. The city is also known for its unique Harari culture, traditional houses with elaborately decorated interiors, and fine handicrafts.",
        bestTime: "November to February",
        importance: "UNESCO World Heritage Site",
        category: "historical",
        lat: 9.3107,
        lng: 42.1232,
        highlights: ["82 mosques", "Hyena feeding ritual", "Arthur Rimbaud House", "Jugol old city"],
        entryFee: "$10 USD",
        duration: "1-2 days"
    },
    {
        name: "Yeha Temple",
        region: "Tigray Region",
        image: "../assets/damo.jpg",
        description: "The oldest standing structure in Ethiopia, dating back to the 5th century BC. This ancient temple shows the influence of South Arabian civilization.",
        longDescription: "The Temple of Yeha is the oldest standing structure in sub-Saharan Africa, dating back to approximately the 5th century BC. Located near the village of Yeha in the Tigray region, this pre-Axumite temple was dedicated to the moon god Almaqah and reflects the strong influence of South Arabian (Sabaean) civilization on ancient Ethiopia. The temple's walls, made of massive stone blocks without mortar, still stand to a height of 12 meters. Nearby ruins of a palace and burial sites provide further evidence of a sophisticated pre-Christian civilization. Adjacent to the ancient temple is a 6th-century Aksumite church, creating a fascinating juxtaposition of religious heritage spanning over two millennia.",
        bestTime: "October to March",
        importance: "Oldest structure in Ethiopia",
        category: "historical",
        lat: 14.3167,
        lng: 38.6167,
        highlights: ["Pre-Axumite temple", "Moon god altar", "5th century BC ruins", "South Arabian influence"],
        entryFee: "$10 USD",
        duration: "Half day"
    },
    {
        name: "Debre Damo",
        region: "Tigray Region",
        image: "../assets/yeha.jpg",
        description: "A 6th-century monastery located on a flat-topped mountain. Accessible only by climbing a 15-meter rope, it's one of Ethiopia's most sacred sites.",
        longDescription: "Debre Damo is one of the oldest monasteries in Ethiopia, founded in the 6th century AD on an isolated amba (flat-topped mountain) in the Tigray region. The monastery is accessible only by climbing a 15-meter braided leather rope up a sheer cliff face — an ascent that requires strength and courage. According to tradition, the first monk to climb the cliff was helped by a snake sent by God. The monastery contains the oldest intact church in Ethiopia, built in the Axumite architectural style with distinctive wood-carved ceilings and walls. The monastery houses invaluable manuscripts, ancient crosses, and religious artifacts. Only men and male animals are allowed to enter, as a tradition that dates back to the founding of the monastery.",
        bestTime: "October to March",
        importance: "Ancient monastery",
        category: "historical",
        lat: 14.3633,
        lng: 39.2394,
        highlights: ["6th century monastery", "Rope access only", "Axumite architecture", "Ancient manuscripts"],
        entryFee: "$10 USD (men only)",
        duration: "Half to full day"
    },

    // NATURAL WONDERS
    {
        name: "Simien Mountains",
        region: "Northern Ethiopia",
        image: "../assets/simen mountains.jpg.jpg",
        description: "UNESCO World Heritage site with dramatic landscapes, deep valleys, and unique wildlife including Gelada baboons and Walia ibex found nowhere else on Earth.",
        longDescription: "The Simien Mountains National Park is a UNESCO World Heritage Site and one of Africa's most spectacular mountain ranges. Formed over millions of years by volcanic activity, the landscape is defined by dramatic escarpments that drop thousands of meters into deep valleys, creating views that are among the most breathtaking on the continent. The park is home to several endemic species found nowhere else on Earth: the Gelada baboon, the Walia ibex, and the Ethiopian wolf. Hiking trails range from day walks to multi-day treks reaching Ras Dashen, the highest peak in Ethiopia at 4,550 meters (the fourth highest in Africa). The park also offers excellent birdwatching with lammergeyer (bearded vultures) and over 50 other bird species.",
        bestTime: "September to November",
        importance: "Spectacular hiking",
        category: "natural",
        lat: 13.2333,
        lng: 38.3333,
        highlights: ["Gelada baboons", "Walia ibex", "Ras Dashen peak", "Dramatic cliffs"],
        entryFee: "$15 USD per day",
        duration: "2-7 days"
    },
    {
        name: "Danakil Depression",
        region: "Afar Region",
        image: "../assets/depression.jpg",
        description: "One of the hottest and most alien landscapes on Earth with active volcanoes, colorful sulfur springs, and salt flats. Often called the 'cruelest place on Earth'.",
        longDescription: "The Danakil Depression is one of the most extraordinary and inhospitable places on our planet. Located in the Afar Triangle where three tectonic plates meet, it sits up to 125 meters below sea level and regularly records temperatures above 50°C (122°F), making it one of the hottest places on Earth. The landscape looks like another world entirely: the Dallol hydrothermal field features bubbling sulfur springs, salt crusts, acid ponds, and a riot of yellow, orange, green, and red colors that seem almost supernatural. Erta Ale volcano — one of the world's few permanent lava lakes — glows red in the darkness. Despite these extreme conditions, the Afar people have worked salt from the depression for centuries, using camel and donkey caravans to transport it.",
        bestTime: "November to February",
        importance: "Unique geological features",
        category: "natural",
        lat: 14.2417,
        lng: 40.3,
        highlights: ["Dallol sulfur springs", "Erta Ale lava lake", "Salt flats", "Extreme temperatures"],
        entryFee: "$100-200 USD (guided tours required)",
        duration: "2-4 days"
    },
    {
        name: "Blue Nile Falls",
        region: "Amhara Region",
        image: "../assets/blue nile.jpg.jpg",
        description: "Spectacular waterfall on the Blue Nile river, known locally as 'Tis Abay' meaning 'smoking water'. Creates a beautiful rainbow on sunny days.",
        longDescription: "Tis Abay, meaning 'smoking water' in Amharic, is Ethiopia's most famous waterfall and one of Africa's great waterfalls. The Blue Nile plunges 45 meters over a 400-meter-wide basalt ledge, creating a thundering cascade that creates a constant mist and rainbow on sunny days. The falls are located about 30 kilometers from Bahir Dar on the outflow of Lake Tana, the source of the Blue Nile. During the rainy season (July-September), the falls are at their most spectacular, with the full width roaring with brown floodwaters. A day trip from Bahir Dar typically includes crossing the Nile by local papyrus tankwa boat, a short walk through farming villages, and views from both the top and base of the falls. The journey is as rewarding as the destination itself.",
        bestTime: "August to October",
        importance: "Majestic waterfalls",
        category: "natural",
        lat: 11.4857,
        lng: 37.5895,
        highlights: ["45-meter plunge", "Rainbow mist", "Blue Nile source", "Papyrus boat crossing"],
        entryFee: "$5 USD",
        duration: "Half day"
    },
    {
        name: "Bale Mountains",
        region: "Oromia Region",
        image: "../assets/bale.jpg",
        description: "Home to the rare Ethiopian wolf and many endemic birds. Features Africa's largest alpine habitat and beautiful mountain landscapes.",
        longDescription: "Bale Mountains National Park in southeastern Ethiopia protects one of Africa's most important ecosystems for endemic species. The park's Sanetti Plateau forms Africa's largest expanse of Afroalpine habitat, rising above 4,000 meters and home to the world's largest population of the Ethiopian wolf — the rarest canid on Earth with only about 500 individuals remaining. The park also protects mountain nyala, Giant mole-rat, and an extraordinary collection of endemic birds including the Blue-winged goose and Spot-breasted plover. The Harenna Forest in the southern part of the park is one of Africa's largest cloud forests, harboring lions, leopards, and rare plants. The Web River Valley offers excellent horse trekking through spectacular highland scenery.",
        bestTime: "November to March",
        importance: "Unique wildlife",
        category: "natural",
        lat: 6.8333,
        lng: 39.9167,
        highlights: ["Ethiopian wolf", "Sanetti Plateau", "Harenna Forest", "Mountain nyala"],
        entryFee: "$15 USD per day",
        duration: "2-5 days"
    },
    {
        name: "Sof Omar Caves",
        region: "Oromia Region",
        image: "../assets/sof omar cave.jpg",
        description: "The longest cave system in Ethiopia, stretching over 15 kilometers. This limestone cave network has spiritual significance and unique rock formations.",
        longDescription: "Sof Omar is the longest cave system in Ethiopia and one of the most extensive cave systems in Africa, with over 15 kilometers of mapped passages carved by the Web River through a limestone plateau. The caves are named after Sheikh Sof Omar, a revered 12th-century Islamic saint who is believed to have lived and worshipped here, and the site remains a sacred Muslim pilgrimage destination. Inside, the Web River has carved enormous chambers — some exceeding 100 meters in width — adorned with spectacular stalactites, stalagmites, and limestone columns in fantastical shapes. The cave system has eight main chambers, each with unique formations and characteristics. Visiting requires a local guide and involves wading through sections of the river inside the cave.",
        bestTime: "October to March",
        importance: "Longest cave system",
        category: "natural",
        lat: 6.9333,
        lng: 40.8500,
        highlights: ["15km cave system", "Web River underground", "Pilgrimage site", "Limestone formations"],
        entryFee: "$10 USD",
        duration: "Half day"
    },
    {
        name: "Lake Tana",
        region: "Amhara Region",
        image: "../assets/tana.jpg",
        description: "Ethiopia's largest lake and the source of the Blue Nile. Home to ancient island monasteries and diverse bird species.",
        longDescription: "Lake Tana is Ethiopia's largest lake and the source of the Blue Nile, covering approximately 3,600 square kilometers in the highlands of the Amhara region. The lake contains 37 islands, many of which host ancient monasteries and churches dating from the 14th to 17th centuries. These island monasteries preserve extraordinary collections of illuminated manuscripts, ancient icons, religious treasures, and the remains of Ethiopian emperors — making them living repositories of Ethiopian history and religion. The lake and its shores are also a superb birdwatching destination, with over 200 species including African fish eagles, great white pelicans, marabou storks, and numerous waders. Boat trips to the island monasteries depart from Bahir Dar, the regional capital on the lake's southern shore.",
        bestTime: "October to April",
        importance: "Source of Blue Nile",
        category: "natural",
        lat: 11.9544,
        lng: 37.3047,
        highlights: ["37 islands", "Island monasteries", "Blue Nile source", "Birdwatching"],
        entryFee: "$5 USD + boat hire",
        duration: "1-2 days"
    },

    // CULTURAL EXPERIENCES
    {
        name: "Omo Valley",
        region: "Southern Ethiopia",
        image: "../assets/omo.jpg",
        description: "Home to diverse indigenous tribes with rich cultural traditions, unique ceremonies, and traditional ways of life. Tribes include Hamer, Mursi, and Karo.",
        longDescription: "The Omo Valley in southern Ethiopia is home to some of Africa's most diverse and traditional ethnic groups, many of whom have maintained their ancient customs largely unchanged for centuries. The Lower Omo Valley (a UNESCO World Heritage Site for its prehistoric sites) is inhabited by around 16 distinct tribes including the Hamer, Mursi, Karo, Banna, and Dassanech. The Mursi are famous for the lip plates worn by women. The Hamer practice unique coming-of-age cattle-jumping ceremonies and bull jumping. The Karo create extraordinary body painting using chalk and pigments. Weekly markets bring tribes together for trade and social interaction. Visiting the Omo Valley requires sensitivity and respect for local customs and usually the services of a knowledgeable local guide.",
        bestTime: "June to September",
        importance: "Cultural diversity",
        category: "cultural",
        lat: 5.3333,
        lng: 36.1667,
        highlights: ["Mursi lip plates", "Hamer bull jumping", "Karo body painting", "Tribal markets"],
        entryFee: "Varies per village ($5-20 USD)",
        duration: "3-7 days"
    },
    {
        name: "Timket Festival",
        region: "Throughout Ethiopia",
        image: "../assets/timket.jpg",
        description: "Ethiopian Epiphany celebration with colorful processions, prayers, and ceremonies. One of the most important festivals in the Ethiopian Orthodox calendar.",
        longDescription: "Timket (Timkat) is the Ethiopian Orthodox celebration of Epiphany, commemorating the baptism of Jesus Christ in the Jordan River. Celebrated on January 19th (or 20th in a leap year), it is considered the most important festival in the Ethiopian Orthodox calendar and was inscribed on UNESCO's Intangible Cultural Heritage list in 2019. On the eve of Timket, replicas of the Ark of the Covenant (Tabots) are taken from churches in solemn processions, with priests dressed in colorful ceremonial robes, singing and dancing, accompanied by the sound of drums and prayer sticks. The Tabots are kept overnight by water — symbolizing the Jordan River — and at dawn the following day, a blessing of the water is performed and pilgrims immerse themselves in the blessed water. In Gondar and Addis Ababa, the celebrations are particularly spectacular with thousands of participants.",
        bestTime: "January 19th",
        importance: "Religious celebration",
        category: "cultural",
        lat: 12.6049,
        lng: 37.4558,
        highlights: ["Ark of Covenant procession", "Water blessing ceremony", "Colorful priestly robes", "Mass baptism"],
        entryFee: "Free to attend",
        duration: "2-3 days"
    },
    {
        name: "Addis Merkato",
        region: "Addis Ababa",
        image: "../assets/merkato.jpg",
        description: "One of Africa's largest open-air markets. Experience local trade, spices, traditional crafts, and authentic Ethiopian daily life.",
        longDescription: "Addis Merkato (also called Mercato) is one of the largest open-air markets in Africa, occupying an entire neighborhood in the western part of Addis Ababa. The market has operated since the Italian occupation in the 1930s and now covers several square kilometers. The market is divided into specialized sections: spice stalls overflow with exotic aromas; textile vendors display traditional handwoven cloth; gold and silver smiths work alongside their goods; injera sellers stack towers of Ethiopia's staple flatbread; and electronics, furniture, second-hand clothing, and everything imaginable can be found in the labyrinthine alleyways. Visiting Merkato is a full sensory experience — the sounds, smells, and colors are overwhelming in the best possible way. It is recommended to go with a guide and keep valuables secure.",
        bestTime: "Monday to Saturday",
        importance: "Largest market in Africa",
        category: "cultural",
        lat: 9.0327,
        lng: 38.7342,
        highlights: ["Spice section", "Traditional crafts", "Gold market", "Local food stalls"],
        entryFee: "Free",
        duration: "Half day"
    },
    {
        name: "Ethiopian Coffee Ceremony",
        region: "Nationwide",
        image: "../assets/coffee.jpg",
        description: "Experience the traditional coffee ceremony, an important part of Ethiopian culture. Coffee is brewed fresh and served with popcorn or traditional snacks.",
        longDescription: "Ethiopia is the birthplace of coffee, and the traditional coffee ceremony (Jebena Buna) is one of the most important social and cultural institutions in Ethiopian life. The ceremony is a daily ritual in most Ethiopian households, a way of honoring guests, and an important communal bonding activity that can last for hours. The ceremony begins with roasting fresh green coffee beans in a pan over charcoal — the aroma fills the room and guests are invited to inhale the fragrant smoke. The roasted beans are then ground by hand in a wooden mortar, brewed in a traditional clay pot (jebena), and served in tiny cups with sugar. Three rounds of coffee are typically served: the first (Abol) is the strongest, the second (Tona) somewhat weaker, and the third (Baraka) the weakest but considered a blessing. Incense is burned throughout and popcorn or bread is often served alongside.",
        bestTime: "Any time",
        importance: "Birthplace of coffee",
        category: "cultural",
        lat: 9.0222,
        lng: 38.7468,
        highlights: ["Green bean roasting", "Jebena clay pot brewing", "Three rounds ritual", "Incense ceremony"],
        entryFee: "Free (in homes/cultural centers)",
        duration: "1-2 hours"
    },
    {
        name: "Meskel Festival",
        region: "Addis Ababa (celebrated nationwide)",
        image: "../assets/meskel.jpg",
        description: "Annual religious festival celebrating the finding of the True Cross. Huge bonfires, colorful processions, and thousands of pilgrims gather at Meskel Square.",
        longDescription: "Meskel (meaning 'cross' in Amharic) is one of the most colorful religious festivals in Ethiopia and one of the oldest Christian festivals in the world, commemorating the discovery of the True Cross by Queen Helena in the 4th century AD. Celebrated on September 27th (September 28th in leap years), the festival is inscribed on UNESCO's Intangible Cultural Heritage list. The highlight is the Demera ceremony in the evening before Meskel: a large bonfire decorated with flowers and topped with a cross is lit at Meskel Square in Addis Ababa (and in every town across Ethiopia). Thousands of pilgrims in white shammas (traditional robes) circle the bonfire singing and praying. The direction the smoke falls is believed to predict the coming year's fortunes. The following day, the embers are used by the faithful to make a cross on their foreheads.",
        bestTime: "September 27th",
        importance: "UNESCO Intangible Cultural Heritage",
        category: "cultural",
        lat: 9.0107,
        lng: 38.7612,
        highlights: ["Demera bonfire ceremony", "Meskel Square gathering", "White shamma procession", "Cross marking ritual"],
        entryFee: "Free",
        duration: "1-2 days"
    },
    {
        name: "Irreecha Festival",
        region: "Oromia Region",
        image: "../assets/irreecha.jpg",
        description: "Oromo thanksgiving festival celebrating the end of the rainy season. Thousands gather at Lake Hora to give thanks and welcome spring.",
        longDescription: "Irreecha is the most important cultural and thanksgiving festival of the Oromo people, Ethiopia's largest ethnic group. Celebrated at the end of the rainy season in September or October, Irreecha marks the transition from the dark and cold rainy season (Ganna) to the warm and bright spring season (Birra), symbolizing hope, peace, and the renewal of life. The largest celebration takes place at Lake Hora Arsadi (Lake Hora) near Bishoftu, where hundreds of thousands — sometimes over a million — Oromo from across Ethiopia and the diaspora gather. Participants dress in traditional Oromo attire, carry green grass and yellow Adey flowers (symbols of the new season), dip grass into the lake, and offer prayers of thanksgiving to Waaqa (God). The festival is marked by singing, dancing, and communal joy. Recognized by UNESCO as part of Ethiopia's Intangible Cultural Heritage.",
        bestTime: "September/October",
        importance: "Oromo cultural celebration",
        category: "cultural",
        lat: 8.7500,
        lng: 39.0000,
        highlights: ["Lake Hora gathering", "Adey flower offerings", "Traditional Oromo dress", "Mass thanksgiving"],
        entryFee: "Free",
        duration: "1-2 days"
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        await Destination.deleteMany({});
        console.log('Cleared existing destinations');

        await Destination.insertMany(destinations);
        console.log(`Seeded ${destinations.length} destinations`);

        await mongoose.disconnect();
        console.log('Done!');
    } catch (err) {
        console.error('Seed error:', err.message);
        process.exit(1);
    }
}

seed();
