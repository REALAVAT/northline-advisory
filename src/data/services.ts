import { images } from "./images";
import type { Service, ServiceSlug } from "./types";

export const services: Service[] = [
  {
    slug: "corporate-tax",
    icon: "landmark",
    image: images.documents,
    title: { en: "Corporate Tax", es: "Impuesto corporativo" },
    summary: {
      en: "Federal, state and city corporate tax planning and filing for C-corps, S-corps and partnerships.",
      es: "Planificación y declaración de impuestos corporativos federales, estatales y municipales para C-corps, S-corps y sociedades.",
    },
    overview: {
      en: [
        "Corporate tax in New York means juggling federal, New York State and New York City rules, each with its own deadlines, apportionment formulas and credits. One missed election or estimated payment can cost far more than our annual fee.",
        "Our corporate tax team prepares and files your returns, and plans year-round so there are no surprises in March. We model entity choices, R&D credits, Section 179 and bonus depreciation, and multi-state nexus before decisions are made, not after.",
      ],
      es: [
        "El impuesto corporativo en Nueva York implica coordinar normas federales, del Estado de Nueva York y de la Ciudad de Nueva York, cada una con sus propios plazos, fórmulas de prorrateo y créditos. Una elección omitida o un pago estimado olvidado puede costar mucho más que nuestros honorarios anuales.",
        "Nuestro equipo prepara y presenta tus declaraciones y planifica durante todo el año para evitar sorpresas en marzo. Modelamos la elección de entidad, créditos de I+D, la Sección 179, la depreciación adicional y el nexo multiestatal antes de tomar decisiones, no después.",
      ],
    },
    included: {
      en: [
        "Federal Form 1120, 1120-S or 1065 preparation and e-filing",
        "New York State CT-3 / CT-3-S and NYC corporate returns",
        "Quarterly estimated tax calculations and payment reminders",
        "R&D tax credit studies and payroll tax offset for startups",
        "Multi-state nexus review and apportionment",
        "Year-end tax planning meeting with a senior CPA",
        "IRS and state notice response included",
      ],
      es: [
        "Preparación y presentación electrónica del Formulario federal 1120, 1120-S o 1065",
        "Declaraciones estatales CT-3 / CT-3-S y declaraciones corporativas de NYC",
        "Cálculo de impuestos estimados trimestrales y recordatorios de pago",
        "Estudios de crédito fiscal por I+D y compensación de impuestos de nómina para startups",
        "Revisión de nexo multiestatal y prorrateo",
        "Reunión de planificación fiscal de fin de año con un CPA sénior",
        "Respuesta a notificaciones del IRS y del estado incluida",
      ],
    },
    idealFor: {
      en: ["Venture-backed C-corps", "Profitable S-corps", "Multi-member LLCs", "Companies expanding to new states"],
      es: ["C-corps con capital de riesgo", "S-corps rentables", "LLC con varios socios", "Empresas que se expanden a nuevos estados"],
    },
    process: [
      {
        title: { en: "Discovery", es: "Diagnóstico" },
        text: {
          en: "We review prior returns, entity structure and current-year results to spot risks and savings.",
          es: "Revisamos declaraciones anteriores, la estructura de la entidad y los resultados del año para detectar riesgos y ahorros.",
        },
      },
      {
        title: { en: "Planning", es: "Planificación" },
        text: {
          en: "You get a written tax plan with estimated liabilities, elections and action items by quarter.",
          es: "Recibes un plan fiscal por escrito con obligaciones estimadas, elecciones y acciones por trimestre.",
        },
      },
      {
        title: { en: "Preparation", es: "Preparación" },
        text: {
          en: "We prepare every return, with a second CPA reviewing each filing before you sign.",
          es: "Preparamos cada declaración y un segundo CPA la revisa antes de que la firmes.",
        },
      },
      {
        title: { en: "Filing & support", es: "Presentación y soporte" },
        text: {
          en: "We e-file, confirm acceptance and handle any notices that follow at no extra charge.",
          es: "Presentamos electrónicamente, confirmamos la aceptación y gestionamos cualquier notificación sin costo adicional.",
        },
      },
    ],
    priceFrom: 3500,
    priceUnit: "year",
    faqs: [
      {
        question: {
          en: "When is the corporate tax deadline for calendar-year companies?",
          es: "¿Cuál es el plazo del impuesto corporativo para empresas con año natural?",
        },
        answer: {
          en: "S-corps and partnerships file by March 15 and C-corps by April 15. Extensions give you six more months to file, but not to pay, so we calculate and remit any balance due by the original deadline.",
          es: "Las S-corps y sociedades presentan antes del 15 de marzo y las C-corps antes del 15 de abril. Las prórrogas dan seis meses más para presentar, pero no para pagar, por eso calculamos y pagamos cualquier saldo antes del plazo original.",
        },
      },
      {
        question: {
          en: "Do you handle New York City corporate tax?",
          es: "¿Gestionan el impuesto corporativo de la Ciudad de Nueva York?",
        },
        answer: {
          en: "Yes. We prepare NYC Business Corporation Tax and General Corporation Tax returns, and Unincorporated Business Tax for LLCs and partnerships operating in the five boroughs.",
          es: "Sí. Preparamos las declaraciones del Business Corporation Tax y General Corporation Tax de NYC, y el Unincorporated Business Tax para LLC y sociedades que operan en los cinco distritos.",
        },
      },
      {
        question: {
          en: "Can you take over mid-year from another accountant?",
          es: "¿Pueden tomar el relevo a mitad de año de otro contador?",
        },
        answer: {
          en: "Absolutely. Most new clients switch mid-year. We request workpapers from your previous firm and complete a transition review within two weeks.",
          es: "Por supuesto. La mayoría de los nuevos clientes cambian a mitad de año. Solicitamos los papeles de trabajo a tu firma anterior y completamos una revisión de transición en dos semanas.",
        },
      },
    ],
    related: ["fractional-cfo", "sales-tax-compliance", "bookkeeping-payroll"],
  },
  {
    slug: "sales-tax-compliance",
    icon: "receipt",
    image: images.ecommerce,
    title: {
      en: "Sales Tax & VAT-style Compliance",
      es: "Impuesto sobre ventas y cumplimiento tipo IVA",
    },
    summary: {
      en: "Nexus studies, registrations and monthly filings across every state where you sell, plus VAT support for cross-border sales.",
      es: "Estudios de nexo, registros y declaraciones mensuales en cada estado donde vendes, además de soporte de IVA para ventas internacionales.",
    },
    overview: {
      en: [
        "Since the Wayfair decision, any company selling into multiple states can owe sales tax far from home. With more than 11,000 taxing jurisdictions in the U.S., and VAT or GST obligations when you sell abroad, compliance is now an operational process, not a once-a-year task.",
        "We map your economic nexus, register you where required and file accurate returns on time, every period. Our team integrates with Shopify, Stripe, Amazon and Avalara or TaxJar so the numbers reconcile to your books automatically.",
      ],
      es: [
        "Desde la sentencia Wayfair, cualquier empresa que vende en varios estados puede deber impuesto sobre ventas lejos de su sede. Con más de 11,000 jurisdicciones fiscales en EE. UU., y obligaciones de IVA o GST al vender en el extranjero, el cumplimiento es un proceso operativo, no una tarea anual.",
        "Mapeamos tu nexo económico, te registramos donde sea necesario y presentamos declaraciones precisas a tiempo, cada periodo. Nos integramos con Shopify, Stripe, Amazon y Avalara o TaxJar para que los números concilien automáticamente con tu contabilidad.",
      ],
    },
    included: {
      en: [
        "Economic and physical nexus study across all 50 states",
        "State sales tax registrations and permit management",
        "Monthly, quarterly and annual sales tax returns",
        "Exemption certificate collection and tracking",
        "Voluntary disclosure agreements for past exposure",
        "VAT / GST registration guidance for EU, UK and Canada sales",
        "Integration with Shopify, Stripe, Avalara and TaxJar",
      ],
      es: [
        "Estudio de nexo económico y físico en los 50 estados",
        "Registros estatales de impuesto sobre ventas y gestión de permisos",
        "Declaraciones mensuales, trimestrales y anuales",
        "Recopilación y seguimiento de certificados de exención",
        "Acuerdos de divulgación voluntaria por exposición pasada",
        "Orientación para registro de IVA / GST en la UE, Reino Unido y Canadá",
        "Integración con Shopify, Stripe, Avalara y TaxJar",
      ],
    },
    idealFor: {
      en: ["E-commerce brands", "SaaS companies selling nationally", "Marketplace sellers", "Companies selling to the EU or UK"],
      es: ["Marcas de e-commerce", "Empresas SaaS con ventas nacionales", "Vendedores en marketplaces", "Empresas que venden a la UE o Reino Unido"],
    },
    process: [
      {
        title: { en: "Nexus study", es: "Estudio de nexo" },
        text: {
          en: "We analyze sales by state and product taxability to see where you owe and since when.",
          es: "Analizamos las ventas por estado y la tributación de cada producto para saber dónde debes y desde cuándo.",
        },
      },
      {
        title: { en: "Remediation", es: "Regularización" },
        text: {
          en: "Registrations, voluntary disclosures and back filings where exposure exists.",
          es: "Registros, divulgaciones voluntarias y declaraciones atrasadas donde exista exposición.",
        },
      },
      {
        title: { en: "Automation", es: "Automatización" },
        text: {
          en: "We configure your tax engine and connect it to your store, billing and accounting systems.",
          es: "Configuramos tu motor fiscal y lo conectamos con tu tienda, facturación y contabilidad.",
        },
      },
      {
        title: { en: "Ongoing filing", es: "Declaraciones continuas" },
        text: {
          en: "Returns filed every period, reconciled to the general ledger, with a monthly status report.",
          es: "Declaraciones presentadas cada periodo, conciliadas con el libro mayor y con un informe mensual.",
        },
      },
    ],
    priceFrom: 450,
    priceUnit: "month",
    faqs: [
      {
        question: {
          en: "What is economic nexus?",
          es: "¿Qué es el nexo económico?",
        },
        answer: {
          en: "Economic nexus means a state can require you to collect sales tax once your sales into that state pass a threshold, commonly $100,000 a year, even if you have no office or employees there. New York's threshold is $500,000 and 100 transactions.",
          es: "El nexo económico significa que un estado puede exigirte cobrar impuesto sobre ventas cuando tus ventas allí superan un umbral, normalmente $100,000 al año, aunque no tengas oficina ni empleados. El umbral de Nueva York es de $500,000 y 100 transacciones.",
        },
      },
      {
        question: {
          en: "Is SaaS subject to sales tax?",
          es: "¿El SaaS está sujeto a impuesto sobre ventas?",
        },
        answer: {
          en: "It depends on the state. New York, Texas, Washington and about 20 other states tax some or all SaaS, while California and Florida generally do not. Our nexus study includes a product taxability matrix.",
          es: "Depende del estado. Nueva York, Texas, Washington y unos 20 estados más gravan parte o la totalidad del SaaS, mientras que California y Florida generalmente no. Nuestro estudio incluye una matriz de tributación por producto.",
        },
      },
      {
        question: {
          en: "We never collected sales tax. Are we in trouble?",
          es: "Nunca cobramos impuesto sobre ventas. ¿Tenemos un problema?",
        },
        answer: {
          en: "It is common and fixable. Voluntary disclosure agreements usually limit lookback to three or four years and waive penalties. We negotiate these on your behalf, often anonymously at first.",
          es: "Es común y tiene solución. Los acuerdos de divulgación voluntaria suelen limitar la revisión a tres o cuatro años y condonar sanciones. Los negociamos en tu nombre, a menudo de forma anónima al principio.",
        },
      },
    ],
    related: ["bookkeeping-payroll", "corporate-tax", "audit-support"],
  },
  {
    slug: "bookkeeping-payroll",
    icon: "book",
    image: images.calculator,
    title: { en: "Bookkeeping & Payroll", es: "Contabilidad y nómina" },
    summary: {
      en: "Accrual-basis books closed by day 10, plus multi-state payroll, benefits and contractor payments.",
      es: "Contabilidad en base devengada cerrada antes del día 10, además de nómina multiestatal, beneficios y pagos a contratistas.",
    },
    overview: {
      en: [
        "Good decisions start with clean, current books. We run your monthly close on QuickBooks Online, Xero or NetSuite, reconcile every account and deliver a management pack with commentary by the tenth business day.",
        "Our payroll team handles everything from onboarding to year-end W-2s and 1099s, across all states where your team lives. We register for state withholding and unemployment accounts, file every quarterly return and keep you compliant with New York's paid leave and pay transparency rules.",
      ],
      es: [
        "Las buenas decisiones empiezan con cuentas limpias y al día. Gestionamos tu cierre mensual en QuickBooks Online, Xero o NetSuite, conciliamos cada cuenta y entregamos un informe de gestión con comentarios antes del décimo día hábil.",
        "Nuestro equipo de nómina gestiona todo, desde la incorporación hasta los W-2 y 1099 de fin de año, en todos los estados donde vive tu equipo. Registramos las cuentas estatales de retención y desempleo, presentamos cada declaración trimestral y te mantenemos al día con las normas de Nueva York sobre licencias pagadas y transparencia salarial.",
      ],
    },
    included: {
      en: [
        "Monthly accrual-basis close and bank, card and loan reconciliations",
        "Accounts payable and receivable management",
        "Monthly P&L, balance sheet and cash flow with commentary",
        "Semi-monthly or bi-weekly payroll in all 50 states",
        "Payroll tax filings, W-2s and 1099-NEC / 1099-MISC",
        "Benefits and 401(k) deduction reconciliation",
        "Dedicated bookkeeper plus CPA review every month",
      ],
      es: [
        "Cierre mensual en base devengada y conciliaciones bancarias, de tarjetas y préstamos",
        "Gestión de cuentas por pagar y por cobrar",
        "Estado de resultados, balance y flujo de caja mensual con comentarios",
        "Nómina quincenal o bisemanal en los 50 estados",
        "Declaraciones de impuestos de nómina, W-2 y 1099-NEC / 1099-MISC",
        "Conciliación de beneficios y deducciones de 401(k)",
        "Contable asignado y revisión de un CPA cada mes",
      ],
    },
    idealFor: {
      en: ["Companies with 5 to 250 employees", "Founders doing their own books", "Teams outgrowing a part-time bookkeeper", "Remote teams across states"],
      es: ["Empresas de 5 a 250 empleados", "Fundadores que llevan su propia contabilidad", "Equipos que han superado a un contable a tiempo parcial", "Equipos remotos en varios estados"],
    },
    process: [
      {
        title: { en: "Cleanup", es: "Puesta al día" },
        text: {
          en: "We fix historical books, set up a chart of accounts that fits your business and close open periods.",
          es: "Corregimos la contabilidad histórica, creamos un plan de cuentas adaptado y cerramos periodos abiertos.",
        },
      },
      {
        title: { en: "Integrations", es: "Integraciones" },
        text: {
          en: "We connect banks, cards, payroll, billing and expense tools so data flows automatically.",
          es: "Conectamos bancos, tarjetas, nómina, facturación y gastos para que los datos fluyan automáticamente.",
        },
      },
      {
        title: { en: "Monthly close", es: "Cierre mensual" },
        text: {
          en: "Reconciliations, accruals and a reviewed management pack delivered by day 10.",
          es: "Conciliaciones, devengos y un informe de gestión revisado entregado antes del día 10.",
        },
      },
      {
        title: { en: "Review call", es: "Reunión de revisión" },
        text: {
          en: "A short monthly call to walk through results, cash runway and anything that needs attention.",
          es: "Una breve llamada mensual para revisar resultados, liquidez y cualquier tema que requiera atención.",
        },
      },
    ],
    priceFrom: 650,
    priceUnit: "month",
    faqs: [
      {
        question: {
          en: "Which accounting software do you support?",
          es: "¿Qué software contable utilizan?",
        },
        answer: {
          en: "We work in QuickBooks Online, Xero and NetSuite, and connect payroll providers such as Gusto, Rippling and ADP. If you are on another system, we will recommend the best fit and handle the migration.",
          es: "Trabajamos con QuickBooks Online, Xero y NetSuite, y conectamos proveedores de nómina como Gusto, Rippling y ADP. Si usas otro sistema, te recomendaremos el más adecuado y nos encargaremos de la migración.",
        },
      },
      {
        question: {
          en: "How far behind can our books be?",
          es: "¿Qué tan atrasada puede estar nuestra contabilidad?",
        },
        answer: {
          en: "We regularly catch up 12 to 24 months of books. Catch-up work is quoted as a fixed fee and usually completed in three to six weeks.",
          es: "Ponemos al día habitualmente entre 12 y 24 meses de contabilidad. Este trabajo se cotiza con honorarios fijos y suele completarse en tres a seis semanas.",
        },
      },
      {
        question: {
          en: "Do you run payroll for employees in other states?",
          es: "¿Gestionan nómina para empleados en otros estados?",
        },
        answer: {
          en: "Yes. We register and file in every state where you have employees, and handle local taxes such as New York City and Yonkers resident withholding.",
          es: "Sí. Nos registramos y presentamos en cada estado donde tengas empleados, y gestionamos impuestos locales como la retención para residentes de la Ciudad de Nueva York y Yonkers.",
        },
      },
    ],
    related: ["fractional-cfo", "sales-tax-compliance", "corporate-tax"],
  },
  {
    slug: "business-formation",
    icon: "building",
    image: images.signing,
    title: { en: "Business Formation", es: "Constitución de empresas" },
    summary: {
      en: "Choose the right entity, form it correctly and set up EIN, banking, payroll and tax elections from day one.",
      es: "Elige la entidad adecuada, constitúyela correctamente y configura EIN, banca, nómina y elecciones fiscales desde el primer día.",
    },
    overview: {
      en: [
        "Choosing between an LLC, S-corp and C-corp affects how much tax you pay, whether investors can fund you and how easy it is to sell the company later. Getting it right at the start is far cheaper than restructuring later.",
        "We model the tax impact of each option, coordinate with your attorney on formation documents and handle the filings that follow: EIN, state registrations, S-corp elections, New York LLC publication requirements, payroll accounts and bookkeeping setup.",
      ],
      es: [
        "Elegir entre una LLC, S-corp o C-corp influye en cuántos impuestos pagas, si los inversores pueden financiarte y lo fácil que será vender la empresa. Hacerlo bien desde el inicio es mucho más barato que reestructurar después.",
        "Modelamos el impacto fiscal de cada opción, coordinamos con tu abogado los documentos de constitución y gestionamos los trámites posteriores: EIN, registros estatales, elección de S-corp, requisitos de publicación de LLC en Nueva York, cuentas de nómina y configuración contable.",
      ],
    },
    included: {
      en: [
        "Entity selection analysis with a tax comparison",
        "Delaware or New York formation coordination",
        "EIN application and IRS Form 2553 S-corp election",
        "New York LLC publication requirement management",
        "Foreign qualification in additional states",
        "Business bank, payroll and bookkeeping setup",
        "Founder equity and 83(b) election guidance",
      ],
      es: [
        "Análisis de elección de entidad con comparación fiscal",
        "Coordinación de constitución en Delaware o Nueva York",
        "Solicitud de EIN y elección de S-corp con el Formulario 2553 del IRS",
        "Gestión del requisito de publicación de LLC en Nueva York",
        "Registro como entidad extranjera en otros estados",
        "Configuración de banco, nómina y contabilidad",
        "Orientación sobre acciones de fundadores y elección 83(b)",
      ],
    },
    idealFor: {
      en: ["First-time founders", "Freelancers becoming an agency", "International founders entering the U.S.", "Companies preparing to raise capital"],
      es: ["Fundadores primerizos", "Freelancers que se convierten en agencia", "Fundadores internacionales que entran en EE. UU.", "Empresas que se preparan para levantar capital"],
    },
    process: [
      {
        title: { en: "Strategy call", es: "Llamada estratégica" },
        text: {
          en: "We learn your goals, funding plans and ownership to recommend the right structure.",
          es: "Conocemos tus objetivos, planes de financiación y propiedad para recomendar la estructura adecuada.",
        },
      },
      {
        title: { en: "Formation", es: "Constitución" },
        text: {
          en: "We coordinate state filings and work with your counsel on operating agreements or bylaws.",
          es: "Coordinamos los trámites estatales y trabajamos con tu abogado en los estatutos o acuerdos operativos.",
        },
      },
      {
        title: { en: "Registrations", es: "Registros" },
        text: {
          en: "EIN, tax elections, state tax accounts and any required publications.",
          es: "EIN, elecciones fiscales, cuentas fiscales estatales y publicaciones obligatorias.",
        },
      },
      {
        title: { en: "Launch-ready", es: "Lista para operar" },
        text: {
          en: "Banking, accounting software and payroll configured so you can start invoicing.",
          es: "Banca, software contable y nómina configurados para que puedas empezar a facturar.",
        },
      },
    ],
    priceFrom: 1200,
    priceUnit: "project",
    faqs: [
      {
        question: {
          en: "Should I form in Delaware or New York?",
          es: "¿Debo constituir la empresa en Delaware o en Nueva York?",
        },
        answer: {
          en: "If you plan to raise venture capital, a Delaware C-corp is the standard. For most service businesses and bootstrapped companies operating in New York, a New York LLC is simpler and avoids paying two sets of state fees.",
          es: "Si planeas levantar capital de riesgo, una C-corp de Delaware es el estándar. Para la mayoría de empresas de servicios y autofinanciadas que operan en Nueva York, una LLC de Nueva York es más sencilla y evita pagar tasas en dos estados.",
        },
      },
      {
        question: {
          en: "What is the New York LLC publication requirement?",
          es: "¿Qué es el requisito de publicación de LLC en Nueva York?",
        },
        answer: {
          en: "New York LLCs must publish a notice in two newspapers for six consecutive weeks within 120 days of formation. Costs vary widely by county; we handle it in lower-cost counties where eligible.",
          es: "Las LLC de Nueva York deben publicar un aviso en dos periódicos durante seis semanas consecutivas dentro de los 120 días posteriores a la constitución. El costo varía mucho por condado; lo gestionamos en condados de menor costo cuando es posible.",
        },
      },
      {
        question: {
          en: "Can you help non-U.S. founders?",
          es: "¿Pueden ayudar a fundadores de fuera de EE. UU.?",
        },
        answer: {
          en: "Yes. We regularly help international founders obtain an EIN without an SSN, open U.S. bank accounts and understand Form 5472 reporting for foreign-owned entities.",
          es: "Sí. Ayudamos con frecuencia a fundadores internacionales a obtener un EIN sin SSN, abrir cuentas bancarias en EE. UU. y entender el reporte del Formulario 5472 para entidades de propiedad extranjera.",
        },
      },
    ],
    related: ["bookkeeping-payroll", "corporate-tax", "fractional-cfo"],
  },
  {
    slug: "audit-support",
    icon: "shield",
    image: images.reviewing,
    title: { en: "Audit Support", es: "Soporte de auditoría" },
    summary: {
      en: "Audit-ready financials, PBC lists and representation for IRS, state and investor or lender audits.",
      es: "Estados financieros listos para auditoría, listas PBC y representación ante auditorías del IRS, estatales, de inversores o prestamistas.",
    },
    overview: {
      en: [
        "Whether your board requires a first financial statement audit, a lender asks for reviewed statements or the IRS sends an examination letter, preparation makes the difference between a smooth process and months of disruption.",
        "We get your books audit-ready under U.S. GAAP, including revenue recognition under ASC 606 and lease accounting under ASC 842. We manage the request list, coordinate with your audit firm and represent you before tax authorities.",
      ],
      es: [
        "Ya sea que tu consejo exija una primera auditoría de estados financieros, un prestamista pida estados revisados o el IRS envíe una carta de examen, la preparación marca la diferencia entre un proceso fluido y meses de interrupciones.",
        "Preparamos tu contabilidad para auditoría bajo U.S. GAAP, incluyendo el reconocimiento de ingresos según ASC 606 y arrendamientos según ASC 842. Gestionamos la lista de solicitudes, coordinamos con tu firma auditora y te representamos ante las autoridades fiscales.",
      ],
    },
    included: {
      en: [
        "GAAP readiness assessment and adjusting entries",
        "ASC 606 revenue recognition and ASC 842 lease schedules",
        "Prepared-by-client (PBC) list management",
        "Audit firm selection and coordination",
        "IRS and state examination representation",
        "Sales tax and payroll tax audit defense",
        "Internal controls documentation",
      ],
      es: [
        "Evaluación de preparación bajo GAAP y asientos de ajuste",
        "Reconocimiento de ingresos ASC 606 y calendarios de arrendamiento ASC 842",
        "Gestión de la lista PBC (preparada por el cliente)",
        "Selección y coordinación de la firma auditora",
        "Representación en exámenes del IRS y del estado",
        "Defensa en auditorías de impuesto sobre ventas y nómina",
        "Documentación de controles internos",
      ],
    },
    idealFor: {
      en: ["Companies facing a first audit", "Series A and later startups", "Businesses with bank covenants", "Anyone who received an IRS letter"],
      es: ["Empresas ante su primera auditoría", "Startups de Serie A en adelante", "Empresas con covenants bancarios", "Quien haya recibido una carta del IRS"],
    },
    process: [
      {
        title: { en: "Readiness review", es: "Revisión de preparación" },
        text: {
          en: "We assess your books against GAAP and auditor expectations and list every gap.",
          es: "Evaluamos tu contabilidad frente a GAAP y las expectativas del auditor y listamos cada brecha.",
        },
      },
      {
        title: { en: "Remediation", es: "Corrección" },
        text: {
          en: "We post adjustments, build schedules and document key policies and controls.",
          es: "Registramos ajustes, preparamos calendarios y documentamos políticas y controles clave.",
        },
      },
      {
        title: { en: "Fieldwork", es: "Trabajo de campo" },
        text: {
          en: "We manage requests and auditor questions so your team can keep running the business.",
          es: "Gestionamos solicitudes y preguntas del auditor para que tu equipo siga operando el negocio.",
        },
      },
      {
        title: { en: "Close-out", es: "Cierre" },
        text: {
          en: "We review the draft report and management letter and plan improvements for next year.",
          es: "Revisamos el borrador del informe y la carta de recomendaciones y planificamos mejoras para el próximo año.",
        },
      },
    ],
    priceFrom: 4500,
    priceUnit: "project",
    faqs: [
      {
        question: {
          en: "Do you perform the audit itself?",
          es: "¿Realizan ustedes la auditoría?",
        },
        answer: {
          en: "No. To preserve independence we prepare you for the audit and coordinate with a separate, independent audit firm. We can introduce you to trusted firms that fit your size and budget.",
          es: "No. Para preservar la independencia, te preparamos para la auditoría y coordinamos con una firma auditora independiente. Podemos presentarte firmas de confianza adecuadas a tu tamaño y presupuesto.",
        },
      },
      {
        question: {
          en: "We received an IRS notice. What should we do?",
          es: "Recibimos una notificación del IRS. ¿Qué debemos hacer?",
        },
        answer: {
          en: "Do not ignore it, and do not call the IRS before getting advice. Send us the notice; we will explain what it means within one business day and respond on your behalf under a power of attorney.",
          es: "No la ignores ni llames al IRS antes de recibir asesoría. Envíanos la notificación; te explicaremos lo que significa en un día hábil y responderemos en tu nombre mediante un poder notarial.",
        },
      },
      {
        question: {
          en: "How long does audit preparation take?",
          es: "¿Cuánto tarda la preparación para una auditoría?",
        },
        answer: {
          en: "For a first-year financial statement audit, plan for six to ten weeks of readiness work before fieldwork. Subsequent years are much faster when books are kept audit-ready.",
          es: "Para una primera auditoría de estados financieros, calcula de seis a diez semanas de preparación antes del trabajo de campo. Los años siguientes son mucho más rápidos si la contabilidad se mantiene lista.",
        },
      },
    ],
    related: ["bookkeeping-payroll", "fractional-cfo", "corporate-tax"],
  },
  {
    slug: "fractional-cfo",
    icon: "chart",
    image: images.boardroom,
    title: { en: "Fractional CFO", es: "CFO fraccional" },
    summary: {
      en: "Forecasting, fundraising support, board reporting and unit economics from an experienced CFO, part-time.",
      es: "Proyecciones, apoyo en rondas de inversión, reportes al consejo y economía unitaria de un CFO experimentado, a tiempo parcial.",
    },
    overview: {
      en: [
        "A full-time CFO in New York costs $300,000 or more. Most companies between $2M and $50M in revenue need that level of thinking, but not 40 hours a week of it.",
        "Our fractional CFOs build your financial model, own the budget and forecast, prepare board and investor reporting, and sit beside you in fundraising, pricing and hiring decisions. You get strategic finance leadership with the accounting team already in place underneath.",
      ],
      es: [
        "Un CFO a tiempo completo en Nueva York cuesta $300,000 o más. La mayoría de las empresas con ingresos entre $2M y $50M necesitan ese nivel de análisis, pero no 40 horas a la semana.",
        "Nuestros CFO fraccionales construyen tu modelo financiero, se encargan del presupuesto y las proyecciones, preparan reportes para el consejo e inversores, y te acompañan en decisiones de financiación, precios y contratación. Obtienes liderazgo financiero estratégico con el equipo contable ya integrado.",
      ],
    },
    included: {
      en: [
        "Three-statement financial model and 18-month forecast",
        "Annual budget and monthly budget-versus-actual analysis",
        "Board deck and investor update preparation",
        "Fundraising data room and due diligence support",
        "Unit economics, pricing and cohort analysis",
        "Cash management, runway and banking relationships",
        "KPI dashboard tailored to your business model",
      ],
      es: [
        "Modelo financiero de tres estados y proyección a 18 meses",
        "Presupuesto anual y análisis mensual de presupuesto frente a real",
        "Preparación de presentaciones al consejo y actualizaciones a inversores",
        "Sala de datos para rondas y apoyo en due diligence",
        "Economía unitaria, precios y análisis de cohortes",
        "Gestión de caja, runway y relaciones bancarias",
        "Panel de KPIs adaptado a tu modelo de negocio",
      ],
    },
    idealFor: {
      en: ["Startups raising a seed to Series B round", "Founder-led companies from $2M to $50M", "Businesses planning an acquisition or exit", "Teams without an in-house finance leader"],
      es: ["Startups que levantan una ronda semilla a Serie B", "Empresas lideradas por fundadores de $2M a $50M", "Negocios que planean una adquisición o salida", "Equipos sin un líder financiero interno"],
    },
    process: [
      {
        title: { en: "Assessment", es: "Evaluación" },
        text: {
          en: "We review your model, reporting and goals and agree on the top three finance priorities.",
          es: "Revisamos tu modelo, reportes y objetivos y acordamos las tres prioridades financieras clave.",
        },
      },
      {
        title: { en: "Foundation", es: "Bases" },
        text: {
          en: "We build or rebuild the financial model, KPI dashboard and reporting calendar.",
          es: "Construimos o rehacemos el modelo financiero, el panel de KPIs y el calendario de reportes.",
        },
      },
      {
        title: { en: "Operating rhythm", es: "Ritmo operativo" },
        text: {
          en: "Monthly forecast updates, leadership finance reviews and quarterly board reporting.",
          es: "Actualizaciones mensuales de proyecciones, revisiones financieras con dirección y reportes trimestrales al consejo.",
        },
      },
      {
        title: { en: "Strategic projects", es: "Proyectos estratégicos" },
        text: {
          en: "Fundraising, pricing changes, debt financing or M&A, led alongside your leadership team.",
          es: "Rondas, cambios de precios, financiación con deuda o M&A, junto a tu equipo directivo.",
        },
      },
    ],
    priceFrom: 3500,
    priceUnit: "month",
    faqs: [
      {
        question: {
          en: "How many hours does a fractional CFO work with us?",
          es: "¿Cuántas horas trabaja con nosotros un CFO fraccional?",
        },
        answer: {
          en: "Most engagements range from two to eight days per month, scaled up around board meetings and fundraising. Pricing is a fixed monthly retainer rather than hourly billing.",
          es: "La mayoría de los proyectos van de dos a ocho días al mes, con más dedicación en reuniones de consejo y rondas. El precio es una cuota mensual fija, no por horas.",
        },
      },
      {
        question: {
          en: "Do we need bookkeeping with you to hire a fractional CFO?",
          es: "¿Necesitamos contratar la contabilidad con ustedes para tener un CFO fraccional?",
        },
        answer: {
          en: "It is not required, but it is recommended. When our team runs the close, your CFO spends time on strategy instead of fixing data, which usually lowers the total cost.",
          es: "No es obligatorio, pero sí recomendable. Cuando nuestro equipo hace el cierre, tu CFO dedica su tiempo a la estrategia en lugar de corregir datos, lo que suele reducir el costo total.",
        },
      },
      {
        question: {
          en: "Can a fractional CFO help us raise capital?",
          es: "¿Puede un CFO fraccional ayudarnos a levantar capital?",
        },
        answer: {
          en: "Yes. We build the model and data room, pressure-test your metrics before investors do and manage financial due diligence so you can focus on the pitch.",
          es: "Sí. Construimos el modelo y la sala de datos, ponemos a prueba tus métricas antes que los inversores y gestionamos la due diligence financiera para que te concentres en la presentación.",
        },
      },
    ],
    related: ["bookkeeping-payroll", "corporate-tax", "audit-support"],
  },
];

export const serviceSlugs = services.map((service) => service.slug);

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServices(slugs: ServiceSlug[]) {
  return slugs
    .map((slug) => getService(slug))
    .filter((service): service is Service => Boolean(service));
}
