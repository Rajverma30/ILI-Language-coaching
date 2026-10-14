export type UiLanguage = "en" | "es" | "de" | "fr" | "hi";

export interface FormTranslation {
  langCode: UiLanguage;
  langName: string;
  flag: string;
  quickTestMode: string;
  oneClickTest: string;
  autofillFound: string;
  autoFillBtn: string;
  offerReservedTitle: string;
  offerReservedDesc: string;
  reopenBtn: string;
  instituteTitle: string;
  campusBadge: string;
  nameLabel: string;
  namePlaceholder: string;
  nameAutoFillHint: string;
  nameError: string;
  phoneLabel: string;
  phoneDigitsHint: string;
  phoneSecurityNote: string;
  phoneError: string;
  languageSelectLabel: string;
  selectedText: string;
  modeLabel: string;
  offlineModeTitle: string;
  offlineModeSubtitle: string;
  onlineModeTitle: string;
  onlineModeSubtitle: string;
  goalLabel: string;
  goals: {
    job: string;
    exam: string;
    career: string;
    hobby: string;
  };
  emailLabel: string;
  emailHint: string;
  trackingSource: string;
  submitCta: string;
  submittingText: string;
  trustNoSpam: string;
  trustRating: string;
  trustAlumni: string;
  campusFooterTitle: string;
  campusAddress: string;
  campusHelpline: string;
  successRegisteredBadge: string;
  successTitle: string;
  successDesc: string;
  summaryName: string;
  summaryPhone: string;
  summaryCourse: string;
  summarySource: string;
  chatWhatsAppBtn: string;
  fillAnotherBtn: string;
  languages: {
    German: { label: string; highlight: string };
    French: { label: string; highlight: string };
    Spanish: { label: string; highlight: string };
    Japanese: { label: string; highlight: string };
    English: { label: string; highlight: string };
    Italian: { label: string; highlight: string };
    Russian: { label: string; highlight: string };
    Chinese: { label: string; highlight: string };
  };
  platforms: {
    instagram: { badge: string; title: string; subtitle: string };
    whatsapp: { badge: string; title: string; subtitle: string };
    youtube: { badge: string; title: string; subtitle: string };
    telegram: { badge: string; title: string; subtitle: string };
    default: { badge: string; title: string; subtitle: string };
  };
}

