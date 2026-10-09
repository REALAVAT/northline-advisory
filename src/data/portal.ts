import type { Localized } from "./types";

export const DEMO_ANCHOR_DATE = "2026-10-09";

export const demoClient = {
  company: "Hudson & Pine Coffee Co.",
  legalName: "Hudson & Pine Coffee Co. LLC",
  ein: "84-•••4721",
  entity: { en: "LLC taxed as S-corp", es: "LLC tributando como S-corp" } satisfies Localized,
  fiscalYear: { en: "December 31", es: "31 de diciembre" } satisfies Localized,
  address: "118 West 27th Street, New York, NY 10001",
  contactName: "Jordan Ellis",
  contactFirstName: "Jordan",
  contactEmail: "jordan@hudsonpine.coffee",
  contactPhone: "+1 (212) 555-0193",
  advisorSlug: "priya-natarajan",
};

export type DeadlineKind = "tax" | "payroll" | "filing";

export interface Deadline {
  id: string;
  title: Localized;
  form: string;
  offsetDays: number;
  kind: DeadlineKind;
}

export const deadlines: Deadline[] = [
  {
    id: "d1",
    title: { en: "NYS sales tax return (quarterly)", es: "Declaración de impuesto sobre ventas de NYS (trimestral)" },
    form: "ST-100",
    offsetDays: 3,
    kind: "tax",
  },
  {
    id: "d2",
    title: { en: "Federal payroll tax return", es: "Declaración federal de impuestos de nómina" },
    form: "Form 941",
    offsetDays: 15,
    kind: "payroll",
  },
  {
    id: "d3",
    title: { en: "Extended S-corp return (filed)", es: "Declaración S-corp prorrogada (presentada)" },
    form: "Form 1120-S",
    offsetDays: -24,
    kind: "filing",
  },
  {
    id: "d4",
    title: { en: "Q4 estimated tax payment", es: "Pago estimado de impuestos del T4" },
    form: "Form 1040-ES",
    offsetDays: 98,
    kind: "tax",
  },
];

export interface PortalTask {
  id: string;
  title: Localized;
  done: boolean;
  offsetDays: number;
}

export const tasks: PortalTask[] = [
  { id: "t1", title: { en: "Upload September bank statements", es: "Subir extractos bancarios de septiembre" }, done: true, offsetDays: -2 },
  { id: "t2", title: { en: "Approve Q3 sales tax return", es: "Aprobar la declaración de impuesto sobre ventas del T3" }, done: false, offsetDays: 2 },
  { id: "t3", title: { en: "Categorize 6 uncategorized card expenses", es: "Clasificar 6 gastos de tarjeta sin categoría" }, done: false, offsetDays: 5 },
  { id: "t4", title: { en: "Sign engagement letter for 2027", es: "Firmar la carta de encargo para 2027" }, done: false, offsetDays: 21 },
  { id: "t5", title: { en: "Confirm new hire details for payroll", es: "Confirmar datos de la nueva contratación para nómina" }, done: true, offsetDays: -6 },
];

export type DocumentCategory = "tax" | "statements" | "payroll" | "legal";

export interface PortalDocument {
  id: string;
  name: string;
  category: DocumentCategory;
  offsetDays: number;
  sizeKb: number;
}

export const documentCategories: Record<DocumentCategory, Localized> = {
  tax: { en: "Tax returns", es: "Declaraciones" },
  statements: { en: "Financial statements", es: "Estados financieros" },
  payroll: { en: "Payroll", es: "Nómina" },
  legal: { en: "Legal & engagement", es: "Legal y encargo" },
};

export const documents: PortalDocument[] = [
  { id: "doc1", name: "September 2026 Management Report.pdf", category: "statements", offsetDays: -1, sizeKb: 842 },
  { id: "doc2", name: "Q3 2026 Sales Tax Workpapers.pdf", category: "tax", offsetDays: -3, sizeKb: 316 },
  { id: "doc3", name: "2025 Form 1120-S (Filed).pdf", category: "tax", offsetDays: -24, sizeKb: 1290 },
  { id: "doc4", name: "Payroll Register September 2026.pdf", category: "payroll", offsetDays: -8, sizeKb: 204 },
  { id: "doc5", name: "August 2026 Management Report.pdf", category: "statements", offsetDays: -32, sizeKb: 811 },
  { id: "doc6", name: "2026 Engagement Letter.pdf", category: "legal", offsetDays: -280, sizeKb: 158 },
  { id: "doc7", name: "2025 NYS CT-3-S (Filed).pdf", category: "tax", offsetDays: -24, sizeKb: 640 },
  { id: "doc8", name: "Q2 2026 Form 941.pdf", category: "payroll", offsetDays: -71, sizeKb: 122 },
];

export type InvoiceStatus = "paid" | "due" | "overdue";

export interface Invoice {
  id: string;
  number: string;
  description: Localized;
  issuedOffset: number;
  dueOffset: number;
  amount: number;
  status: InvoiceStatus;
}

