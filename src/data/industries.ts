import { images } from "./images";
import type { Industry } from "./types";

export const industries: Industry[] = [
  {
    slug: "saas",
    icon: "cloud",
    image: images.dashboard,
    title: { en: "SaaS", es: "SaaS" },
    summary: {
      en: "ASC 606 revenue, SaaS metrics and multi-state sales tax for subscription software.",
      es: "Ingresos ASC 606, métricas SaaS e impuesto sobre ventas multiestatal para software por suscripción.",
    },
    intro: {
      en: "Subscription businesses live and die by recurring revenue, retention and cash efficiency. We build finance functions that report ARR, net revenue retention and CAC payback accurately, and that stand up to investor diligence.",
      es: "Los negocios por suscripción dependen de los ingresos recurrentes, la retención y la eficiencia de caja. Creamos funciones financieras que reportan con precisión ARR, retención neta de ingresos y recuperación del CAC, y que resisten la due diligence de inversores.",
    },
    challenges: {
      en: [
        "Recognizing annual prepaid contracts correctly under ASC 606",
        "Sales tax on SaaS varies state by state",
        "Capitalizing software development costs",
        "Investor-grade metrics that tie back to the books",
      ],
      es: [
        "Reconocer correctamente contratos anuales prepagados según ASC 606",
        "El impuesto sobre ventas del SaaS varía según el estado",
        "Capitalizar los costos de desarrollo de software",
        "Métricas de nivel inversor que cuadren con la contabilidad",
      ],
    },
    solutions: {
      en: [
        "Deferred revenue waterfalls automated from Stripe or Chargebee",
        "Product taxability matrix and automated filings",
        "R&D credit studies with payroll tax offset",
        "Monthly SaaS metrics pack and board-ready reporting",
      ],
      es: [
        "Cascadas de ingresos diferidos automatizadas desde Stripe o Chargebee",
        "Matriz de tributación por producto y declaraciones automatizadas",
        "Estudios de crédito por I+D con compensación de impuestos de nómina",
        "Paquete mensual de métricas SaaS y reportes para el consejo",
      ],
    },
    metrics: {
      en: ["ARR and MRR", "Net revenue retention", "CAC payback", "Burn multiple", "Gross margin"],
      es: ["ARR y MRR", "Retención neta de ingresos", "Recuperación del CAC", "Burn multiple", "Margen bruto"],
    },
    services: ["fractional-cfo", "sales-tax-compliance", "corporate-tax"],
  },
  {
    slug: "e-commerce",
    icon: "cart",
    image: images.ecommerce,
    title: { en: "E-commerce", es: "E-commerce" },
    summary: {
      en: "Inventory accounting, marketplace reconciliations and sales tax for DTC and Amazon brands.",
      es: "Contabilidad de inventario, conciliación de marketplaces e impuesto sobre ventas para marcas DTC y Amazon.",
    },
    intro: {
      en: "Online brands sell across Shopify, Amazon, wholesale and retail, with inventory in several warehouses. We untangle payouts, fees and inventory so you know your true contribution margin by channel and SKU.",
      es: "Las marcas online venden en Shopify, Amazon, mayoristas y tiendas físicas, con inventario en varios almacenes. Desenredamos pagos, comisiones e inventario para que conozcas tu margen de contribución real por canal y SKU.",
    },
    challenges: {
      en: [
        "Reconciling marketplace payouts net of fees and refunds",
        "Inventory and landed cost accounting",
        "Economic nexus in dozens of states",
        "Cash tied up in inventory and ad spend",
      ],
      es: [
        "Conciliar pagos de marketplaces netos de comisiones y devoluciones",
        "Contabilidad de inventario y costo de llegada",
        "Nexo económico en decenas de estados",
        "Caja inmovilizada en inventario y publicidad",
      ],
    },
    solutions: {
      en: [
        "Automated payout reconciliation from Shopify and Amazon",
        "Perpetual inventory and COGS by SKU",
        "Nexus tracking with monthly multi-state filings",
        "Cash flow forecasting tied to purchase orders",
      ],
      es: [
        "Conciliación automática de pagos de Shopify y Amazon",
        "Inventario perpetuo y costo de ventas por SKU",
        "Seguimiento de nexo con declaraciones multiestatales mensuales",
        "Proyección de caja vinculada a órdenes de compra",
      ],
    },
    metrics: {
      en: ["Contribution margin by channel", "Inventory turnover", "Customer acquisition cost", "Return rate", "Cash conversion cycle"],
      es: ["Margen de contribución por canal", "Rotación de inventario", "Costo de adquisición de clientes", "Tasa de devolución", "Ciclo de conversión de caja"],
    },
    services: ["sales-tax-compliance", "bookkeeping-payroll", "fractional-cfo"],
  },
  {
    slug: "professional-services",
    icon: "briefcase",
    image: images.meetingRoom,
    title: { en: "Professional Services", es: "Servicios profesionales" },
    summary: {
      en: "Project profitability, partner compensation and tax planning for agencies, consultancies and law firms.",
      es: "Rentabilidad por proyecto, compensación de socios y planificación fiscal para agencias, consultoras y despachos.",
    },
    intro: {
      en: "Agencies, consultancies, architecture and law firms sell expertise by the hour or project. We give partners clear visibility into utilization, project margins and cash collection, plus tax structures that reward growth.",
      es: "Agencias, consultoras, estudios de arquitectura y despachos de abogados venden experiencia por hora o por proyecto. Damos a los socios visibilidad clara de utilización, márgenes por proyecto y cobros, además de estructuras fiscales que premian el crecimiento.",
    },
    challenges: {
      en: [
        "Knowing which clients and projects are truly profitable",
        "Work in progress and unbilled revenue",
        "Partner draws and guaranteed payments",
        "NYC Unincorporated Business Tax",
      ],
      es: [
        "Saber qué clientes y proyectos son realmente rentables",
        "Trabajo en curso e ingresos no facturados",
        "Retiros de socios y pagos garantizados",
        "Unincorporated Business Tax de NYC",
      ],
    },
    solutions: {
      en: [
        "Project-level P&L integrated with time tracking",
        "WIP schedules and accrual-basis reporting",
        "Partner compensation modeling and K-1 planning",
        "Entity and PTET elections to reduce state tax",
      ],
      es: [
        "Estado de resultados por proyecto integrado con el registro de horas",
        "Calendarios de trabajo en curso y reportes en base devengada",
        "Modelado de compensación de socios y planificación de K-1",
        "Elección de entidad y PTET para reducir impuestos estatales",
      ],
    },
    metrics: {
      en: ["Utilization rate", "Realization rate", "Project margin", "Days sales outstanding", "Revenue per employee"],
      es: ["Tasa de utilización", "Tasa de realización", "Margen por proyecto", "Días de cobro", "Ingresos por empleado"],
    },
    services: ["bookkeeping-payroll", "corporate-tax", "fractional-cfo"],
  },
  {
    slug: "healthcare",
    icon: "health",
    image: images.healthcare,
    title: { en: "Healthcare", es: "Salud" },
    summary: {
      en: "Practice accounting, payer reconciliation and entity structuring for medical and dental groups.",
      es: "Contabilidad de consultorios, conciliación de aseguradoras y estructuración para grupos médicos y dentales.",
    },
    intro: {
      en: "Medical, dental and therapy practices face complex reimbursement, strict privacy rules and professional corporation requirements in New York. We help practice owners understand collections, control overhead and plan for growth or sale.",
      es: "Las clínicas médicas, dentales y de terapia enfrentan reembolsos complejos, normas estrictas de privacidad y requisitos de corporación profesional en Nueva York. Ayudamos a los propietarios a entender sus cobros, controlar gastos y planificar el crecimiento o la venta.",
    },
    challenges: {
      en: [
        "Reconciling insurance payments, adjustments and patient balances",
        "PC and PLLC structuring requirements in New York",
        "Physician compensation and productivity models",
        "Handling records under HIPAA-compliant processes",
      ],
      es: [
        "Conciliar pagos de seguros, ajustes y saldos de pacientes",
        "Requisitos de estructura PC y PLLC en Nueva York",
        "Modelos de compensación y productividad médica",
        "Gestión de registros con procesos conformes a HIPAA",
      ],
    },
    solutions: {
      en: [
        "Collections reporting by payer and provider",
        "Entity structure and management company planning",
        "Compensation models tied to production",
        "Secure, access-controlled document workflows",
      ],
      es: [
        "Reportes de cobros por aseguradora y profesional",
        "Planificación de estructura y sociedad de gestión",
        "Modelos de compensación vinculados a la producción",
        "Flujos documentales seguros con control de acceso",
      ],
    },
    metrics: {
      en: ["Collections rate", "Revenue per provider", "Overhead ratio", "Days in A/R", "Patient volume"],
      es: ["Tasa de cobro", "Ingresos por profesional", "Ratio de gastos generales", "Días en cuentas por cobrar", "Volumen de pacientes"],
    },
    services: ["bookkeeping-payroll", "corporate-tax", "business-formation"],
  },
  {
    slug: "real-estate",
    icon: "house",
    image: images.realEstate,
    title: { en: "Real Estate", es: "Bienes raíces" },
    summary: {
      en: "Property-level accounting, cost segregation and 1031 planning for investors and developers.",
      es: "Contabilidad por propiedad, segregación de costos y planificación 1031 para inversores y promotores.",
    },
    intro: {
      en: "From a handful of rental units in Brooklyn to multi-entity development projects, real estate rewards careful tax planning. We maintain property-level books and help you use depreciation, cost segregation and like-kind exchanges to their full advantage.",
      es: "Desde unas pocas unidades de alquiler en Brooklyn hasta proyectos de desarrollo con varias entidades, el sector inmobiliario premia la planificación fiscal cuidadosa. Llevamos la contabilidad por propiedad y te ayudamos a aprovechar al máximo la depreciación, la segregación de costos y los intercambios 1031.",
    },
    challenges: {
      en: [
        "Separate books for every property and entity",
        "Depreciation and passive activity loss rules",
        "Timing 1031 exchanges correctly",
        "Investor distributions and waterfall calculations",
      ],
      es: [
        "Contabilidad separada para cada propiedad y entidad",
        "Reglas de depreciación y pérdidas por actividades pasivas",
        "Programar correctamente los intercambios 1031",
        "Distribuciones a inversores y cálculos de cascada",
      ],
    },
    solutions: {
      en: [
        "Property-level P&L and consolidated reporting",
        "Cost segregation studies through trusted partners",
        "1031 exchange timelines and qualified intermediary coordination",
        "Investor reporting and K-1 preparation",
      ],
      es: [
        "Estado de resultados por propiedad y reportes consolidados",
        "Estudios de segregación de costos con socios de confianza",
        "Calendarios de intercambio 1031 y coordinación con intermediarios calificados",
        "Reportes a inversores y preparación de K-1",
      ],
    },
    metrics: {
      en: ["Net operating income", "Cash-on-cash return", "Occupancy rate", "Debt service coverage", "Cap rate"],
      es: ["Ingreso operativo neto", "Rentabilidad sobre efectivo", "Tasa de ocupación", "Cobertura del servicio de deuda", "Tasa de capitalización"],
    },
    services: ["corporate-tax", "bookkeeping-payroll", "audit-support"],
  },
  {
    slug: "startups",
    icon: "rocket",
    image: images.startup,
    title: { en: "Startups", es: "Startups" },
    summary: {
      en: "Delaware C-corp compliance, R&D credits and investor-ready financials from pre-seed to Series B.",
      es: "Cumplimiento de C-corp de Delaware, créditos por I+D y estados financieros para inversores desde pre-semilla hasta Serie B.",
    },
    intro: {
      en: "Early-stage companies need clean books, the right filings and a runway they can trust, without hiring a finance team before product-market fit. We grow with you from incorporation to your first audit.",
      es: "Las empresas en etapa temprana necesitan cuentas limpias, las declaraciones correctas y un runway confiable, sin contratar un equipo financiero antes de encontrar el encaje producto-mercado. Crecemos contigo desde la constitución hasta tu primera auditoría.",
    },
    challenges: {
      en: [
        "Delaware franchise tax surprises",
        "Missing 83(b) elections and cap table issues",
        "Accurate runway when burn changes monthly",
        "Investor diligence on financials",
      ],
      es: [
        "Sorpresas con el franchise tax de Delaware",
        "Elecciones 83(b) olvidadas y problemas en la tabla de capitalización",
        "Runway preciso cuando el gasto cambia cada mes",
        "Due diligence financiera de los inversores",
      ],
    },
    solutions: {
      en: [
        "Delaware franchise tax calculated with the assumed par value method",
        "Formation checklist with founder equity guidance",
        "Monthly burn and runway dashboard",
        "Data room and diligence-ready financial statements",
      ],
      es: [
        "Franchise tax de Delaware calculado con el método de valor nominal asumido",
        "Lista de constitución con orientación sobre acciones de fundadores",
        "Panel mensual de gasto y runway",
        "Sala de datos y estados financieros listos para due diligence",
      ],
    },
    metrics: {
      en: ["Monthly burn", "Runway in months", "Revenue growth", "Gross margin", "Headcount cost"],
      es: ["Gasto mensual", "Runway en meses", "Crecimiento de ingresos", "Margen bruto", "Costo de plantilla"],
    },
    services: ["business-formation", "bookkeeping-payroll", "fractional-cfo"],
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
