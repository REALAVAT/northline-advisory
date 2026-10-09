import { unsplash } from "./images";
import type { TeamMember } from "./types";

export const team: TeamMember[] = [
  {
    slug: "eleanor-whitfield",
    name: "Eleanor Whitfield",
    role: { en: "Managing Partner, CPA", es: "Socia directora, CPA" },
    image: unsplash("1573496359142-b8d87734a5a2", 900),
    shortBio: {
      en: "Former Big Four tax manager who founded Northline in 2011 to bring senior advice to growing companies.",
      es: "Exgerente fiscal de una Big Four que fundó Northline en 2011 para acercar asesoría sénior a empresas en crecimiento.",
    },
    bio: {
      en: [
        "Eleanor founded Northline Advisory in 2011 after nine years in the tax practice of a Big Four firm in Manhattan, where she advised technology and media companies on federal and multi-state tax.",
        "Today she leads the firm's strategy and still works directly with a portfolio of clients, focusing on entity structuring, exit planning and complex New York State and City matters.",
        "Eleanor is a frequent speaker at the New York State Society of CPAs and mentors first-time founders through several Manhattan accelerators.",
      ],
      es: [
        "Eleanor fundó Northline Advisory en 2011 tras nueve años en el área fiscal de una firma Big Four en Manhattan, donde asesoró a empresas de tecnología y medios en impuestos federales y multiestatales.",
        "Hoy dirige la estrategia de la firma y sigue trabajando directamente con una cartera de clientes, centrada en estructuración de entidades, planificación de salidas y asuntos complejos del Estado y la Ciudad de Nueva York.",
        "Eleanor es ponente habitual en la New York State Society of CPAs y mentora de fundadores primerizos en varias aceleradoras de Manhattan.",
      ],
    },
    specialties: {
      en: ["Entity structuring", "Exit and M&A tax planning", "New York State and City tax"],
      es: ["Estructuración de entidades", "Planificación fiscal de salidas y M&A", "Impuestos del Estado y la Ciudad de Nueva York"],
    },
    credentials: ["CPA (New York)", "AICPA Member", "NYSSCPA Member"],
    education: {
      en: ["MS Taxation, NYU Stern", "BBA Accounting, Baruch College"],
      es: ["Máster en Fiscalidad, NYU Stern", "Licenciatura en Contabilidad, Baruch College"],
    },
    languages: { en: ["English", "French"], es: ["Inglés", "Francés"] },
    email: "eleanor@northlineadvisory.com",
    leadership: true,
  },
  {
    slug: "marcus-chen",
    name: "Marcus Chen",
    role: { en: "Partner, Advisory & Fractional CFO", es: "Socio, Asesoría y CFO fraccional" },
    image: unsplash("1560250097-0b93528c311a", 900),
    shortBio: {
      en: "Two-time startup CFO who has led over $400M in fundraising and two successful exits.",
      es: "CFO de startups en dos ocasiones que ha liderado más de $400M en rondas y dos salidas exitosas.",
    },
    bio: {
      en: [
        "Marcus leads Northline's advisory practice and its team of fractional CFOs. Before joining the firm in 2016, he was CFO of two venture-backed SaaS companies in New York, guiding one through an acquisition by a public software company.",
        "He specializes in financial modeling, fundraising and board reporting, and has helped clients raise more than $400 million in equity and venture debt.",
      ],
      es: [
        "Marcus dirige el área de asesoría de Northline y su equipo de CFO fraccionales. Antes de unirse a la firma en 2016 fue CFO de dos empresas SaaS con capital de riesgo en Nueva York, y guio a una de ellas en su adquisición por una empresa de software cotizada.",
        "Está especializado en modelado financiero, rondas de inversión y reportes al consejo, y ha ayudado a clientes a levantar más de 400 millones de dólares en capital y deuda de riesgo.",
      ],
    },
    specialties: {
      en: ["Financial modeling", "Fundraising and diligence", "SaaS metrics"],
      es: ["Modelado financiero", "Rondas y due diligence", "Métricas SaaS"],
    },
    credentials: ["CFA Charterholder", "MBA"],
    education: {
      en: ["MBA Finance, Columbia Business School", "BS Economics, Cornell University"],
      es: ["MBA en Finanzas, Columbia Business School", "Licenciatura en Economía, Cornell University"],
    },
    languages: { en: ["English", "Mandarin"], es: ["Inglés", "Mandarín"] },
    email: "marcus@northlineadvisory.com",
    leadership: true,
  },
  {
    slug: "sofia-ramirez",
    name: "Sofía Ramírez",
    role: { en: "Partner, Tax, CPA", es: "Socia, Impuestos, CPA" },
    image: unsplash("1580489944761-15a19d654956", 900),
    shortBio: {
      en: "Leads the corporate and sales tax practice, with deep expertise in multi-state and cross-border compliance.",
      es: "Dirige el área de impuesto corporativo y sobre ventas, con amplia experiencia en cumplimiento multiestatal e internacional.",
    },
    bio: {
      en: [
        "Sofía heads Northline's tax practice, overseeing corporate income tax, sales tax and international compliance for more than 300 clients.",
        "Before Northline she spent eight years in state and local tax at a national accounting firm, leading nexus studies and voluntary disclosure programs for e-commerce and SaaS companies. She advises Spanish-speaking founders expanding into the United States.",
      ],
      es: [
        "Sofía dirige el área fiscal de Northline y supervisa el impuesto corporativo, el impuesto sobre ventas y el cumplimiento internacional de más de 300 clientes.",
        "Antes de Northline pasó ocho años en impuestos estatales y locales en una firma contable nacional, liderando estudios de nexo y programas de divulgación voluntaria para empresas de e-commerce y SaaS. Asesora a fundadores hispanohablantes que se expanden a Estados Unidos.",
      ],
    },
    specialties: {
      en: ["Multi-state sales tax", "Corporate income tax", "Cross-border expansion"],
      es: ["Impuesto sobre ventas multiestatal", "Impuesto corporativo", "Expansión internacional"],
    },
    credentials: ["CPA (New York)", "Certified Member, Institute for Professionals in Taxation"],
    education: {
      en: ["MS Accounting, Fordham University", "BA Economics, Universidad de los Andes"],
      es: ["Máster en Contabilidad, Fordham University", "Licenciatura en Economía, Universidad de los Andes"],
    },
    languages: { en: ["English", "Spanish"], es: ["Inglés", "Español"] },
    email: "sofia@northlineadvisory.com",
    leadership: true,
  },
  {
    slug: "james-okafor",
    name: "James Okafor",
    role: { en: "Director, Audit Readiness, CPA", es: "Director, Preparación de auditorías, CPA" },
    image: unsplash("1507679799987-c73779587ccf", 900),
    shortBio: {
      en: "Former audit senior manager who now helps clients pass their first audits without disruption.",
      es: "Exgerente sénior de auditoría que ahora ayuda a los clientes a superar su primera auditoría sin contratiempos.",
    },
    bio: {
      en: [
        "James spent eleven years in audit, most recently as a senior manager, before joining Northline to build its audit readiness practice.",
        "He guides clients through first-time financial statement audits, ASC 606 and ASC 842 implementations and internal control documentation, and represents clients in IRS examinations.",
      ],
      es: [
        "James pasó once años en auditoría, el último como gerente sénior, antes de unirse a Northline para crear su área de preparación de auditorías.",
        "Acompaña a los clientes en su primera auditoría de estados financieros, en la implementación de ASC 606 y ASC 842 y en la documentación de controles internos, y los representa en exámenes del IRS.",
      ],
    },
    specialties: {
      en: ["U.S. GAAP", "Revenue recognition", "IRS representation"],
      es: ["U.S. GAAP", "Reconocimiento de ingresos", "Representación ante el IRS"],
    },
    credentials: ["CPA (New York)", "CISA"],
    education: {
      en: ["BS Accounting, Rutgers University"],
      es: ["Licenciatura en Contabilidad, Rutgers University"],
    },
    languages: { en: ["English"], es: ["Inglés"] },
    email: "james@northlineadvisory.com",
    leadership: false,
  },
  {
    slug: "priya-natarajan",
    name: "Priya Natarajan",
    role: { en: "Senior Manager, Client Accounting", es: "Gerente sénior, Contabilidad de clientes" },
    image: unsplash("1494790108377-be9c29b29330", 900),
    shortBio: {
      en: "Runs the monthly close team and the firm's automation stack across QuickBooks, Xero and NetSuite.",
      es: "Dirige el equipo de cierre mensual y la automatización de la firma en QuickBooks, Xero y NetSuite.",
    },
    bio: {
      en: [
        "Priya leads Northline's client accounting team of fifteen bookkeepers and staff accountants, delivering monthly closes for more than 250 companies.",
        "She designed the firm's close process that delivers reviewed financials by the tenth business day, and leads system migrations to NetSuite for scaling clients.",
      ],
      es: [
        "Priya dirige el equipo de contabilidad de clientes de Northline, formado por quince contables, que realiza cierres mensuales para más de 250 empresas.",
        "Diseñó el proceso de cierre de la firma, que entrega estados financieros revisados antes del décimo día hábil, y lidera las migraciones a NetSuite de clientes en expansión.",
      ],
    },
    specialties: {
      en: ["Monthly close", "Accounting automation", "NetSuite migrations"],
      es: ["Cierre mensual", "Automatización contable", "Migraciones a NetSuite"],
    },
    credentials: ["CPA (New Jersey)", "QuickBooks ProAdvisor", "Xero Certified Advisor"],
    education: {
      en: ["MS Accounting, Pace University"],
      es: ["Máster en Contabilidad, Pace University"],
    },
    languages: { en: ["English", "Tamil", "Hindi"], es: ["Inglés", "Tamil", "Hindi"] },
    email: "priya@northlineadvisory.com",
    leadership: false,
  },
  {
    slug: "daniel-brooks",
    name: "Daniel Brooks",
    role: { en: "Manager, Payroll & Compliance, EA", es: "Gerente, Nómina y cumplimiento, EA" },
    image: unsplash("1472099645785-5658abf4ff4e", 900),
    shortBio: {
      en: "Enrolled agent who manages multi-state payroll and employment tax compliance for 180+ clients.",
      es: "Agente registrado que gestiona la nómina multiestatal y el cumplimiento laboral de más de 180 clientes.",
    },
    bio: {
      en: [
        "Daniel manages payroll and employment tax compliance for Northline's clients, from five-person agencies to remote companies with employees in thirty states.",
        "As an enrolled agent, he is authorized to represent taxpayers before the IRS and handles payroll tax notices and state unemployment audits.",
      ],
      es: [
        "Daniel gestiona la nómina y el cumplimiento de impuestos laborales de los clientes de Northline, desde agencias de cinco personas hasta empresas remotas con empleados en treinta estados.",
        "Como agente registrado, está autorizado para representar a contribuyentes ante el IRS y gestiona notificaciones de impuestos de nómina y auditorías estatales de desempleo.",
      ],
    },
    specialties: {
      en: ["Multi-state payroll", "Employment tax", "Contractor compliance"],
      es: ["Nómina multiestatal", "Impuestos laborales", "Cumplimiento con contratistas"],
    },
    credentials: ["Enrolled Agent (IRS)", "Certified Payroll Professional"],
    education: {
      en: ["BS Finance, Hofstra University"],
      es: ["Licenciatura en Finanzas, Hofstra University"],
    },
    languages: { en: ["English", "Spanish"], es: ["Inglés", "Español"] },
    email: "daniel@northlineadvisory.com",
    leadership: false,
  },
];

export function getTeamMember(slug: string) {
  return team.find((member) => member.slug === slug);
}
