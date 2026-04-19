import type {
  AnalyticsMetric,
  ComingSoonFeature,
  ContactEntity,
  FaqItem,
  HeatmapCell,
  LocationService,
  SatisfactionPoint,
  ServiceDemand,
} from "@/lib/types";

export const employees: ContactEntity[] = [
  {
    id: "emp-1",
    type: "employees",
    name: {
      uz: "Dilnoza Karimova",
      kir: "Дилноза Каримова",
      ru: "Дильноза Каримова",
      en: "Dilnoza Karimova",
    },
    title: {
      uz: "Fuqarolar bilan ishlash bo'yicha katta mutaxassis",
      kir: "Фуқаролар билан ишлаш бўйича катта мутахассис",
      ru: "Старший специалист по работе с гражданами",
      en: "Senior Citizen Service Officer",
    },
    department: {
      uz: "Jamoat xizmatlari bo'limi",
      kir: "Жамоат хизматлари бўлими",
      ru: "Отдел общественных услуг",
      en: "Public Services Desk",
    },
    description: {
      uz: "Fuqarolar murojaatlarini yo'naltiradi, arizalarni ko'rib chiqadi va tezkor eskalatsiyalarni boshqaradi.",
      kir: "Фуқаролар мурожаатларини йўналтиради, аризаларни кўриб чиқади ва тезкор эскалацияларни бошқаради.",
      ru: "Маршрутизирует обращения граждан, проверяет заявки и ведет срочные эскалации.",
      en: "Handles public service routing, request review, and urgent citizen escalations.",
    },
    availability: "online",
    workingHours: {
      uz: "Du-Ju: 09:00 - 18:00",
      kir: "Ду-Жу: 09:00 - 18:00",
      ru: "Пн-Пт: 09:00 - 18:00",
      en: "Mon-Fri: 09:00 - 18:00",
    },
    tags: [
      { uz: "pasport", kk: "pasport", kir: "паспорт", ru: "паспорт", en: "passport" },
      { uz: "nafaqa", kk: "nafaqa", kir: "нафақа", ru: "пособия", en: "benefits" },
      { uz: "ro'yxat", kk: "ro'yxat", kir: "рўйхат", ru: "регистрация", en: "registration" },
    ],
  },
  {
    id: "emp-2",
    type: "employees",
    name: {
      uz: "Akmal Islomov",
      kir: "Акмал Исломов",
      ru: "Акмал Исламов",
      en: "Akmal Islomov",
    },
    title: {
      uz: "Raqamli infratuzilma mutaxassisi",
      kir: "Рақамли инфратузилма мутахассиси",
      ru: "Специалист по цифровой инфраструктуре",
      en: "Digital Infrastructure Specialist",
    },
    department: {
      uz: "IT muvofiqlashtirish markazi",
      kir: "IT мувофиқлаштириш маркази",
      ru: "Центр IT-координации",
      en: "IT Coordination Unit",
    },
    description: {
      uz: "Portalga kirish, kiosk diagnostikasi va navbat tizimini sinxronlashtirish bo'yicha yordam beradi.",
      kir: "Порталга кириш, киоск диагностикаси ва навбат тизимини синхронлаштириш бўйича ёрдам беради.",
      ru: "Помогает с доступом к порталу, диагностикой киоска и синхронизацией электронной очереди.",
      en: "Supports portal access, kiosk diagnostics, and digital queue synchronization.",
    },
    availability: "offline",
    workingHours: {
      uz: "Du-Sha: 08:30 - 17:30",
      kir: "Ду-Ша: 08:30 - 17:30",
      ru: "Пн-Сб: 08:30 - 17:30",
      en: "Mon-Sat: 08:30 - 17:30",
    },
    tags: [
      { uz: "raqamli", kk: "raqamli", kir: "рақамли", ru: "цифровой", en: "digital" },
      { uz: "qo'llab-quvvatlash", kk: "qo'llab-quvvatlash", kir: "қўллаб-қувватлаш", ru: "поддержка", en: "support" },
      { uz: "navbat", kk: "navbat", kir: "навбат", ru: "очередь", en: "queue" },
    ],
  },
  {
    id: "emp-3",
    type: "employees",
    name: {
      uz: "Malika Tursunova",
      kir: "Малика Турсунова",
      ru: "Малика Турсунова",
      en: "Malika Tursunova",
    },
    title: {
      uz: "Masofaviy video konsultatsiya yetakchisi",
      kir: "Масофавий видео консультация етакчиси",
      ru: "Руководитель дистанционных видеоконсультаций",
      en: "Remote Video Consultation Lead",
    },
    department: {
      uz: "Video xizmat markazi",
      kir: "Видео хизмат маркази",
      ru: "Центр видеосервисов",
      en: "Video Service Center",
    },
    description: {
      uz: "Masofaviy va kiosk sessiyalari uchun xavfsiz video muloqotlarni tashkil etadi.",
      kir: "Масофавий ва киоск сессиялари учун хавфсиз видео мулоқотларни ташкил этади.",
      ru: "Проводит безопасные видеоконсультации для удаленных и киоск-сессий.",
      en: "Provides secure video consultations for remote and kiosk-based requests.",
    },
    availability: "online",
    workingHours: {
      uz: "Du-Ju: 10:00 - 19:00",
      kir: "Ду-Жу: 10:00 - 19:00",
      ru: "Пн-Пт: 10:00 - 19:00",
      en: "Mon-Fri: 10:00 - 19:00",
    },
    tags: [
      { uz: "video", kk: "video", kir: "видео", ru: "видео", en: "video" },
      { uz: "maslahat", kk: "maslahat", kir: "маслаҳат", ru: "консультация", en: "consultation" },
      { uz: "masofaviy", kk: "masofaviy", kir: "масофавий", ru: "удаленно", en: "remote" },
    ],
  },
];

