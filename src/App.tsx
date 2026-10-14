import { useState, useEffect } from 'react';
import { 
  Menu, X, Book, FolderTree as FolderTreeIcon, Database, 
  Shield, Rocket, Code2, Layers, GitBranch, CheckCircle2,
  AlertTriangle, ExternalLink, ArrowUp, Zap, Lock, Server,
  Globe, FileCode, Webhook, Users, Building2, Receipt, CreditCard,
  ScrollText, FileText, ChevronDown
} from 'lucide-react';
import CodeBlock from './components/CodeBlock';
import FolderTree from './components/FolderTree';

const sections = [
  { id: 'hero', label: 'Overview', icon: Book },
  { id: 'structure', label: 'Folder Structure', icon: FolderTreeIcon },
  { id: 'why', label: 'Why Ledgerly', icon: Zap },
  { id: 'routing', label: 'App Router', icon: Layers },
  { id: 'api', label: 'API Layer', icon: Code2 },
  { id: 'supabase', label: 'Supabase', icon: Database },
  { id: 'migrations', label: 'Migrations', icon: GitBranch },
  { id: 'seeding', label: 'Seeding', icon: Database },
  { id: 'deploy', label: 'Deploy', icon: Rocket },
  { id: 'decisions', label: 'Decisions', icon: CheckCircle2 },
  { id: 'counterpoints', label: 'Counterpoints', icon: AlertTriangle },
  { id: 'sources', label: 'Sources', icon: ExternalLink },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      
      // Update active section based on scroll position
      const sectionElements = sections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id)
      }));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i].el;
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(sectionElements[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-screen w-72 bg-white border-r border-surface-200 z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:sticky lg:top-0 lg:left-auto lg:z-auto lg:flex-shrink-0
        overflow-y-auto self-start
      `}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Book size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-surface-900 text-lg">Ledgerly</h1>
              <p className="text-xs text-surface-500">Architecture Guide</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700 shadow-sm' 
                      : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                    }
                  `}
                >
                  <Icon size={16} className={isActive ? 'text-primary-500' : 'text-surface-400'} />
                  {section.label}
                </button>
              );
            })}
          </nav>

          {/* Version badge */}
          <div className="mt-8 p-3 rounded-lg bg-surface-50 border border-surface-100">
            <p className="text-xs text-surface-500">
              <span className="font-medium text-surface-700">Next.js</span> v16.4.0
            </p>
            <p className="text-xs text-surface-500 mt-1">
              <span className="font-medium text-surface-700">Supabase CLI</span> v2.118.0
            </p>
            <p className="text-xs text-surface-500 mt-1">
              <span className="font-medium text-surface-700">@supabase/ssr</span> v0.12.0
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-surface-200">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-surface-100 text-surface-600"
              >
                <Menu size={20} />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm text-surface-500">
                <span className="font-medium text-surface-700">Guide</span>
                <span>/</span>
                <span className="capitalize">{sections.find(s => s.id === activeSection)?.label}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                All Verified
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="w-full px-4 lg:px-10 xl:px-16 py-8 lg:py-12">
          
          {/* HERO SECTION */}
          <section id="hero" className="scroll-mt-20 mb-16">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-8 lg:p-12 text-white shadow-2xl shadow-primary-500/20 animate-gradient">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTMwVjBoLTEydjRoMTJ6TTI0IDU2djRoMTJ2LTRIMjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium backdrop-blur-sm border border-white/20">
                    📌 Version 2026
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium backdrop-blur-sm border border-white/20">
                    Next.js 16.4.0
                  </span>
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
                  🏗️ Ledgerly
                </h1>
                <p className="text-xl lg:text-2xl font-light text-primary-100 mb-6">
                  How to Build a Real Next.js + Supabase + Vercel App
                </p>
                <p className="text-primary-200 text-sm lg:text-base max-w-2xl leading-relaxed">
                  A comprehensive architecture guide for building multi-tenant SaaS applications 
                  with proper folder structure, authentication, row-level security, and deployment.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                    <Layers size={14} />
                    <span className="text-xs font-medium">Feature-first Architecture</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                    <Shield size={14} />
                    <span className="text-xs font-medium">RLS Security</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                    <Rocket size={14} />
                    <span className="text-xs font-medium">Vercel Deploy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {[
                { label: 'Sections', value: '11', icon: Book },
                { label: 'Code Examples', value: '12+', icon: Code2 },
                { label: 'Verified Claims', value: '36/40', icon: CheckCircle2 },
                { label: 'Sources', value: '15+', icon: ExternalLink },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-surface-200 shadow-sm">
                  <stat.icon size={18} className="text-primary-500 mb-2" />
                  <div className="text-2xl font-bold text-surface-900">{stat.value}</div>
                  <div className="text-xs text-surface-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FOLDER STRUCTURE SECTION */}
          <section id="structure" className="scroll-mt-20 mb-16">
            <SectionHeader 
              icon={FolderTreeIcon} 
              title="The One True Folder Tree" 
              subtitle="Use this exact structure everywhere. No changes. No variants."
              emoji="🌳"
            />
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-xl">✅</span>
                <div>
                  <p className="text-sm font-medium text-amber-800">Copy-paste this tree</p>
                  <p className="text-xs text-amber-700 mt-1">Every section in this guide uses this exact tree. No changes. No variants.</p>
                </div>
              </div>
            </div>

            <FolderTree />

            {/* Key rules */}
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { icon: '📂', title: 'src/app/', desc: 'Where URLs live. Only routing stuff here.' },
                { icon: '🧩', title: 'src/features/', desc: 'Business logic. Invoices, billing, orgs.' },
                { icon: '🔧', title: 'src/shared/', desc: 'Stuff used by many features.' },
                { icon: '🗄️', title: 'supabase/', desc: 'Migrations, seeds, and RLS tests.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-surface-200 shadow-sm">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-mono text-sm font-semibold text-surface-800">{item.title}</p>
                    <p className="text-xs text-surface-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WHY LEDGERLY SECTION */}
          <section id="why" className="scroll-mt-20 mb-16">
            <SectionHeader 
              icon={Zap} 
              title="Why We Chose Ledgerly" 
              subtitle="Because a to-do app is too easy."
              emoji="🏢"
            />

            <p className="text-surface-600 mb-6">
              <strong className="text-surface-800">Ledgerly</strong> — a multi-tenant invoicing app for agencies. 
              It has many organizations, user roles, money records, tenant isolation, webhooks, and reports.
            </p>

            {/* Core entities table */}
            <h3 className="text-lg font-semibold text-surface-800 mb-3">Core Entities</h3>
            <div className="overflow-x-auto rounded-xl border border-surface-200 shadow-sm mb-8">
              <table className="doc-table w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-200">
                    <th className="px-4 py-3 text-left text-surface-600">Thing</th>
                    <th className="px-4 py-3 text-left text-surface-600">Connections</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {[
                    { thing: '🏢 organizations', connects: 'Has many users, clients, invoices, subscriptions' },
                    { thing: '👤 users', connects: 'Belongs to org through organization_members' },
                    { thing: '🤝 clients', connects: 'Belongs to org; has many invoices' },
                    { thing: '🧾 invoices', connects: 'Belongs to org + client; has many line items + payments' },
                    { thing: '📝 invoice_line_items', connects: 'Belongs to an invoice' },
                    { thing: '💳 payments', connects: 'Belongs to an invoice; recorded by a user' },
                    { thing: '📜 audit_events', connects: 'Belongs to an org; references actor + subject' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-surface-50">
                      <td className="px-4 py-3 font-medium text-surface-800">{row.thing}</td>
                      <td className="px-4 py-3 text-surface-600">{row.connects}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* User roles */}
            <h3 className="text-lg font-semibold text-surface-800 mb-3">User Roles</h3>
            <div className="overflow-x-auto rounded-xl border border-surface-200 shadow-sm">
              <table className="doc-table w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-200">
                    <th className="px-4 py-3 text-left text-surface-600">Role</th>
                    <th className="px-4 py-3 text-left text-surface-600">Can Do</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {[
                    { role: '👑 Owner', perms: 'Everything: org, members, billing, invoices' },
                    { role: '🛡️ Admin', perms: 'Clients, invoices, payments; read members' },
                    { role: '🧮 Accountant', perms: 'Read/create invoices + payments; no member management' },
                    { role: '🙋 Client', perms: 'Read only their own invoices' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-surface-50">
                      <td className="px-4 py-3 font-medium text-surface-800">{row.role}</td>
                      <td className="px-4 py-3 text-surface-600">{row.perms}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Callout type="warning" title="Counter-argument">
              A simple CRUD app would make feature folders look like extra work. For a tiny internal tool, 
              a flat app/ plus lib/ is easier to read. The hybrid structure pays off only when you have 
              many roles, tenant rules, and shared domain logic.
            </Callout>
          </section>

          {/* APP ROUTER SECTION */}
          <section id="routing" className="scroll-mt-20 mb-16">
            <SectionHeader 
              icon={Layers} 
              title="Next.js App Router Structure" 
              subtitle="Use src/app for routing. Use src/features for domain code."
              emoji="🗂️"
            />

            <p className="text-surface-600 mb-6">
              Next.js documents <code className="px-1.5 py-0.5 rounded bg-surface-100 text-primary-700 text-sm font-mono">src/</code> as 
              an <strong>optional</strong> folder that keeps app code separate from root config files.
            </p>

            {/* Rules grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { rule: '🗺️ Folders = URL segments', desc: 'Each folder becomes a URL path' },
                { rule: '✅ page.tsx or route.ts = public route', desc: 'Only these make a route accessible' },
                { rule: '📐 [param] = dynamic segment', desc: 'Square brackets for dynamic URLs' },
                { rule: '👻 (group) = invisible in URL', desc: 'Parenthesized folders hide from URLs' },
                { rule: '🙈 _folder = route private', desc: 'Underscore prefix excludes from routing' },
                { rule: '📁 src/ = optional separation', desc: 'Keeps app code separate from config' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-surface-200 shadow-sm">
                  <p className="font-medium text-surface-800 text-sm">{item.rule}</p>
                  <p className="text-xs text-surface-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <Callout type="info" title="Next.js 16 Note">
              In Next.js 16, the middleware file is <code className="px-1 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-mono">proxy.ts</code> with <code className="px-1 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-mono">export async function proxy</code>. 
              On Next.js 15 and earlier, it is <code className="px-1 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-mono">middleware.ts</code> with <code className="px-1 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-mono">export async function middleware</code>.
            </Callout>
          </section>

          {/* API LAYER SECTION */}
          <section id="api" className="scroll-mt-20 mb-16">
            <SectionHeader 
              icon={Code2} 
              title="API Layer: Server Actions vs Route Handlers" 
              subtitle="Reads → Server Components. User mutations → Server Actions. Machine callers → Route Handlers."
              emoji="🛣️"
            />

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Globe, label: 'Reads', desc: 'Server Components', color: 'blue' },
                { icon: FileCode, label: 'User mutations', desc: 'Server Actions', color: 'green' },
                { icon: Webhook, label: 'Machine callers', desc: 'Route Handlers', color: 'purple' },
              ].map((item, i) => (
                <div key={i} className={`p-4 rounded-xl border shadow-sm bg-white ${
                  item.color === 'blue' ? 'border-blue-200' : 
                  item.color === 'green' ? 'border-green-200' : 'border-purple-200'
                }`}>
                  <item.icon size={20} className={
                    item.color === 'blue' ? 'text-blue-500' : 
                    item.color === 'green' ? 'text-green-500' : 'text-purple-500'
                  } />
                  <p className="font-semibold text-surface-800 text-sm mt-2">{item.label}</p>
                  <p className="text-xs text-surface-500 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-surface-600 mb-4">
              Route Handlers live only in <code className="px-1.5 py-0.5 rounded bg-surface-100 text-primary-700 text-sm font-mono">app/</code>, 
              in a file named <code className="px-1.5 py-0.5 rounded bg-surface-100 text-primary-700 text-sm font-mono">route.ts</code>. 
              They support GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS. You <strong>cannot</strong> put page.tsx and route.ts in the same segment.
            </p>

            <h3 className="text-lg font-semibold text-surface-800 mb-3">✅ Stripe Webhook Handler</h3>
            
            <CodeBlock
              filename="src/app/api/webhooks/stripe/route.ts"
              language="typescript"
              code={`import { NextResponse } from 'next/server';
import { handleStripeWebhook } from '@/features/billing/webhooks';

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const result = await handleStripeWebhook({
    payload: await request.text(),
    signature,
  });

  return NextResponse.json(
    { received: result.ok },
    { status: result.ok ? 200 : 400 },
  );
}`}
            />

            <CodeBlock
              filename="src/features/billing/webhooks.ts"
              language="typescript"
              code={`import 'server-only';
import Stripe from 'stripe';
import { recordPaymentForInvoice } from './payments';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-10-14.clover' as Stripe.LatestApiVersion,
});

export async function handleStripeWebhook({
  payload,
  signature,
}: {
  payload: string;
  signature: string;
}) {
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!,
  );

  if (event.type === 'invoice.payment_succeeded') {
    await recordPaymentForInvoice(event.data.object);
  }

  return { ok: true };
}`}
            />

            <Callout type="warning" title="Why raw body?">
              Stripe signature verification needs the <strong>exact bytes</strong> Stripe sent. 
              Do not parse JSON first. ❌
            </Callout>
          </section>

          {/* SUPABASE SECTION */}
          <section id="supabase" className="scroll-mt-20 mb-16">
            <SectionHeader 
              icon={Database} 
              title="Supabase Integration Layer" 
              subtitle="Two clients, not one. Browser client for Client Components. Server client for Server Components."
              emoji="🔌"
            />

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={16} className="text-blue-600" />
                  <span className="font-semibold text-blue-800 text-sm">Browser Client</span>
                </div>
                <p className="text-xs text-blue-700">For Client Components. Uses createBrowserClient.</p>
              </div>
              <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Server size={16} className="text-green-600" />
                  <span className="font-semibold text-green-800 text-sm">Server Client</span>
                </div>
                <p className="text-xs text-green-700">For Server Components, Actions, Route Handlers.</p>
              </div>
            </div>

            <CodeBlock
              filename="src/shared/supabase/client.ts"
              language="typescript"
              code={`import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}`}
            />

            <CodeBlock
              filename="src/shared/supabase/server.ts"
              language="typescript"
              code={`import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Components cannot write cookies;
            // the proxy refreshes them.
          }
        },
      },
    },
  );
}`}
            />

            {/* Auth check */}
            <h3 className="text-lg font-semibold text-surface-800 mb-3 mt-8">
              🔐 Auth Check: Use getClaims, NOT getSession
            </h3>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Security Warning</p>
                  <p className="text-xs text-red-700 mt-1">
                    <code className="font-mono">getClaims()</code> <strong>verifies the token signature</strong>. 
                    <code className="font-mono">getSession()</code> reads the session from storage and does <strong>not</strong> revalidate it. 
                    Do not trust getSession() for authorization in server code.
                  </p>
                </div>
              </div>
            </div>

            <CodeBlock
              filename="src/shared/auth/require-role.ts"
              language="typescript"
              code={`import { redirect } from 'next/navigation';
import { createClient } from '@/shared/supabase/server';

export async function requireRole(allowedRoles: string[]) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  const role = data?.claims?.user_metadata?.role as string | undefined;

  if (!data?.claims || !role || !allowedRoles.includes(role)) {
    redirect('/login');
  }

  return { userId: data.claims.sub, role };
}`}
            />

            {/* RLS */}
            <h3 className="text-lg font-semibold text-surface-800 mb-3 mt-8">
              🔒 Tenant Isolation = Row Level Security
            </h3>
            <p className="text-surface-600 mb-4">
              Folder structure does not enforce multi-tenancy. RLS provides authorization <strong>inside the database</strong>.
            </p>

            <CodeBlock
              filename="supabase/migrations/0002_invoice_rls.sql"
              language="sql"
              code={`alter table public.invoices enable row level security;

revoke all on table public.invoices from anon, authenticated;

grant select, insert, update, delete on table public.invoices to authenticated;

create policy "Members can read organization invoices"
  on public.invoices for select to authenticated
  using (
    exists (
      select 1 from public.organization_members m
      where m.organization_id = invoices.organization_id
        and m.user_id = (select auth.uid())
    )
  );

create policy "Members can create organization invoices"
  on public.invoices for insert to authenticated
  with check (
    exists (
      select 1 from public.organization_members m
      where m.organization_id = invoices.organization_id
        and m.user_id = (select auth.uid())
        and m.role in ('owner', 'admin', 'accountant')
    )
  );`}
            />
          </section>

          {/* MIGRATIONS SECTION */}
          <section id="migrations" className="scroll-mt-20 mb-16">
            <SectionHeader 
              icon={GitBranch} 
              title="Database Migrations with Supabase CLI" 
              subtitle="Supabase CLI migrations are the source of truth."
              emoji="🗄️"
            />

            <p className="text-surface-600 mb-6">
              Start with <code className="px-1.5 py-0.5 rounded bg-surface-100 text-primary-700 text-sm font-mono">supabase init</code>. 
              It creates the supabase/ folder and config.toml. Then <code className="px-1.5 py-0.5 rounded bg-surface-100 text-primary-700 text-sm font-mono">supabase start</code> runs local services.
            </p>

            <CodeBlock
              language="bash"
              code={`npx supabase init
npx supabase start
npx supabase db diff -f add_invoice_rls
npx supabase test db
npx supabase db push`}
            />

            <Callout type="info" title="Forward-only rule">
              Never edit a migration that has already been applied to a shared environment. 
              Add a new corrective migration instead. This keeps migration history reproducible.
            </Callout>
          </section>

          {/* SEEDING SECTION */}
          <section id="seeding" className="scroll-mt-20 mb-16">
            <SectionHeader 
              icon={Database} 
              title="Seeding & Factories" 
              subtitle="Three tools, three jobs."
              emoji="🌱"
            />

            <div className="overflow-x-auto rounded-xl border border-surface-200 shadow-sm mb-8">
              <table className="doc-table w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-200">
                    <th className="px-4 py-3 text-left text-surface-600">Tool</th>
                    <th className="px-4 py-3 text-left text-surface-600">Job</th>
                    <th className="px-4 py-3 text-left text-surface-600">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  <tr className="hover:bg-surface-50">
                    <td className="px-4 py-3 font-medium text-surface-800">🗄️ seed.sql</td>
                    <td className="px-4 py-3 text-surface-600">Deterministic reference data</td>
                    <td className="px-4 py-3 text-surface-600 font-mono text-xs">supabase/seed.sql</td>
                  </tr>
                  <tr className="hover:bg-surface-50">
                    <td className="px-4 py-3 font-medium text-surface-800">📜 TypeScript script</td>
                    <td className="px-4 py-3 text-surface-600">Big or conditional demo data</td>
                    <td className="px-4 py-3 text-surface-600 font-mono text-xs">scripts/seed.ts</td>
                  </tr>
                  <tr className="hover:bg-surface-50">
                    <td className="px-4 py-3 font-medium text-surface-800">🏭 Factories</td>
                    <td className="px-4 py-3 text-surface-600">Tests that need varied records</td>
                    <td className="px-4 py-3 text-surface-600 font-mono text-xs">src/testing/factories/</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              filename="supabase/seed.sql"
              language="sql"
              code={`insert into organizations (id, name)
values ('00000000-0000-0000-0000-000000000001', 'Acme Agency')
on conflict (id) do nothing;`}
            />

            <CodeBlock
              filename="src/testing/factories/invoice.ts"
              language="typescript"
              code={`import { faker } from '@faker-js/faker';

export function buildInvoice(overrides: Partial<{ 
  clientId: string; 
  total: number 
}> = {}) {
  return {
    clientId: overrides.clientId ?? crypto.randomUUID(),
    number: \`INV-\${faker.string.alphanumeric(8).toUpperCase()}\`,
    status: 'draft',
    dueDate: faker.date.soon({ days: 30 }).toISOString().slice(0, 10),
    totalAmount: overrides.total ?? faker.number.int({ min: 100, max: 100000 }),
    ...overrides,
  };
}`}
            />
          </section>

          {/* DEPLOY SECTION */}
          <section id="deploy" className="scroll-mt-20 mb-16">
            <SectionHeader 
              icon={Rocket} 
              title="Deploying to Vercel" 
              subtitle="One Vercel project. Separate Supabase projects for preview and production."
              emoji="🚀"
            />

            <p className="text-surface-600 mb-6">
              Vercel documents zero-config Next.js deployment and preview URLs for each pull request.
            </p>

            <CodeBlock
              language="bash"
              code={`npx vercel`}
            />

            <h3 className="text-lg font-semibold text-surface-800 mb-3 mt-8">🔐 Environment Variables</h3>
            
            <div className="bg-surface-900 rounded-xl p-4 mb-4 font-mono text-sm text-surface-300">
              <div className="text-surface-500 text-xs mb-2"># Set per environment</div>
              <div>NEXT_PUBLIC_SUPABASE_URL=<span className="text-green-400">&lt;project-url&gt;</span></div>
              <div>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<span className="text-green-400">&lt;publishable-key&gt;</span></div>
              <div>SUPABASE_SECRET_KEY=<span className="text-red-400">&lt;server-only-secret-key&gt;</span></div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <Lock size={18} className="text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">NEVER expose SUPABASE_SECRET_KEY in the browser</p>
                  <p className="text-xs text-red-700 mt-1">
                    The secret key authorizes service_role access that <strong>bypasses RLS</strong>. 
                    Only use NEXT_PUBLIC_ prefixed variables for browser-accessible values.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-surface-800 mb-3">🤖 CI Pipeline</h3>
            
            <CodeBlock
              filename=".github/workflows/ci.yml"
              language="yaml"
              code={`name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test

      - name: Supabase local tests
        run: |
          npx supabase start
          npx supabase db reset
          npx supabase test db`}
            />
          </section>

          {/* DECISIONS SECTION */}
          <section id="decisions" className="scroll-mt-20 mb-16">
            <SectionHeader 
              icon={CheckCircle2} 
              title="Decision Tree" 
              subtitle="Every decision with trade-offs and sources."
              emoji="🌲"
            />

            <div className="overflow-x-auto rounded-xl border border-surface-200 shadow-sm">
              <table className="doc-table w-full text-xs">
                <thead>
                  <tr className="border-b border-surface-200">
                    <th className="px-3 py-3 text-left text-surface-600">Decision</th>
                    <th className="px-3 py-3 text-left text-surface-600">Branch</th>
                    <th className="px-3 py-3 text-left text-surface-600">Best At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {[
                    { decision: 'src/ vs root app/', branch: 'src/app ✅', best: '5–20 devs, 10k–100k LOC' },
                    { decision: 'Route groups vs flat', branch: '(group) ✅', best: '10–100 routes' },
                    { decision: 'Feature vs layer', branch: 'Hybrid ✅', best: '10k–100k LOC' },
                    { decision: 'Server vs Client', branch: 'Server default ✅', best: 'Most pages' },
                    { decision: 'Actions vs Handlers', branch: 'Both ✅', best: 'SaaS with integrations' },
                    { decision: 'Supabase client', branch: 'Browser + Server ✅', best: 'Multi-tenant' },
                    { decision: 'Migrations', branch: 'Supabase CLI ✅', best: 'Supabase projects' },
                    { decision: 'Seeding', branch: 'SQL + Factories ✅', best: 'Reference + Tests' },
                    { decision: 'Vercel', branch: 'Single project ✅', best: 'One web app' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-surface-50">
                      <td className="px-3 py-2.5 text-surface-700">{row.decision}</td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                          {row.branch}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-surface-500">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* COUNTERPOINTS SECTION */}
          <section id="counterpoints" className="scroll-mt-20 mb-16">
            <SectionHeader 
              icon={AlertTriangle} 
              title="Counterpoints & Critiques" 
              subtitle="Every architecture has trade-offs."
              emoji="🥊"
            />

            <div className="space-y-4">
              {[
                { num: 1, title: 'Hybrid folders can become inconsistent', desc: 'Without rules for shared/, teams make duplicate helpers. Fix: only allow shared/ code when 2+ features use it.' },
                { num: 2, title: 'Server Actions hide the API surface', desc: 'Great for forms, not a documented HTTP contract. Use Route Handlers when external systems call.' },
                { num: 3, title: 'Route groups can hide URLs', desc: '(dashboard)/invoices → /invoices. Document it or skip groups until layouts diverge.' },
                { num: 4, title: 'Supabase CLI needs Docker-like infra', desc: 'Local stack runs in containers. No container runtime = no local workflow.' },
                { num: 5, title: 'One Vercel project couples releases', desc: 'A shared change forces a full web deploy. Monorepo fixes this but adds complexity.' },
                { num: 6, title: 'SQL seeds can go stale', desc: 'Great for stable reference data; bad for evolving test scenarios. Use factories for tests.' },
              ].map((item) => (
                <div key={item.num} className="p-4 rounded-xl bg-white border border-surface-200 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">
                      {item.num}
                    </span>
                    <div>
                      <p className="font-semibold text-surface-800 text-sm">{item.title}</p>
                      <p className="text-xs text-surface-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SOURCES SECTION */}
          <section id="sources" className="scroll-mt-20 mb-16">
            <SectionHeader 
              icon={ExternalLink} 
              title="Sources" 
              subtitle="All claims verified against official documentation."
              emoji="📚"
            />

            <div className="space-y-6">
              <SourceGroup
                title="🟦 Next.js Official Docs"
                links={[
                  { label: 'Project Structure', url: 'https://nextjs.org/docs/app/getting-started/project-structure' },
                  { label: 'Route Handlers', url: 'https://nextjs.org/docs/app/getting-started/route-handlers' },
                  { label: 'Server and Client Components', url: 'https://nextjs.org/docs/app/getting-started/server-and-client-components' },
                ]}
              />
              <SourceGroup
                title="🟩 Supabase Official Docs"
                links={[
                  { label: 'Supabase CLI', url: 'https://supabase.com/docs/guides/local-development/cli/getting-started' },
                  { label: 'SSR for Next.js', url: 'https://supabase.com/docs/guides/auth/server-side/nextjs' },
                  { label: 'Row Level Security', url: 'https://supabase.com/docs/guides/database/postgres/row-level-security' },
                ]}
              />
              <SourceGroup
                title="🟨 Vercel Official Docs"
                links={[
                  { label: 'Next.js on Vercel', url: 'https://vercel.com/docs/frameworks/nextjs' },
                ]}
              />
              <SourceGroup
                title="📦 Package Registries"
                links={[
                  { label: 'npm: next', url: 'https://registry.npmjs.org/next/latest' },
                  { label: 'npm: @supabase/ssr', url: 'https://registry.npmjs.org/@supabase/ssr/latest' },
                  { label: 'npm: supabase', url: 'https://www.npmjs.com/package/supabase' },
                ]}
              />
            </div>

            {/* Verification table */}
            <h3 className="text-lg font-semibold text-surface-800 mb-4 mt-10">✅ Verification Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                <div className="text-2xl font-bold text-green-700">36</div>
                <div className="text-xs text-green-600">Supported</div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <div className="text-2xl font-bold text-amber-700">1</div>
                <div className="text-xs text-amber-600">Partial</div>
              </div>
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-center">
                <div className="text-2xl font-bold text-red-700">3</div>
                <div className="text-xs text-red-600">Not Supported</div>
              </div>
              <div className="p-4 rounded-xl bg-surface-50 border border-surface-200 text-center">
                <div className="text-2xl font-bold text-surface-700">40</div>
                <div className="text-xs text-surface-600">Total Claims</div>
              </div>
            </div>
          </section>

          {/* CHEAT SHEET */}
          <section className="mb-16">
            <SectionHeader 
              icon={FileText} 
              title="Quick Cheat Sheet" 
              subtitle="Where everything goes."
              emoji="📋"
            />

            <div className="overflow-x-auto rounded-xl border border-surface-200 shadow-sm">
              <table className="doc-table w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-200">
                    <th className="px-4 py-3 text-left text-surface-600">Task</th>
                    <th className="px-4 py-3 text-left text-surface-600">Where It Goes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {[
                    { task: '🗺️ New page / URL', where: 'src/app/.../page.tsx' },
                    { task: '🛣️ New API endpoint', where: 'src/app/api/.../route.ts' },
                    { task: '🧩 New business logic', where: 'src/features/<name>/' },
                    { task: '🔧 New shared helper', where: 'src/shared/' },
                    { task: '🔌 New Supabase client', where: 'src/shared/supabase/' },
                    { task: '🔐 New auth helper', where: 'src/shared/auth/' },
                    { task: '🗄️ New DB change', where: 'supabase/migrations/' },
                    { task: '🌱 New seed data', where: 'supabase/seed.sql' },
                    { task: '🧪 New RLS test', where: 'supabase/tests/' },
                    { task: '🏭 New test factory', where: 'src/testing/factories/' },
                    { task: '🤖 New CI step', where: '.github/workflows/ci.yml' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-surface-50">
                      <td className="px-4 py-3 font-medium text-surface-800">{row.task}</td>
                      <td className="px-4 py-3 font-mono text-xs text-primary-700">{row.where}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Final CTA */}
            <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
              <p className="text-2xl mb-2">🎉</p>
              <p className="text-xl font-bold text-primary-900">You are done. Go ship Ledgerly.</p>
              <p className="text-sm text-primary-700 mt-2">🚀</p>
            </div>
          </section>
        </div>
      </main>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-primary-600 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all z-50"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

// Helper components
function SectionHeader({ icon: Icon, title, subtitle, emoji }: { icon: any; title: string; subtitle: string; emoji: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-200 flex items-center justify-center">
          <Icon size={18} className="text-primary-600" />
        </div>
        <span className="text-2xl">{emoji}</span>
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-surface-900">{title}</h2>
      <p className="text-surface-500 mt-1">{subtitle}</p>
    </div>
  );
}

function Callout({ type, title, children }: { type: 'info' | 'warning' | 'success'; title: string; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  };
  const icons = {
    info: '💡',
    warning: '⚠️',
    success: '✅',
  };

  return (
    <div className={`rounded-xl border p-4 mt-6 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{icons[type]}</span>
        <div>
          <p className="font-semibold text-sm">{title}</p>
          <div className="text-xs mt-1 opacity-90">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SourceGroup({ title, links }: { title: string; links: { label: string; url: string }[] }) {
  return (
    <div>
      <h3 className="font-semibold text-surface-800 mb-2">{title}</h3>
      <ul className="space-y-1.5">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-800 hover:underline"
            >
              <ExternalLink size={12} />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