export const FORM_TRANSLATIONS: Record<UiLanguage, FormTranslation> = {
  // 1. ENGLISH (Default)
  en: {
    langCode: "en",
    langName: "English",
    flag: "🇬🇧",
    quickTestMode: "Quick Testing Mode:",
    oneClickTest: "⚡ 1-Click Test Fill",
    autofillFound: "Your previous details were detected. Auto-fill them?",
    autoFillBtn: "Auto Fill",
    offerReservedTitle: "Special Demo Seat Reserved for You!",
    offerReservedDesc: "Your trial lecture slot and syllabus discount are saved for 15 minutes.",
    reopenBtn: "Re-open Inquiry Form",
    instituteTitle: "ILI Foreign Languages Institute",
    campusBadge: "Apollo Tower, MG Road, Indore",
    nameLabel: "Full Name",
    namePlaceholder: "e.g. Alex Rivera",
    nameAutoFillHint: "Auto-fills from mobile",
    nameError: "Please enter your full name.",
    phoneLabel: "WhatsApp / Mobile Number",
    phoneDigitsHint: "10-digit number",
    phoneSecurityNote: "🔒 100% Confidential. Trial demo link & syllabus sent via WhatsApp.",
    phoneError: "Please enter a valid 10-digit mobile number.",
    languageSelectLabel: "Which foreign language do you want to learn?",
    selectedText: "Selected",
    modeLabel: "Choose Learning Format",
    offlineModeTitle: "🏢 Indore Classroom Batch",
    offlineModeSubtitle: "Apollo Tower, MG Road",
    onlineModeTitle: "💻 Live Online Interactive",
    onlineModeSubtitle: "Join live from anywhere",
    goalLabel: "Your Primary Learning Goal",
    goals: {
      job: "Job / Study Abroad in Germany, France, Spain & EU",
      exam: "Official Certification Prep (Goethe / DELF / DELE / JLPT)",
      career: "Corporate / IT / MNC Career Acceleration",
      hobby: "Personal Interest, International Travel & Culture",
    },
    emailLabel: "Email Address",
    emailHint: "(Optional - for course syllabus PDF)",
    trackingSource: "Campaign Source:",
    submitCta: "Book Demo Session & Fee Structure",
    submittingText: "Reserving your demo seat...",
    trustNoSpam: "No Spam Guarantee",
    trustRating: "⭐ 4.9/5 Rating (Indore)",
    trustAlumni: "1,200+ Alumni",
    campusFooterTitle: "ILI Foreign Languages Institute",
    campusAddress: "205-208 Apollo Tower, 2 MG Road, South Tukoganj, Indore (MP)",
    campusHelpline: "Call / WhatsApp Helpline: +91 98260 12345",
    successRegisteredBadge: "Inquiry Registered via",
    successTitle: "Thank You",
    successDesc:
      "Your inquiry has been successfully registered. Our senior language advisor will reach out to you within 15 minutes.",
    summaryName: "Student Name:",
    summaryPhone: "WhatsApp / Phone:",
    summaryCourse: "Selected Program:",
    summarySource: "Campaign Origin:",
    chatWhatsAppBtn: "Chat on WhatsApp Instantly",
    fillAnotherBtn: "Submit another inquiry",
    languages: {
      German: { label: "German", highlight: "Most Popular • A1 to C1" },
      French: { label: "French", highlight: "DELF & TEF Canada" },
      Spanish: { label: "Spanish", highlight: "DELE • Fast Track" },
      Japanese: { label: "Japanese", highlight: "JLPT N5 to N2" },
      English: { label: "Spoken English", highlight: "Fluency & IELTS" },
      Italian: { label: "Italian", highlight: "Conversational" },
      Russian: { label: "Russian", highlight: "Standard Level" },
      Chinese: { label: "Mandarin Chinese", highlight: "HSK Certified" },
    },
    platforms: {
      instagram: {
        badge: "Instagram Ad Special",
        title: "Instagram Special: Foreign Language Demo Session",
        subtitle: "📸 Book Demo Class + Course Syllabus PDF + Career Counseling",
      },
      whatsapp: {
        badge: "WhatsApp Direct Desk",
        title: "Fast 30-Sec Foreign Language Inquiry",
        subtitle: "💬 Get batch schedules, syllabus PDF and fee structure directly on WhatsApp.",
      },
      youtube: {
        badge: "YouTube Viewer Pass",
        title: "YouTube Viewers: Language Demo & Syllabus PDF",
        subtitle: "▶️ Access beginner study notes + live interactive demo lecture.",
      },
      telegram: {
        badge: "Telegram Priority Admission",
        title: "Telegram Members: Fast-Track Language Desk",
        subtitle: "✈️ Reserve your seat in upcoming German, French, Spanish & Japanese batches.",
      },
      default: {
        badge: "Language Admissions Desk",
        title: "Start Your Global Language Journey",
        subtitle: "🌟 Language Counseling & Demo Class Registration with certified trainers.",
      },
    },
  },

  // 2. SPANISH (Español) - Automatically adapts if user's browser language is Spanish!
  es: {
    langCode: "es",
    langName: "Español",
    flag: "🇪🇸",
    quickTestMode: "Modo de Prueba Rápida:",
    oneClickTest: "⚡ Rellenar Prueba (1 Clic)",
    autofillFound: "Se detectaron tus datos anteriores. ¿Deseas autorrellenar?",
    autoFillBtn: "Autorrellenar",
    offerReservedTitle: "¡Plaza de Prueba Reservada para Ti!",
    offerReservedDesc: "Tu clase de prueba gratuita y descuento de matrícula están reservados por 15 minutos.",
    reopenBtn: "Reabrir Formulario de Solicitud",
    instituteTitle: "Instituto de Idiomas Extranjeros ILI",
    campusBadge: "Apollo Tower, MG Road, Indore",
    nameLabel: "Nombre y Apellidos",
    namePlaceholder: "ej. Carlos Santana",
    nameAutoFillHint: "Autorrellena desde el móvil",
    nameError: "Por favor, introduce tu nombre completo.",
    phoneLabel: "WhatsApp / Teléfono Móvil",
    phoneDigitsHint: "Número de 10 dígitos",
    phoneSecurityNote: "🔒 100% Confidencial. Enlace de clase de prueba y temario enviados por WhatsApp.",
    phoneError: "Por favor, introduce un número de teléfono válido de 10 dígitos.",
    languageSelectLabel: "¿Qué idioma extranjero deseas aprender?",
    selectedText: "Seleccionado",
    modeLabel: "Selecciona Modalidad de Estudio",
    offlineModeTitle: "🏢 Presencial en Indore",
    offlineModeSubtitle: "Apollo Tower, MG Road",
    onlineModeTitle: "💻 En Vivo Online Interactivo",
    onlineModeSubtitle: "Únete en directo desde cualquier lugar",
    goalLabel: "Tu Objetivo Principal de Aprendizaje",
    goals: {
      job: "Empleo / Estudios en el Extranjero (Alemania, Francia, etc.)",
      exam: "Certificación Oficial Internacional (DELE / Goethe / DELF / JLPT)",
      career: "Desarrollo Profesional / Empresas Multinacionales",
      hobby: "Interés Personal, Cultura y Viajes Internacionales",
    },
    emailLabel: "Correo Electrónico",
    emailHint: "(Opcional - para enviar PDF del programa)",
    trackingSource: "Origen del Anuncio:",
    submitCta: "Reservar Clase de Prueba Gratis y Tarifas",
    submittingText: "Asegurando tu plaza de prueba...",
    trustNoSpam: "Garantía Sin Spam",
    trustRating: "⭐ Valoración 4.9/5 (Indore)",
    trustAlumni: "Más de 1,200 Alumnos",
    campusFooterTitle: "Instituto de Idiomas Extranjeros ILI",
    campusAddress: "205-208 Apollo Tower, 2 MG Road, South Tukoganj, Indore (MP)",
    campusHelpline: "Teléfono / WhatsApp de Admisiones: +91 98260 12345",
    successRegisteredBadge: "Solicitud Registrada vía",
    successTitle: "¡Muchas Gracias",
    successDesc:
      "Tu solicitud ha sido recibida con éxito. Nuestro asesor de idiomas se comunicará contigo por WhatsApp o llamada en menos de 15 minutos.",
    summaryName: "Nombre del Alumno:",
    summaryPhone: "WhatsApp / Teléfono:",
    summaryCourse: "Programa Seleccionado:",
    summarySource: "Campaña de Origen:",
    chatWhatsAppBtn: "Chatear por WhatsApp Ahora Mismo",
    fillAnotherBtn: "Enviar otra consulta",
    languages: {
      German: { label: "Alemán", highlight: "Más Popular • A1 a C1" },
      French: { label: "Francés", highlight: "DELF y TEF Canadá" },
      Spanish: { label: "Español", highlight: "DELE • Vía Rápida" },
      Japanese: { label: "Japonés", highlight: "JLPT N5 a N2" },
      English: { label: "Inglés Hablado", highlight: "Fluidez e IELTS" },
      Italian: { label: "Italiano", highlight: "Conversacional" },
      Russian: { label: "Ruso", highlight: "Nivel Estándar" },
      Chinese: { label: "Chino Mandarín", highlight: "Certificado HSK" },
    },
    platforms: {
      instagram: {
        badge: "Especial Instagram Ads",
        title: "Exclusivo de Instagram: Clase de Prueba Gratuita",
        subtitle: "📸 Consigue 1 clase de prueba + temario completo en PDF + asesoría personalizada",
      },
      whatsapp: {
        badge: "Atención Rápida WhatsApp",
        title: "Consulta Rápida de Idiomas (30 Seg)",
        subtitle: "💬 Recibe horarios de grupo, temario en PDF y tarifas directamente por WhatsApp.",
      },
      youtube: {
        badge: "Pase Especial YouTube",
        title: "Espectadores de YouTube: Clase de Prueba + Guía PDF",
        subtitle: "▶️ Acceso gratuito a material didáctico inicial + 1 clase interactiva en directo.",
      },
      telegram: {
        badge: "Vía Rápida Telegram",
        title: "Comunidad de Telegram: Admisión Prioritaria",
        subtitle: "✈️ Reserva tu plaza en los próximos grupos de Alemán, Francés, Español y Japonés.",
      },
      default: {
        badge: "Admisiones de Idiomas",
        title: "Comienza Tu Aprendizaje de Idiomas",
        subtitle: "🌟 Asesoría lingüística gratuita e inscripción a clase de prueba con profesores certificados.",
      },
    },
  },

  // 3. GERMAN (Deutsch)
  de: {
    langCode: "de",
    langName: "Deutsch",
    flag: "🇩🇪",
    quickTestMode: "Schnelltest-Modus:",
    oneClickTest: "⚡ 1-Klick Testdaten",
    autofillFound: "Frühere Angaben erkannt. Automatisch ausfüllen?",
    autoFillBtn: "Auto-Fill",
    offerReservedTitle: "Kostenloser Schnupperplatz Reserviert!",
    offerReservedDesc: "Ihr Probestundenplatz und Lehrplanrabatt sind für 15 Minuten reserviert.",
    reopenBtn: "Formular erneut öffnen",
    instituteTitle: "ILI Fremdspracheninstitut",
    campusBadge: "Apollo Tower, MG Road, Indore",
    nameLabel: "Vollständiger Name",
    namePlaceholder: "z.B. Markus Weber",
    nameAutoFillHint: "Auto-Fill vom Handy",
    nameError: "Bitte geben Sie Ihren vollständigen Namen ein.",
    phoneLabel: "WhatsApp / Mobilnummer",
    phoneDigitsHint: "10-stellige Handynummer",
    phoneSecurityNote: "🔒 100% Vertraulich. Probestunden-Link & Lehrplan werden per WhatsApp gesendet.",
    phoneError: "Bitte geben Sie eine gültige 10-stellige Telefonnummer ein.",
    languageSelectLabel: "Welche Fremdsprache möchten Sie lernen?",
    selectedText: "Ausgewählt",
    modeLabel: "Lernformat wählen",
    offlineModeTitle: "🏢 Präsenzunterricht Indore",
    offlineModeSubtitle: "Apollo Tower, MG Road",
    onlineModeTitle: "💻 Live Online Interaktiv",
    onlineModeSubtitle: "Live teilnehmen von überall",
    goalLabel: "Ihr Hauptziel beim Sprachenlernen",
    goals: {
      job: "Beruf / Studium in Deutschland, Frankreich, Spanien oder EU",
      exam: "Offizielle Prüfungsvorbereitung (Goethe / TestDaF / DELF / DELE)",
      career: "Karriereförderung in internationalen Unternehmen",
      hobby: "Persönliches Interesse, Kultur und Reisen",
    },
    emailLabel: "E-Mail-Adresse",
    emailHint: "(Optional - für Lehrplan-PDF)",
    trackingSource: "Kampagnen-Quelle:",
    submitCta: "Kostenlose Probestunde & Gebühren anfordern",
    submittingText: "Probestunde wird reserviert...",
    trustNoSpam: "Keine-Spam-Garantie",
    trustRating: "⭐ 4.9/5 Bewertung (Indore)",
    trustAlumni: "Über 1.200 Absolventen",
    campusFooterTitle: "ILI Fremdspracheninstitut",
    campusAddress: "205-208 Apollo Tower, 2 MG Road, South Tukoganj, Indore (MP)",
    campusHelpline: "Beratung Helpline: +91 98260 12345",
    successRegisteredBadge: "Anfrage Registriert über",
    successTitle: "Vielen Dank",
    successDesc:
      "Ihre Anfrage wurde erfolgreich übermittelt. Unser Studienberater kontaktiert Sie innerhalb von 15 Minuten per WhatsApp.",
    summaryName: "Name des Teilnehmers:",
    summaryPhone: "WhatsApp / Telefon:",
    summaryCourse: "Gewähltes Programm:",
    summarySource: "Kampagnen-Herkunft:",
    chatWhatsAppBtn: "Sofort auf WhatsApp chatten",
    fillAnotherBtn: "Weitere Anfrage stellen",
    languages: {
      German: { label: "Deutsch", highlight: "Beliebteste Sprache • A1 bis C1" },
      French: { label: "Französisch", highlight: "DELF & TEF Kanada" },
      Spanish: { label: "Spanisch", highlight: "DELE • Intensivkurs" },
      Japanese: { label: "Japanisch", highlight: "JLPT N5 bis N2" },
      English: { label: "Englisch", highlight: "Fluency & IELTS" },
      Italian: { label: "Italienisch", highlight: "Konversation" },
      Russian: { label: "Russisch", highlight: "Standardkurs" },
      Chinese: { label: "Chinesisch (Mandarin)", highlight: "HSK Zertifiziert" },
    },
    platforms: {
      instagram: {
        badge: "Instagram Spezial",
        title: "Instagram Exklusiv: Kostenlose Probestunde",
        subtitle: "📸 1 kostenlose Probestunde + kompletter Lehrplan als PDF + Karriereberatung",
      },
      whatsapp: {
        badge: "WhatsApp Direktservice",
        title: "Schnelle 30-Sekunden Sprachanfrage",
        subtitle: "💬 Kurszeiten, Lehrplan-PDF und Gebührenstruktur direkt per WhatsApp erhalten.",
      },
      youtube: {
        badge: "YouTube Zuschauer-Pass",
        title: "YouTube Zuschauer: Kostenlose Probestunde & PDF",
        subtitle: "▶️ Kostenloser Zugang zu Lernunterlagen für Einsteiger + 1 interaktive Probestunde.",
      },
      telegram: {
        badge: "Telegram Schnellzugang",
        title: "Telegram Mitglieder: Bevorzugte Anmeldung",
        subtitle: "✈️ Sichern Sie sich Ihren Platz in den neuen Kursen für Deutsch, Französisch, Spanisch & Japanisch.",
      },
      default: {
        badge: "Sprachberatung & Anmeldung",
        title: "Starten Sie Ihre Sprachreise",
        subtitle: "🌟 Kostenlose Beratung und Probestunden-Anmeldung mit zertifizierten Dozenten.",
      },
    },
  },

  // 4. FRENCH (Français)
  fr: {
    langCode: "fr",
    langName: "Français",
    flag: "🇫🇷",
    quickTestMode: "Mode Test Rapide:",
    oneClickTest: "⚡ Remplir Test (1 Clic)",
    autofillFound: "Vos informations précédentes ont été trouvées. Remplir automatiquement?",
    autoFillBtn: "Remplir",
    offerReservedTitle: "Place d'Essai Gratuite Réservée pour Vous!",
    offerReservedDesc: "Votre cours d'essai gratuit et votre réduction de scolarité sont réservés pendant 15 minutes.",
    reopenBtn: "Rouvrir le Formulaire",
    instituteTitle: "Institut de Langues Étrangères ILI",
    campusBadge: "Apollo Tower, MG Road, Indore",
    nameLabel: "Nom Complet",
    namePlaceholder: "ex. Jean Dupont",
    nameAutoFillHint: "Remplissage auto depuis mobile",
    nameError: "Veuillez entrer votre nom complet.",
    phoneLabel: "WhatsApp / Téléphone Portable",
    phoneDigitsHint: "Numéro à 10 chiffres",
    phoneSecurityNote: "🔒 100% Confidentiel. Lien de cours d'essai et programme envoyés par WhatsApp.",
    phoneError: "Veuillez entrer un numéro de téléphone valide à 10 chiffres.",
    languageSelectLabel: "Quelle langue étrangère souhaitez-vous apprendre?",
    selectedText: "Sélectionné",
    modeLabel: "Format d'Apprentissage",
    offlineModeTitle: "🏢 Présentiel à Indore",
    offlineModeSubtitle: "Apollo Tower, MG Road",
    onlineModeTitle: "💻 En Direct Interactif en Ligne",
    onlineModeSubtitle: "Rejoignez en direct depuis n'importe où",
    goalLabel: "Votre Objectif Principal",
    goals: {
      job: "Travail / Études à l'Étranger (Allemagne, France, Canada, etc.)",
      exam: "Certification Officielle (DELF / DALF / Goethe / DELE / JLPT)",
      career: "Évolution Professionnelle en Entreprise Internationale",
      hobby: "Intérêt Personnel, Culture et Voyages",
    },
    emailLabel: "Adresse E-mail",
    emailHint: "(Facultatif - pour recevoir le programme PDF)",
    trackingSource: "Source de la Campagne:",
    submitCta: "Réserver Cours d'Essai Gratuit & Tarifs",
    submittingText: "Réservation de votre place en cours...",
    trustNoSpam: "Garantie Sans Spam",
    trustRating: "⭐ Note 4.9/5 (Indore)",
    trustAlumni: "Plus de 1 200 Anciens Élèves",
    campusFooterTitle: "Institut de Langues Étrangères ILI",
    campusAddress: "205-208 Apollo Tower, 2 MG Road, South Tukoganj, Indore (MP)",
    campusHelpline: "Ligne d'Assistance Téléphone / WhatsApp: +91 98260 12345",
    successRegisteredBadge: "Demande Enregistrée via",
    successTitle: "Merci Beaucoup",
    successDesc:
      "Votre demande a bien été enregistrée. Notre conseiller pédagogique vous contactera par WhatsApp dans les 15 minutes.",
    summaryName: "Nom de l'Étudiant:",
    summaryPhone: "WhatsApp / Téléphone:",
    summaryCourse: "Programme Sélectionné:",
    summarySource: "Origine de la Campagne:",
    chatWhatsAppBtn: "Discuter sur WhatsApp Immédiatement",
    fillAnotherBtn: "Soumettre une autre demande",
    languages: {
      German: { label: "Allemand", highlight: "Le Plus Populaire • A1 à C1" },
      French: { label: "Français", highlight: "DELF & TEF Canada" },
      Spanish: { label: "Espagnol", highlight: "DELE • Accéléré" },
      Japanese: { label: "Japonais", highlight: "JLPT N5 à N2" },
      English: { label: "Anglais Parlé", highlight: "Aisance & IELTS" },
      Italian: { label: "Italien", highlight: "Conversationnel" },
      Russian: { label: "Russe", highlight: "Niveau Standard" },
      Chinese: { label: "Chinois Mandarin", highlight: "Certifié HSK" },
    },
    platforms: {
      instagram: {
        badge: "Spécial Instagram Ads",
        title: "Exclusivité Instagram: Cours d'Essai Gratuit",
        subtitle: "📸 1 cours d'essai gratuit + programme complet en PDF + orientation de carrière",
      },
      whatsapp: {
        badge: "Service Direct WhatsApp",
        title: "Demande Rapide en 30 Secondes",
        subtitle: "💬 Recevez planning, programme en PDF et tarifs directement par WhatsApp.",
      },
      youtube: {
        badge: "Pass Spectateurs YouTube",
        title: "Spectateurs YouTube: Cours d'Essai + PDF Offert",
        subtitle: "▶️ Accès gratuit aux supports pour débutants + 1 cours interactif en direct.",
      },
      telegram: {
        badge: "Priorité Membres Telegram",
        title: "Communauté Telegram: Inscription Prioritaire",
        subtitle: "✈️ Réservez votre place dans les prochaines sessions d'Allemand, Français, Espagnol et Japonais.",
      },
      default: {
        badge: "Bureau des Admissions",
        title: "Commencez Votre Aventure Linguistique",
        subtitle: "🌟 Orientation gratuite et inscription au cours d'essai avec formateurs certifiés.",
      },
    },
  },

  // 5. HINDI (हिन्दी)
  hi: {
    langCode: "hi",
    langName: "हिन्दी",
    flag: "🇮🇳",
    quickTestMode: "क्विक टेस्टिंग मोड:",
    oneClickTest: "⚡ 1-क्लिक टेस्ट डेटा",
    autofillFound: "आपके पिछले विवरण मिले हैं। क्या आप ऑटो-फिल करना चाहते हैं?",
    autoFillBtn: "ऑटो-फिल",
    offerReservedTitle: "आपके लिए स्पेशल डेमो सीट रिज़र्व है!",
    offerReservedDesc: "आपकी फ्री डेमो क्लास और डिस्काउंट 15 मिनट के लिए सुरक्षित है।",
    reopenBtn: "फॉर्म दोबारा खोलें",
    instituteTitle: "ILI फॉरेन लैंग्वेजेज इंस्टीट्यूट",
    campusBadge: "अपोलो टॉवर, एमजी रोड, इंदौर",
    nameLabel: "आपका पूरा नाम",
    namePlaceholder: "जैसे: राज वर्मा",
    nameAutoFillHint: "मोबाइल से ऑटो-फिल",
    nameError: "कृपया अपना पूरा नाम दर्ज करें।",
    phoneLabel: "व्हाट्सएप / मोबाइल नंबर",
    phoneDigitsHint: "10-अंकों का मोबाइल नंबर",
    phoneSecurityNote: "🔒 आपका नंबर 100% सुरक्षित है। डेमो क्लास का लिंक व सिलेबस व्हाट्सएप पर भेजा जाएगा।",
    phoneError: "कृपया एक मान्य 10-अंकों का मोबाइल नंबर दर्ज करें।",
    languageSelectLabel: "आप कौन सी भाषा सीखना चाहते हैं?",
    selectedText: "चुनी गई भाषा",
    modeLabel: "सीखने का माध्यम चुनें",
    offlineModeTitle: "🏢 इंदौर क्लासरूम बैच",
    offlineModeSubtitle: "अपोलो टॉवर, एमजी रोड",
    onlineModeTitle: "💻 लाइव ऑनलाइन इंटरैक्टिव",
    onlineModeSubtitle: "कहीं से भी लाइव क्लास ज्वाइन करें",
    goalLabel: "आपका मुख्य उद्देश्य",
    goals: {
      job: "विदेश में जॉब या स्टडी (जर्मनी, फ्रांस, स्पेन, आदि)",
      exam: "अंतर्राष्ट्रीय सर्टिफिकेट परीक्षा (Goethe / DELF / DELE / JLPT)",
      career: "कॉर्पोरेट / आईटी / मल्टीनेशनल करियर ग्रोथ",
      hobby: "व्यक्तिगत रुचि, विदेशी यात्रा व संस्कृति",
    },
    emailLabel: "ईमेल पता",
    emailHint: "(वैकल्पिक - सिलेबस पीडीएफ के लिए)",
    trackingSource: "कैंपेन सोर्स:",
    submitCta: "डेमो क्लास व फीस डिटेल्स प्राप्त करें",
    submittingText: "डेमो सीट बुक हो रही है...",
    trustNoSpam: "नो स्पैम गारंटी",
    trustRating: "⭐ 4.9/5 इंदौर रेटिंग",
    trustAlumni: "1,200+ पूर्व छात्र",
    campusFooterTitle: "ILI फॉरेन लैंग्वेजेज इंस्टीट्यूट",
    campusAddress: "205-208 अपोlo टॉवर, 2 एमजी रोड, साउथ तुकोगंज, इंदौर (म.प्र.)",
    campusHelpline: "एडमिशन हेल्पलाइन: +91 98260 12345",
    successRegisteredBadge: "लीड सफलतापूर्वक दर्ज via",
    successTitle: "धन्यवाद",
    successDesc:
      "आपकी इन्क्वायरी सफलतापूर्वक दर्ज हो चुकी है। हमारे सीनियर लैंग्वेज काउंसलर अगले 15 मिनट में आपसे व्हाट्सएप/कॉल पर संपर्क करेंगे।",
    summaryName: "छात्र का नाम:",
    summaryPhone: "व्हाट्सएप / फोन:",
    summaryCourse: "चुना गया कोर्स:",
    summarySource: "कैंपेन स्त्रोत:",
    chatWhatsAppBtn: "व्हाट्सएप पर तुरंत चैट करें",
    fillAnotherBtn: "अन्य फॉर्म भरें",
    languages: {
      German: { label: "जर्मन (German)", highlight: "सबसे लोकप्रिय • A1 से C1" },
      French: { label: "फ्रेंच (French)", highlight: "DELF व TEF कनाडा" },
      Spanish: { label: "स्पैनिश (Spanish)", highlight: "DELE • फास्ट ट्रैक" },
      Japanese: { label: "जापानी (Japanese)", highlight: "JLPT N5 से N2" },
      English: { label: "स्पोकन इंग्लिश", highlight: "फ्लुएंसी व IELTS" },
      Italian: { label: "इटैलियन (Italian)", highlight: "कन्वर्सेशनल" },
      Russian: { label: "रूसी (Russian)", highlight: "स्टैंडर्ड लेवल" },
      Chinese: { label: "मंदारिन चाइनीज", highlight: "HSK सर्टिफाइड" },
    },
    platforms: {
      instagram: {
        badge: "इंस्टाग्राम स्पेशल ऑफर",
        title: "इंस्टाग्राम एक्सक्लूसिव: फ्री फॉरेन लैंग्वेज डेमो क्लास",
        subtitle: "📸 1 फ्री ट्रायल क्लास + पूरा कोर्स सिलेबस पीडीएफ + करियर काउंसलिंग",
      },
      whatsapp: {
        badge: "व्हाट्सएप क्विक डेस्क",
        title: "फास्ट 30-सेकंड लैंग्वेज इन्क्वायरी",
        subtitle: "💬 तुरंत व्हाट्सएप पर बैच टाइमिंग, सिलेबस पीडीएफ और फीस प्राप्त करें।",
      },
      youtube: {
        badge: "यूट्यूब व्यूअर पास",
        title: "यूट्यूब व्यूअर्स: डेमो क्लास व पीडीएफ पास",
        subtitle: "▶️ बिगिनर स्टडी नोट्स + लाइव इंटरैक्टिव डेमो क्लास एक्सेस।",
      },
      telegram: {
        badge: "टेलीग्राम प्रायोरिटी डेस्क",
        title: "टेलीग्राम मेंबर्स: फास्ट-ट्रैक एडमिशन डेस्क",
        subtitle: "✈️ आगामी जर्मन, फ्रेंच, स्पैनिश और जापानी बैचों में अपनी सीट सुरक्षित करें।",
      },
      default: {
        badge: "फॉरेन लैंग्वेज एडमिशन",
        title: "अपनी ग्लोबल लैंग्वेज जर्नी शुरू करें",
        subtitle: "🌟 सर्टिफाइड ट्रेनर्स के साथ एडमिशन काउंसलिंग और डेमो क्लास रजिस्ट्रेशन।",
      },
    },
  },
};