export const organizations: ContactEntity[] = [
  {
    id: "org-1",
    type: "organizations",
    name: {
      uz: "Raqamli xizmatlar agentligi",
      kir: "Рақамли хизматлар агентлиги",
      ru: "Агентство цифровых услуг",
      en: "Digital Services Agency",
    },
    title: {
      uz: "Milliy raqamli xizmat platformasi operatori",
      kir: "Миллий рақамли хизмат платформаси оператори",
      ru: "Оператор национальной платформы цифровых услуг",
      en: "National digital citizen platform operator",
    },
    department: {
      uz: "Markaziy ofis",
      kir: "Марказий офис",
      ru: "Центральный офис",
      en: "Central Office",
    },
    description: {
      uz: "Raqamli davlat xizmatlari, identifikatsiya jarayonlari va integratsiyalarni muvofiqlashtiradi.",
      kir: "Рақамли давлат хизматлари, идентификация жараёнлари ва интеграцияларни мувофиқлаштиради.",
      ru: "Координирует цифровые госуслуги, идентификацию граждан и интеграции сервисов.",
      en: "Coordinates digital public services, citizen identity workflows, and service integrations.",
    },
    availability: "online",
    workingHours: {
      uz: "Du-Ju: 09:00 - 18:00",
      kir: "Ду-Жу: 09:00 - 18:00",
      ru: "Пн-Пт: 09:00 - 18:00",
      en: "Mon-Fri: 09:00 - 18:00",
    },
    tags: [
      { uz: "integratsiya", kk: "integratsiya", kir: "интеграция", ru: "интеграция", en: "integration" },
      { uz: "ID", kk: "ID", kir: "ID", ru: "ID", en: "identity" },
      { uz: "xizmatlar", kk: "xizmatlar", kir: "хизматлар", ru: "услуги", en: "services" },
    ],
  },
  {
    id: "org-2",
    type: "organizations",
    name: {
      uz: "Ijtimoiy qo'llab-quvvatlash boshqarmasi",
      kir: "Ижтимоий қўллаб-қувватлаш бошқармаси",
      ru: "Управление социальной поддержки",
      en: "Social Support Department",
    },
    title: {
      uz: "Nafaqa va ijtimoiy yordam ma'muriyati",
      kir: "Нафақа ва ижтимоий ёрдам маъмурияти",
      ru: "Администрирование пособий и социальной помощи",
      en: "Benefits and welfare administration",
    },
    department: {
      uz: "Hududiy tarmoq",
      kir: "Ҳудудий тармоқ",
      ru: "Региональная сеть",
      en: "Regional Network",
    },
    description: {
      uz: "Subsidiya, nafaqa va manzilli yordam masalalari bo'yicha ma'lumot beradi.",
      kir: "Субсидия, нафақа ва манзилли ёрдам масалалари бўйича маълумот беради.",
      ru: "Консультирует по субсидиям, пособиям и адресной социальной помощи.",
      en: "Answers questions related to subsidies, benefits, and targeted social assistance.",
    },
    availability: "offline",
    workingHours: {
      uz: "Du-Ju: 09:00 - 17:00",
      kir: "Ду-Жу: 09:00 - 17:00",
      ru: "Пн-Пт: 09:00 - 17:00",
      en: "Mon-Fri: 09:00 - 17:00",
    },
    tags: [
      { uz: "ijtimoiy", kk: "ijtimoiy", kir: "ижтимоий", ru: "социальный", en: "social" },
      { uz: "nafaqa", kk: "nafaqa", kir: "нафақа", ru: "пособия", en: "benefits" },
      { uz: "yordam", kk: "yordam", kir: "ёрдам", ru: "поддержка", en: "support" },
    ],
  },
  {
    id: "org-3",
    type: "organizations",
    name: {
      uz: "FHDYO va reyestr ofisi",
      kir: "ФҲДЁ ва реестр офиси",
      ru: "Офис ЗАГС и реестра",
      en: "Civil Registry Office",
    },
    title: {
      uz: "Ro'yxatga olish va rasmiy yozuvlar xizmati",
      kir: "Рўйхатга олиш ва расмий ёзувлар хизмати",
      ru: "Служба регистрации и официальных записей",
      en: "Registration and official record services",
    },
    department: {
      uz: "Fuqarolar reyestri",
      kir: "Фуқаролар реестри",
      ru: "Гражданский реестр",
      en: "Citizen Registry",
    },
    description: {
      uz: "Tug'ilganlik yozuvlari, yashash joyi ma'lumotlari va ro'yxatga olish masalalariga xizmat ko'rsatadi.",
      kir: "Туғилганлик ёзувлари, яшаш жойи маълумотлари ва рўйхатга олиш масалаларига хизмат кўрсатади.",
      ru: "Поддерживает вопросы актовых записей, адресной регистрации и официальных изменений.",
      en: "Supports requests for birth records, residence updates, and legal registration matters.",
    },
    availability: "online",
    workingHours: {
      uz: "Du-Sha: 08:00 - 18:00",
      kir: "Ду-Ша: 08:00 - 18:00",
      ru: "Пн-Сб: 08:00 - 18:00",
      en: "Mon-Sat: 08:00 - 18:00",
    },
    tags: [
      { uz: "reyestr", kk: "reyestr", kir: "реестр", ru: "реестр", en: "registry" },
      { uz: "hujjatlar", kk: "hujjatlar", kir: "ҳужжатлар", ru: "документы", en: "documents" },
      { uz: "yozuvlar", kk: "yozuvlar", kir: "ёзувлар", ru: "записи", en: "records" },
    ],
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    category: "services",
    question: {
      uz: "Murojaat yuborish uchun qanday hujjatlar kerak?",
      kir: "Мурожаат юбориш учун қандай ҳужжатлар керак?",
      ru: "Какие документы нужны для подачи обращения?",
      en: "Which documents are needed to submit a request?",
    },
    answer: {
      uz: "Kerakli hujjatlar xizmat turiga bog'liq. Kiosk tanlangan yo'nalish uchun mos ro'yxatni ko'rsatadi.",
      kir: "Керакли ҳужжатлар хизмат турига боғлиқ. Киоск танланган йўналиш учун мос рўйхатни кўрсатади.",
      ru: "Необходимые документы зависят от типа услуги. Киоск покажет точный список после выбора направления.",
      en: "Required documents depend on the service type. The kiosk shows the exact list after you choose a request path.",
    },
  },
  {
    id: "faq-2",
    category: "payments",
    question: {
      uz: "To'lovlarni kiosk orqali amalga oshirish mumkinmi?",
      kir: "Тўловларни киоск орқали амалга ошириш мумкинми?",
      ru: "Можно ли оплатить услуги через киоск?",
      en: "Can I pay for services through the kiosk?",
    },
    answer: {
      uz: "Ha, mos xizmatlar uchun xavfsiz to'lov bosqichi mavjud.",
      kir: "Ҳа, мос хизматлар учун хавфсиз тўлов босқичи мавжуд.",
      ru: "Да, для подходящих услуг доступен защищенный платежный шаг.",
      en: "Yes. Eligible services include a secure payment step in the kiosk flow.",
    },
  },
  {
    id: "faq-3",
    category: "security",
    question: {
      uz: "Video habar yuborish xavfsizmi?",
      kir: "Видео хабар юбориш хавфсизми?",
      ru: "Безопасна ли отправка видеосообщений?",
      en: "Is video messaging secure?",
    },
    answer: {
      uz: "Barcha matnli va video habarlar himoyalangan aloqa kanallari orqali uzatiladi.",
      kir: "Барча матнли ва видео хабарлар ҳимояланган алоқа каналлари орқали узатилади.",
      ru: "Все текстовые и видеосообщения передаются по защищенным каналам связи.",
      en: "All text and video messages are transmitted over protected communication channels.",
    },
  },
  {
    id: "faq-4",
    category: "services",
    question: {
      uz: "Murojaat holatini qanday tekshiraman?",
      kir: "Мурожаат ҳолатини қандай текшираман?",
      ru: "Как проверить статус обращения?",
      en: "How do I check my request status?",
    },
    answer: {
      uz: "Tanlangan xodim yoki tashkilot profili orqali murojaat identifikatori bilan holatni ko'rishingiz mumkin.",
      kir: "Танланган ходим ёки ташкилот профили орқали мурожаат идентификатори билан ҳолатни кўришингиз мумкин.",
      ru: "Статус можно проверить по идентификатору обращения в профиле выбранного сотрудника или организации.",
      en: "You can check status using your request reference in the selected employee or organization profile.",
    },
  },
];

