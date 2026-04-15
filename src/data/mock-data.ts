import type { ContactEntity, FaqItem } from "@/lib/types";

export const employees: ContactEntity[] = [
  {
    id: "emp-1",
    type: "employees",
    name: "Dilnoza Karimova",
    title: "Senior Citizen Service Officer",
    department: "Public Services Desk",
    description: "Handles public service routing, submission review, and urgent citizen escalations.",
    availability: "online",
    workingHours: "Mon-Fri: 09:00 - 18:00",
    tags: ["passport", "benefits", "registration"],
  },
  {
    id: "emp-2",
    type: "employees",
    name: "Akmal Islomov",
    title: "Digital Infrastructure Specialist",
    department: "IT Coordination Unit",
    description: "Supports portal access, kiosk troubleshooting, and digital queue synchronization.",
    availability: "offline",
    workingHours: "Mon-Sat: 08:30 - 17:30",
    tags: ["digital", "support", "queue"],
  },
  {
    id: "emp-3",
    type: "employees",
    name: "Malika Tursunova",
    title: "Remote Video Consultation Lead",
    department: "Video Service Center",
    description: "Provides secure video consultations for remote and kiosk-based requests.",
    availability: "online",
    workingHours: "Mon-Fri: 10:00 - 19:00",
    tags: ["video", "consultation", "remote"],
  },
];

export const organizations: ContactEntity[] = [
  {
    id: "org-1",
    type: "organizations",
    name: "Digital Services Agency",
    title: "National digital citizen platform operator",
    department: "Central Office",
    description: "Coordinates digital public services, citizen identity workflows, and service integrations.",
    availability: "online",
    workingHours: "Mon-Fri: 09:00 - 18:00",
    tags: ["digital", "identity", "integration"],
  },
  {
    id: "org-2",
    type: "organizations",
    name: "Social Support Department",
    title: "Benefits and welfare administration",
    department: "Regional Network",
    description: "Answers questions related to subsidies, benefits, and targeted social assistance.",
    availability: "offline",
    workingHours: "Mon-Fri: 09:00 - 17:00",
    tags: ["social", "benefits", "support"],
  },
  {
    id: "org-3",
    type: "organizations",
    name: "Civil Registry Office",
    title: "Registration and official record services",
    department: "Citizen Registry",
    description: "Supports requests for birth records, residence updates, and legal registration matters.",
    availability: "online",
    workingHours: "Mon-Sat: 08:00 - 18:00",
    tags: ["registry", "records", "documents"],
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    category: "services",
    question: {
      uz: "Murojaat yuborish uchun qanday hujjatlar kerak?",
      ru: "Какие документы нужны для подачи обращения?",
      en: "Which documents are needed to submit a request?",
    },
    answer: {
      uz: "Talab etiladigan hujjatlar xizmat turiga bog'liq. Kiosk siz tanlagan yo'nalishga qarab kerakli ro'yxatni ko'rsatadi.",
      ru: "Необходимые документы зависят от типа услуги. Киоск покажет нужный список после выбора направления.",
      en: "Required documents depend on the service type. The kiosk shows the exact list after you choose a request path.",
    },
  },
  {
    id: "faq-2",
    category: "payments",
    question: {
      uz: "To'lovlar kiosk orqali amalga oshiriladimi?",
      ru: "Можно ли оплатить услуги через киоск?",
      en: "Can I pay for services through the kiosk?",
    },
    answer: {
      uz: "Ha, mos xizmatlar uchun to'lov oynasi mavjud va xavfsiz to'lov provayderlari orqali ishlaydi.",
      ru: "Да, для подходящих услуг доступно окно оплаты через защищенных провайдеров.",
      en: "Yes. Eligible services can be paid through a secure payment step in the kiosk flow.",
    },
  },
  {
    id: "faq-3",
    category: "security",
    question: {
      uz: "Video qo'ng'iroqlar xavfsizmi?",
      ru: "Безопасны ли видеозвонки?",
      en: "Are video calls secure?",
    },
    answer: {
      uz: "Barcha audio va video sessiyalar himoyalangan kanal orqali amalga oshiriladi va xizmat sifati monitoringi uchun qayd etilishi mumkin.",
      ru: "Все аудио- и видеосессии проходят по защищенному каналу и могут записываться для контроля качества.",
      en: "All audio and video sessions run over a protected channel and may be recorded for service quality monitoring.",
    },
  },
  {
    id: "faq-4",
    category: "services",
    question: {
      uz: "Ariza holatini qanday tekshiraman?",
      ru: "Как проверить статус обращения?",
      en: "How do I check my request status?",
    },
    answer: {
      uz: "Operator yoki tashkilot profili orqali murojaat identifikatori yordamida holatni ko'rishingiz mumkin.",
      ru: "Статус можно посмотреть по идентификатору обращения в профиле оператора или организации.",
      en: "You can check status using your request reference in the selected employee or organization profile.",
    },
  },
];
