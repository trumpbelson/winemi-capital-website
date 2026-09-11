import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Shield, BarChart3, Globe, BookOpen, Target,
  PieChart, ArrowRight, CheckCircle2, Layers, Zap,
  Brain, Wallet, LineChart as LineChartIcon, Activity,
  Lightbulb, Building2, Landmark, Compass
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPie, Pie, Cell
} from 'recharts';
import { BRAND } from '../config';
import WorldMap from '../components/WorldMap';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <IntroductionSection />
      <FoundationsSection />
      <ApproachSection />
      <InvestmentsSection />
      <AssetManagementSection />
      <WealthSection />
      <MarketsSection />
      <GlobalPerspectiveSection />
      <TradingResearchSection />
      <MentorshipSection />
      <EducationSection />
      <InsightsSection />
      <LeadershipSection />
      <AccraSection />
      <FinalCTA />
    </main>
  );
}

/* ============================================
   SECTION 01: HERO
   ============================================ */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/6464f21c-7209-4b7d-80f0-f7426b21a71a/_result.png"
          alt="Classical and modern financial architecture"
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.05)' }}
        />
        <div className="hero-overlay absolute inset-0" />
        {/* Additional dark overlay for text readability */}
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      {/* Decorative architectural lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/5 to-transparent" />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-[2000ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent/40" />
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-accent-light/80 font-medium">
              {BRAND.philosophy}
            </p>
            <div className="w-8 h-px bg-accent/40" />
          </div>
        </div>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-light leading-[0.85] mb-10">
          <span className="block text-ivory tracking-wide">CAPITAL.</span>
          <span className="block text-ivory/85 tracking-wide mt-1">DISCIPLINE.</span>
          <span className="block text-accent-light tracking-wide mt-1">GROWTH.</span>
        </h1>
        <div className="w-16 h-px bg-accent/30 mx-auto mb-8" />
        <p className="text-base sm:text-lg md:text-xl text-ivory/65 font-light max-w-2xl mx-auto mb-14 leading-relaxed">
          {BRAND.supporting}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="#approach"
            className="group px-8 py-4 text-[11px] tracking-[0.2em] font-medium bg-accent text-primary hover:bg-accent-light transition-all duration-300 rounded-sm flex items-center gap-3"
          >
            EXPLORE OUR APPROACH
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/login"
            className="px-8 py-4 text-[11px] tracking-[0.2em] font-medium border border-ivory/25 text-ivory/80 hover:border-accent/60 hover:text-accent-light transition-all duration-300 rounded-sm"
          >
            CLIENT / INVESTOR LOGIN
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[9px] tracking-[0.2em] uppercase text-ivory/40">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-ivory/30 to-transparent" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
}

/* ============================================
   SECTION 02: INSTITUTIONAL INTRODUCTION
   ============================================ */
function IntroductionSection() {
  return (
    <section className="py-28 lg:py-40 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-accent/40" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-accent/70">Who We Are</p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-light leading-[1.15] text-ivory">
              A Ghanaian financial platform built on the principles of intelligent capital allocation.
            </h2>
          </div>
          <div className="lg:pt-4">
            <p className="text-base text-ivory/65 leading-[1.8] mb-8">
              {BRAND.name} is rooted in Accra, Ghana — positioned at the intersection of African opportunity and global capital markets. 
              We focus on investment, asset management, research, trading education, financial education, and wealth creation.
            </p>
            <p className="text-base text-ivory/65 leading-[1.8] mb-10">
              Our approach combines rigorous research, disciplined risk management, and long-term thinking 
              to build sustainable wealth for our community.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-accent/60 whitespace-nowrap">{BRAND.positioning}</span>
            </div>
          </div>
        </div>

        {/* Key metrics / values strip */}
        <div className="mt-20 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 'Research', label: 'Driven' },
            { value: 'Discipline', label: 'Focused' },
            { value: 'Global', label: 'Perspective' },
            { value: 'Long-Term', label: 'Thinking' },
          ].map((item, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="font-serif text-2xl lg:text-3xl text-ivory/90 mb-1">{item.value}</p>
              <p className="text-xs tracking-[0.15em] uppercase text-ivory/40">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 03: ANCIENT FOUNDATIONS
   ============================================ */
function FoundationsSection() {
  return (
    <section id="philosophy" className="py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://image.qwenlm.ai/generated-images/1fdc73bc-c17e-4ead-802d-b2f5c04f4afd/_result.png"
          alt="Classical architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-accent/70 mb-6">Our Philosophy</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-ivory mb-8">
              Ancient Foundations.<br />
              <span className="text-accent-light">Modern Capital.</span><br />
              Future Growth.
            </h2>
            <p className="text-base text-ivory/70 leading-relaxed mb-6">
              Like the great financial institutions built on centuries of principle, we believe that lasting wealth 
              is constructed on a foundation of knowledge, discipline, and patience.
            </p>
            <p className="text-base text-ivory/70 leading-relaxed">
              The pillars of ancient commerce — trust, integrity, and long-term thinking — remain the cornerstones 
              of modern capital markets. We honor these foundations while embracing the tools and opportunities of today.
            </p>
          </div>
          <div className="space-y-8">
            {[
              { title: 'Ancient Foundations', desc: 'Timeless principles of trust, discipline, and integrity that have governed wealth creation for centuries.' },
              { title: 'Modern Capital', desc: 'Contemporary financial instruments, technology, and global market access applied with precision.' },
              { title: 'Future Growth', desc: 'Forward-looking strategies that position capital for sustainable, long-term appreciation.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-px bg-accent/30 self-stretch" />
                <div>
                  <h3 className="text-sm font-medium tracking-wide text-accent-light mb-2">{item.title}</h3>
                  <p className="text-sm text-ivory/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 04: OUR APPROACH
   ============================================ */
function ApproachSection() {
  const principles = [
    { icon: <BookOpen size={20} />, title: 'Research', desc: 'Deep fundamental and technical analysis informing every decision.' },
    { icon: <Shield size={20} />, title: 'Discipline', desc: 'Systematic processes that remove emotion from capital allocation.' },
    { icon: <Target size={20} />, title: 'Risk Management', desc: 'Protecting capital through measured position sizing and diversification.' },
    { icon: <Layers size={20} />, title: 'Diversification', desc: 'Spreading exposure across asset classes, geographies, and strategies.' },
    { icon: <PieChart size={20} />, title: 'Capital Allocation', desc: 'Strategic deployment of resources to maximize risk-adjusted returns.' },
    { icon: <Compass size={20} />, title: 'Long-Term Thinking', desc: 'Patience and perspective that transcend short-term market noise.' },
  ];

  return (
    <section id="approach" className="py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-accent/70 mb-4">Our Approach</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory mb-6">
            How We Think About Capital
          </h2>
          <p className="text-base text-ivory/60 max-w-2xl mx-auto">
            Every decision is guided by six core principles that define our institutional approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {principles.map((p, i) => (
            <div key={i} className="bg-primary p-8 lg:p-10 card-hover group">
              <div className="text-accent/60 mb-4 group-hover:text-accent-light transition-colors">{p.icon}</div>
              <h3 className="text-lg font-medium text-ivory mb-3">{p.title}</h3>
              <p className="text-sm text-ivory/60 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 05: INVESTMENTS
   ============================================ */
function InvestmentsSection() {
  const assetClasses = [
    { name: 'Equities', desc: 'Global equity markets and stock selection', status: 'Research & Education' },
    { name: 'Fixed Income', desc: 'Bonds, treasuries, and debt instruments', status: 'Research & Education' },
    { name: 'Foreign Exchange', desc: 'Currency markets and FX strategy', status: 'Research & Education' },
    { name: 'Commodities', desc: 'Precious metals, energy, and agriculture', status: 'Research & Education' },
    { name: 'Real Estate', desc: 'Property investment and development', status: 'Future Capability' },
    { name: 'Alternatives', desc: 'Hedge strategies and alternative investments', status: 'Future Capability' },
    { name: 'Private Markets', desc: 'Private equity and venture opportunities', status: 'Future Capability' },
    { name: 'Derivatives', desc: 'Options, futures, and structured products', status: 'Research & Education' },
    { name: 'Digital Assets', desc: 'Cryptocurrency and blockchain-based assets', status: 'Research & Education' },
  ];

  return (
    <section id="investments" className="py-24 lg:py-36 px-6 lg:px-12 bg-secondary/30">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-accent/70 mb-4">Investments</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory mb-6">
            Asset Classes & Opportunities
          </h2>
          <p className="text-base text-ivory/60 max-w-2xl mx-auto">
            Our research and education spans the full spectrum of global asset classes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assetClasses.map((asset, i) => (
            <div key={i} className="border border-white/5 p-6 lg:p-8 card-hover hover:border-accent/20 transition-all">
              <h3 className="text-lg font-medium text-ivory mb-2">{asset.name}</h3>
              <p className="text-sm text-ivory/60 mb-4">{asset.desc}</p>
              <span className={`text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-sm ${
                asset.status === 'Research & Education'
                  ? 'bg-accent/10 text-accent-light'
                  : 'bg-white/5 text-ivory/40'
              }`}>
                {asset.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 06: ASSET MANAGEMENT
   ============================================ */
function AssetManagementSection() {
  const allocationData = [
    { name: 'Equities', value: 40, color: '#b8860b' },
    { name: 'Fixed Income', value: 25, color: '#8b6914' },
    { name: 'Alternatives', value: 15, color: '#6b5210' },
    { name: 'Cash', value: 10, color: '#4a3a0c' },
    { name: 'Real Assets', value: 10, color: '#3a2e0a' },
  ];

  const principles = [
    'Portfolio construction aligned to objectives',
    'Risk profiling and capacity assessment',
    'Strategic and tactical asset allocation',
    'Diversification across uncorrelated assets',
    'Liquidity management and planning',
    'Capital preservation as foundation',
    'Growth-oriented positioning',
    'Continuous monitoring and rebalancing',
    'Compounding through disciplined reinvestment',
    'Risk-adjusted decision making',
  ];

  return (
    <section id="asset-management" className="py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-accent/70 mb-4">Asset Management</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory mb-6">
              Disciplined Portfolio Construction
            </h2>
            <p className="text-base text-ivory/70 leading-relaxed mb-8">
              Our asset management philosophy centers on building portfolios that balance growth objectives 
              with appropriate risk management. Every allocation decision is deliberate, researched, and monitored.
            </p>
            <div className="space-y-3">
              {principles.map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={14} className="text-accent/60 mt-1 flex-shrink-0" />
                  <span className="text-sm text-ivory/70">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="border border-white/5 p-8 rounded-sm">
              <p className="text-[10px] tracking-[0.2em] uppercase text-ivory/40 mb-6">Illustrative Allocation Model</p>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px' }}
                      itemStyle={{ color: '#f5f0eb' }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {allocationData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.color }} />
                    <span className="text-xs text-ivory/60">{d.name} ({d.value}%)</span>
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-ivory/30 mt-4 italic">
                ILLUSTRATIVE EXAMPLE — NOT ACTUAL CLIENT PERFORMANCE. For educational purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 07: WEALTH CREATION
   ============================================ */
function WealthSection() {
  const growthData = Array.from({ length: 20 }, (_, i) => ({
    year: `Year ${i + 1}`,
    value: Math.round(10000 * Math.pow(1.08, i)),
  }));

  return (
    <section id="wealth" className="py-24 lg:py-36 px-6 lg:px-12 bg-secondary/30">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent/70 mb-4">Wealth Creation</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory mb-6">
            The Power of Compounding
          </h2>
          <p className="text-base text-ivory/60 max-w-2xl mx-auto">
            Wealth is built through preservation, disciplined growth, and the patient application of time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {[
              { title: 'Preservation', desc: 'Protecting capital is the first priority of wealth creation.' },
              { title: 'Growth', desc: 'Strategic allocation to assets with long-term appreciation potential.' },
              { title: 'Compounding', desc: 'Reinvesting returns to accelerate wealth accumulation over time.' },
              { title: 'Diversification', desc: 'Reducing concentration risk across uncorrelated assets.' },
              { title: 'Financial Discipline', desc: 'Consistent saving, investing, and avoiding behavioral pitfalls.' },
              { title: 'Time Horizon', desc: 'Allowing sufficient time for compounding to work effectively.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 flex items-center justify-center border border-accent/20 text-accent-light text-xs font-medium flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-ivory mb-1">{item.title}</h3>
                  <p className="text-sm text-ivory/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-white/5 p-8 rounded-sm">
            <p className="text-[10px] tracking-[0.2em] uppercase text-ivory/40 mb-6">Illustrative Compounding Growth</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="wealthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b8860b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#b8860b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: 'rgba(245,240,235,0.4)', fontSize: 10 }} axisLine={false} />
                  <YAxis tick={{ fill: 'rgba(245,240,235,0.4)', fontSize: 10 }} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px' }}
                    itemStyle={{ color: '#f5f0eb' }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                  />
                  <Area type="monotone" dataKey="value" stroke="#b8860b" fill="url(#wealthGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-ivory/30 mt-4 italic">
              ILLUSTRATIVE EXAMPLE — NOT ACTUAL CLIENT PERFORMANCE. Hypothetical 8% annual return. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 08: GLOBAL MARKETS
   ============================================ */
function MarketsSection() {
  const marketCategories = [
    { name: 'Equities', icon: <TrendingUp size={18} /> },
    { name: 'Foreign Exchange', icon: <Globe size={18} /> },
    { name: 'Commodities', icon: <BarChart3 size={18} /> },
    { name: 'Indices', icon: <LineChartIcon size={18} /> },
    { name: 'Fixed Income', icon: <Activity size={18} /> },
    { name: 'Macro', icon: <Globe size={18} /> },
    { name: 'Digital Assets', icon: <Zap size={18} /> },
  ];

  return (
    <section id="markets" className="py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent/70 mb-4">Global Markets</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory mb-6">
            Connected to Global Capital Markets
          </h2>
          <p className="text-base text-ivory/60 max-w-2xl mx-auto">
            We research and educate across all major asset classes and global market categories.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {marketCategories.map((cat, i) => (
            <div key={i} className="border border-white/5 p-5 text-center card-hover hover:border-accent/20 transition-all">
              <div className="text-accent/60 mb-3 flex justify-center">{cat.icon}</div>
              <p className="text-sm text-ivory/80">{cat.name}</p>
            </div>
          ))}
        </div>

        <div className="border border-white/5 p-8 rounded-sm text-center">
          <Activity size={24} className="text-accent/40 mx-auto mb-3" />
          <p className="text-sm text-ivory/50">MARKET DATA CURRENTLY UNAVAILABLE</p>
          <p className="text-xs text-ivory/30 mt-2">Live market data integration coming soon.</p>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 09: GLOBAL PERSPECTIVE (WORLD MAP)
   ============================================ */
function GlobalPerspectiveSection() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 bg-secondary/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-accent/70 mb-4">Global Perspective</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory mb-6">
            Connected to Global Capital Markets
          </h2>
          <p className="text-base text-ivory/60 max-w-2xl mx-auto">
            From our foundation in Accra, we maintain perspective on the world's major financial centers.
          </p>
        </div>
        <WorldMap />
      </div>
    </section>
  );
}

/* ============================================
   SECTION 10: TRADING & RESEARCH
   ============================================ */
function TradingResearchSection() {
  const topics = [
    'Price Action', 'Market Structure', 'Support & Resistance', 'Supply & Demand',
    'Liquidity', 'Smart Money Concepts', 'Technical Analysis', 'Fundamental Analysis',
    'Macro Analysis', 'Risk Management', 'Position Sizing', 'Trading Psychology',
    'Trading Plans', 'Journaling', 'Probability & Expectancy',
  ];

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-accent/70 mb-4">Trading & Research</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory mb-6">
              Intellectual Approach to Markets
            </h2>
            <p className="text-base text-ivory/70 leading-relaxed mb-8">
              Our trading research combines technical precision with fundamental understanding. 
              We approach markets with intellectual rigor, probability thinking, and disciplined execution.
            </p>
            <p className="text-sm text-ivory/50 italic">
              This section is educational. Trading involves substantial risk of loss.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, i) => (
              <span key={i} className="px-3 py-2 text-xs text-ivory/70 border border-white/10 hover:border-accent/30 transition-colors">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 11: MENTORSHIP
   ============================================ */
function MentorshipSection() {
  const levels = [
    {
      level: 'BEGINNER',
      title: 'Foundations',
      topics: ['Market basics', 'Reading charts', 'Understanding risk', 'Trading terminology', 'Basic analysis'],
    },
    {
      level: 'INTERMEDIATE',
      title: 'Development',
      topics: ['Strategy development', 'Risk management systems', 'Market structure', 'Position sizing', 'Trading plans'],
    },
    {
      level: 'ADVANCED',
      title: 'Mastery',
      topics: ['Multi-timeframe analysis', 'Institutional concepts', 'Portfolio construction', 'Psychology mastery', 'Edge refinement'],
    },
  ];

  const pathway = ['FOUNDATIONS', 'MARKETS', 'ANALYSIS', 'RISK', 'EXECUTION', 'PORTFOLIO THINKING', 'DISCIPLINE'];

  return (
    <section id="mentorship" className="py-24 lg:py-36 px-6 lg:px-12 bg-secondary/30">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent/70 mb-4">Mentorship</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory mb-6">
            Advanced Financial Mentorship
          </h2>
          <p className="text-base text-ivory/60 max-w-2xl mx-auto">
            A structured learning pathway from foundations to mastery in financial markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {levels.map((level, i) => (
            <div key={i} className="border border-white/5 p-8 card-hover">
              <span className="text-[10px] tracking-[0.2em] uppercase text-accent/60 mb-2 block">{level.level}</span>
              <h3 className="text-xl font-serif text-ivory mb-4">{level.title}</h3>
              <ul className="space-y-2">
                {level.topics.map((topic, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-ivory/60">
                    <div className="w-1 h-1 rounded-full bg-accent/40" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Learning Pathway */}
        <div className="border border-white/5 p-8 lg:p-12 rounded-sm">
          <p className="text-[10px] tracking-[0.2em] uppercase text-ivory/40 mb-8 text-center">Learning Pathway</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {pathway.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="px-4 py-2 border border-accent/20 text-xs text-accent-light tracking-wide">
                  {step}
                </div>
                {i < pathway.length - 1 && <ArrowRight size={14} className="text-accent/30" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 12: EDUCATION
   ============================================ */
function EducationSection() {
  const categories = [
    { name: 'Financial Markets', icon: <BarChart3 size={20} /> },
    { name: 'Trading', icon: <TrendingUp size={20} /> },
    { name: 'Investment', icon: <Wallet size={20} /> },
    { name: 'Portfolio Management', icon: <PieChart size={20} /> },
    { name: 'Risk Management', icon: <Shield size={20} /> },
    { name: 'Artificial Intelligence', icon: <Brain size={20} /> },
    { name: 'Economics & Analytics', icon: <LineChartIcon size={20} /> },
    { name: 'Accounting & Business', icon: <Building2 size={20} /> },
    { name: 'Wealth Creation', icon: <Target size={20} /> },
    { name: 'FinTech', icon: <Zap size={20} /> },
    { name: 'Entrepreneurship', icon: <Lightbulb size={20} /> },
  ];

  return (
    <section id="education" className="py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent/70 mb-4">Education</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory mb-6">
            Financial Academy
          </h2>
          <p className="text-base text-ivory/60 max-w-2xl mx-auto">
            Comprehensive financial education spanning markets, trading, investment, technology, and business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="border border-white/5 p-6 card-hover hover:border-accent/20 transition-all group">
              <div className="flex items-center gap-4">
                <div className="text-accent/50 group-hover:text-accent-light transition-colors">{cat.icon}</div>
                <h3 className="text-sm font-medium text-ivory/90">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 13: INSIGHTS
   ============================================ */
function InsightsSection() {
  const categories = [
    'Market Commentary', 'Investment Research', 'Trading Education',
    'Macro', 'Wealth', 'Economics', 'Technology', 'Artificial Intelligence',
    'Accounting', 'Business',
  ];

  return (
    <section id="insights" className="py-24 lg:py-36 px-6 lg:px-12 bg-secondary/30">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent/70 mb-4">Insights</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory mb-6">
            Research & Commentary
          </h2>
          <p className="text-base text-ivory/60 max-w-2xl mx-auto">
            Editorial content spanning market analysis, investment research, and financial education.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat, i) => (
            <span key={i} className="px-5 py-3 text-xs tracking-wide text-ivory/70 border border-white/10 hover:border-accent/30 hover:text-accent-light transition-all cursor-pointer">
              {cat}
            </span>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-ivory/40">Insights platform coming soon. Follow us for updates.</p>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 14: LEADERSHIP
   ============================================ */
function LeadershipSection() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-accent/40" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-accent/70">Leadership</p>
            <div className="w-8 h-px bg-accent/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory mb-6">
            Guided by Vision
          </h2>
          <p className="text-base text-ivory/60 max-w-2xl mx-auto">
            Our leadership is committed to building a world-class financial institution rooted in Ghanaian values.
          </p>
        </div>
        <div className="max-w-lg mx-auto text-center border border-white/5 p-10 rounded-sm">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
            <Landmark size={28} className="text-accent/60" />
          </div>
          <h3 className="font-serif text-xl text-ivory mb-2">Founder & Leadership</h3>
          <p className="text-sm text-ivory/50 mb-4">Building {BRAND.name} from Accra to the global capital markets.</p>
          <p className="text-xs text-ivory/30 italic">
            Detailed leadership profiles and biographies will be published as the institution develops.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 15: ACCRA
   ============================================ */
function AccraSection() {
  return (
    <section id="accra" className="relative py-36 lg:py-52 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/ebc0d9e4-cf3c-4b64-9459-3b3a44ee36a9/_result.png"
          alt="Accra, Ghana skyline at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-primary/50" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-accent-light/40" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-accent-light/80">Our Foundation</p>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-ivory leading-[1.1] mb-8">
            From Accra<br />
            <span className="text-accent-light">to the Global</span><br />
            Capital Markets.
          </h2>
          <div className="w-12 h-px bg-accent/30 mb-8" />
          <p className="text-lg text-ivory/70 leading-relaxed mb-4">
            From the heart of Ghana's capital, we build bridges between African opportunity 
            and global capital markets.
          </p>
          <p className="text-base text-ivory/50 leading-relaxed">
            {BRAND.positioning}
          </p>
          
          {/* Location badge */}
          <div className="mt-10 inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-sm">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs tracking-wide text-ivory/60">ACCRA, GHANA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SECTION 16: FINAL CTA
   ============================================ */
function FinalCTA() {
  return (
    <section className="py-28 lg:py-40 px-6 lg:px-12 relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(184,134,11,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      
      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        <div className="section-divider mb-20" />
        
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-px bg-accent/30" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-accent/60">Begin</p>
          <div className="w-12 h-px bg-accent/30" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-ivory leading-[1.1] mb-8">
          Build with Discipline.<br />
          <span className="text-accent-light">Grow with Purpose.</span>
        </h2>
        
        <p className="text-base text-ivory/55 mb-14 max-w-lg mx-auto leading-relaxed">
          Join us in building wealth through intelligent capital allocation.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 text-[11px] tracking-[0.2em] font-medium bg-accent text-primary hover:bg-accent-light transition-all duration-300 rounded-sm flex items-center gap-3"
          >
            CONTACT {BRAND.name}
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/login"
            className="px-8 py-4 text-[11px] tracking-[0.2em] font-medium border border-ivory/25 text-ivory/80 hover:border-accent/60 hover:text-accent-light transition-all duration-300 rounded-sm"
          >
            CLIENT / INVESTOR LOGIN
          </Link>
        </div>
        
        <div className="section-divider mt-20" />
        
        {/* Brand statement */}
        <div className="mt-12">
          <p className="font-serif text-lg text-ivory/30 italic">
            {BRAND.philosophy}
          </p>
        </div>
      </div>
    </section>
  );
}