export const analyticsMetrics: AnalyticsMetric[] = [
  {
    id: "requests",
    label: {
      uz: "Jami murojaatlar",
      kir: "Жами мурожаатлар",
      ru: "Всего обращений",
      en: "Total requests",
    },
    today: 248,
    week: 1742,
    month: 7140,
    trend: 12.8,
  },
  {
    id: "users",
    label: {
      uz: "Faol foydalanuvchilar",
      kir: "Фаол фойдаланувчилар",
      ru: "Активные пользователи",
      en: "Active users",
    },
    today: 128,
    week: 882,
    month: 3640,
    trend: 7.4,
  },
];

export const mostRequestedServices: ServiceDemand[] = [
  {
    id: "passport",
    label: {
      uz: "Pasport va ID yangilash",
      kir: "Паспорт ва ID янгилаш",
      ru: "Обновление паспорта и ID",
      en: "Passport and ID renewal",
    },
    requests: 432,
    completionRate: 94,
  },
  {
    id: "benefits",
    label: {
      uz: "Ijtimoiy yordam arizalari",
      kir: "Ижтимоий ёрдам аризалари",
      ru: "Заявки на социальную помощь",
      en: "Social support applications",
    },
    requests: 376,
    completionRate: 88,
  },
  {
    id: "registry",
    label: {
      uz: "FHDYO va reyestr xizmatlari",
      kir: "ФҲДЁ ва реестр хизматлари",
      ru: "Услуги ЗАГС и реестра",
      en: "Civil registry services",
    },
    requests: 291,
    completionRate: 91,
  },
];