export const invoices: Invoice[] = [
  {
    id: "inv1",
    number: "NLA-10482",
    description: { en: "October retainer: bookkeeping, payroll & sales tax", es: "Cuota de octubre: contabilidad, nómina e impuesto sobre ventas" },
    issuedOffset: -8,
    dueOffset: 7,
    amount: 1850,
    status: "due",
  },
  {
    id: "inv2",
    number: "NLA-10391",
    description: { en: "2025 S-corp and NYS returns (extension)", es: "Declaraciones S-corp y NYS 2025 (prórroga)" },
    issuedOffset: -24,
    dueOffset: -9,
    amount: 3500,
    status: "paid",
  },
  {
    id: "inv3",
    number: "NLA-10377",
    description: { en: "September retainer: bookkeeping, payroll & sales tax", es: "Cuota de septiembre: contabilidad, nómina e impuesto sobre ventas" },
    issuedOffset: -39,
    dueOffset: -24,
    amount: 1850,
    status: "paid",
  },
  {
    id: "inv4",
    number: "NLA-10288",
    description: { en: "August retainer: bookkeeping, payroll & sales tax", es: "Cuota de agosto: contabilidad, nómina e impuesto sobre ventas" },
    issuedOffset: -70,
    dueOffset: -55,
    amount: 1850,
    status: "paid",
  },
  {
    id: "inv5",
    number: "NLA-10176",
    description: { en: "Sales tax voluntary disclosure (NJ, CT)", es: "Divulgación voluntaria de impuesto sobre ventas (NJ, CT)" },
    issuedOffset: -96,
    dueOffset: -81,
    amount: 2400,
    status: "paid",
  },
];

export interface PortalMessage {
  id: string;
  author: "advisor" | "client";
  authorName: string;
  body: Localized;
  offsetMinutes: number;
}

export interface Conversation {
  id: string;
  subject: Localized;
  participants: string;
  unread: boolean;
  messages: PortalMessage[];
}

export const conversations: Conversation[] = [
  {
    id: "c1",
    subject: { en: "Q3 sales tax return ready for approval", es: "Declaración de impuesto sobre ventas del T3 lista para aprobar" },
    participants: "Priya Natarajan",
    unread: true,
    messages: [
      {
        id: "m1",
        author: "advisor",
        authorName: "Priya Natarajan",
        body: {
          en: "Hi Jordan, your Q3 New York sales tax return is ready. Taxable sales were $214,380 and tax due is $19,026. The workpapers are in Documents. Could you approve by Friday so we can file ahead of the deadline?",
          es: "Hola Jordan, tu declaración de impuesto sobre ventas de Nueva York del T3 está lista. Las ventas gravables fueron $214,380 y el impuesto a pagar es $19,026. Los papeles de trabajo están en Documentos. ¿Podrías aprobarla antes del viernes para presentarla antes del plazo?",
        },
        offsetMinutes: -1460,
      },
      {
        id: "m2",
        author: "client",
        authorName: "Jordan Ellis",
        body: {
          en: "Thanks Priya. Quick question: does this include the wholesale orders to the Brooklyn cafés? Those should be exempt with resale certificates.",
          es: "Gracias Priya. Una pregunta: ¿incluye los pedidos mayoristas a las cafeterías de Brooklyn? Deberían estar exentos con certificados de reventa.",
        },
        offsetMinutes: -1380,
      },
      {
        id: "m3",
        author: "advisor",
        authorName: "Priya Natarajan",
        body: {
          en: "Good catch. Those $38,200 in wholesale sales are already excluded; we have certificates on file for all four cafés. You are all set to approve.",
          es: "Buena observación. Esas ventas mayoristas de $38,200 ya están excluidas; tenemos certificados archivados de las cuatro cafeterías. Puedes aprobarla.",
        },
        offsetMinutes: -95,
      },
    ],
  },
  {
    id: "c2",
    subject: { en: "New hire: payroll setup", es: "Nueva contratación: alta en nómina" },
    participants: "Daniel Brooks",
    unread: false,
    messages: [
      {
        id: "m4",
        author: "advisor",
        authorName: "Daniel Brooks",
        body: {
          en: "Welcome aboard to your new barista lead. We received the W-4 and IT-2104 and they will be on the next payroll run.",
          es: "Bienvenida a tu nueva jefa de baristas. Recibimos el W-4 y el IT-2104 y estará en la próxima nómina.",
        },
        offsetMinutes: -8700,
      },
    ],
  },
  {
    id: "c3",
    subject: { en: "Year-end planning meeting", es: "Reunión de planificación de fin de año" },
    participants: "Eleanor Whitfield",
    unread: false,
    messages: [
      {
        id: "m5",
        author: "advisor",
        authorName: "Eleanor Whitfield",
        body: {
          en: "Let's schedule our year-end planning session for early November. We will review the second location's buildout, depreciation options and your reasonable salary for 2027.",
          es: "Programemos la sesión de planificación de fin de año para principios de noviembre. Revisaremos la obra del segundo local, las opciones de depreciación y tu salario razonable para 2027.",
        },
        offsetMinutes: -20160,
      },
    ],
  },
];