export const weeklySatisfaction: SatisfactionPoint[] = [
  { label: "Mon", value: 4.3 },
  { label: "Tue", value: 4.5 },
  { label: "Wed", value: 4.6 },
  { label: "Thu", value: 4.4 },
  { label: "Fri", value: 4.7 },
  { label: "Sat", value: 4.2 },
  { label: "Sun", value: 4.1 },
];

export const monthlyReport = [58, 66, 63, 72, 76, 84, 88, 92, 96, 103, 99, 108];

export const usageHeatmap: HeatmapCell[] = [
  { day: "Mon", hour: "09", level: 2 },
  { day: "Mon", hour: "12", level: 4 },
  { day: "Mon", hour: "15", level: 5 },
  { day: "Tue", hour: "09", level: 3 },
  { day: "Tue", hour: "12", level: 5 },
  { day: "Tue", hour: "15", level: 4 },
  { day: "Wed", hour: "09", level: 2 },
  { day: "Wed", hour: "12", level: 3 },
  { day: "Wed", hour: "15", level: 5 },
  { day: "Thu", hour: "09", level: 3 },
  { day: "Thu", hour: "12", level: 4 },
  { day: "Thu", hour: "15", level: 5 },
  { day: "Fri", hour: "09", level: 4 },
  { day: "Fri", hour: "12", level: 5 },
  { day: "Fri", hour: "15", level: 4 },
  { day: "Sat", hour: "09", level: 1 },
  { day: "Sat", hour: "12", level: 2 },
  { day: "Sat", hour: "15", level: 2 },
];

export const locationServices: LocationService[] = [
  {
    id: "loc-1",
    region: {
      uz: "Toshkent shahri",
      kir: "Тошкент шаҳри",
      ru: "Город Ташкент",
      en: "Tashkent City",
    },
    service: {
      uz: "Raqamli ID konsultatsiyasi",
      kir: "Рақамли ID консультацияси",
      ru: "Консультация по цифровому ID",
      en: "Digital ID consultation",
    },
    distanceKm: 1.2,
    etaMinutes: 4,
    availability: "online",
  },
  {
    id: "loc-2",
    region: {
      uz: "Yunusobod tumani",
      kir: "Юнусобод тумани",
      ru: "Юнусабадский район",
      en: "Yunusabad District",
    },
    service: {
      uz: "Ijtimoiy yordam qabul oynasi",
      kir: "Ижтимоий ёрдам қабул ойнаси",
      ru: "Окно приема социальной помощи",
      en: "Social support intake desk",
    },
    distanceKm: 3.8,
    etaMinutes: 11,
    availability: "offline",
  },
  {
    id: "loc-3",
    region: {
      uz: "Mirzo Ulug'bek tumani",
      kir: "Мирзо Улуғбек тумани",
      ru: "Мирзо-Улугбекский район",
      en: "Mirzo Ulugbek District",
    },
    service: {
      uz: "Reyestr xizmatlari kioski",
      kir: "Реестр хизматлари киоски",
      ru: "Киоск реестровых услуг",
      en: "Registry services kiosk",
    },
    distanceKm: 2.6,
    etaMinutes: 8,
    availability: "online",
  },
];

export const comingSoonFeatures: ComingSoonFeature[] = [
  {
    id: "ai-assistant",
    title: {
      uz: "AI yordamchi",
      kir: "AI ёрдамчи",
      ru: "AI ассистент",
      en: "AI Assistant",
    },
    description: {
      uz: "Chat asosidagi yordam va murojaatga yo'naltirish xizmati.",
      kir: "Чат асосидаги ёрдам ва мурожаатга йўналтириш хизмати.",
      ru: "Чат-помощь и интеллектуальная маршрутизация обращений.",
      en: "Chat-based help and intelligent request guidance.",
    },
  },
  {
    id: "live-analytics",
    title: {
      uz: "Jonli analitika tizimi",
      kir: "Жонли аналитика тизими",
      ru: "Система живой аналитики",
      en: "Live analytics system",
    },
    description: {
      uz: "Real vaqt rejimida xizmat samaradorligini monitoring qilish.",
      kir: "Реал вақт режимида хизмат самарадорлигини мониторинг қилиш.",
      ru: "Мониторинг эффективности услуг в реальном времени.",
      en: "Real-time service performance monitoring.",
    },
  },
  {
    id: "recommendations",
    title: {
      uz: "Aqlli tavsiyalar",
      kir: "Ақлли тавсиялар",
      ru: "Умные рекомендации",
      en: "Smart recommendations",
    },
    description: {
      uz: "Fuqarolarga ehtiyojiga mos xizmatlarni avtomatik tavsiya qilish.",
      kir: "Фуқароларга эҳтиёжига мос хизматларни автоматик тавсия қилиш.",
      ru: "Автоматический подбор подходящих услуг для граждан.",
      en: "Automatically recommend the most relevant services to citizens.",
    },
  },
];
