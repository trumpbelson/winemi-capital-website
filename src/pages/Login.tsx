import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../config';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';

interface LoginProps {
  mode?: 'login' | 'register';
}

export default function Login({ mode = 'login' }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-8">
            <span className="font-serif text-2xl font-semibold text-ivory">{BRAND.name}</span>
          </Link>
          <h1 className="font-serif text-2xl lg:text-3xl text-ivory mb-2">
            {mode === 'login' ? 'Client Portal' : 'Create Account'}
          </h1>
          <p className="text-sm text-ivory/50">
            {mode === 'login'
              ? 'Access your investment dashboard'
              : 'Begin your journey with us'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs tracking-[0.1em] uppercase text-ivory/40 mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-secondary/50 border border-white/10 px-4 py-3 pl-11 text-sm text-ivory placeholder:text-ivory/30 focus:border-accent/50 focus:outline-none transition-colors rounded-sm"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs tracking-[0.1em] uppercase text-ivory/40 mb-2">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-secondary/50 border border-white/10 px-4 py-3 pl-11 text-sm text-ivory placeholder:text-ivory/30 focus:border-accent/50 focus:outline-none transition-colors rounded-sm"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-[0.1em] uppercase text-ivory/40 mb-2">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/30" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-secondary/50 border border-white/10 px-4 py-3 pl-11 pr-11 text-sm text-ivory placeholder:text-ivory/30 focus:border-accent/50 focus:outline-none transition-colors rounded-sm"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/30 hover:text-ivory/60 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-white/20 bg-secondary rounded-sm" />
                <span className="text-xs text-ivory/50">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-xs text-accent/70 hover:text-accent-light transition-colors">
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-accent text-primary text-sm font-medium tracking-wide hover:bg-accent-light transition-all duration-300 rounded-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            ) : (
              <>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Switch mode */}
        <div className="mt-8 text-center">
          <p className="text-sm text-ivory/50">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <Link
              to={mode === 'login' ? '/register' : '/login'}
              className="text-accent/70 hover:text-accent-light transition-colors"
            >
              {mode === 'login' ? 'Create account' : 'Sign in'}
            </Link>
          </p>
        </div>

        {/* Security note */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[10px] text-ivory/30 text-center leading-relaxed">
            Your connection is secured with encryption. {BRAND.name} will never ask for your password via email or phone.
          </p>
        </div>
      </div>
    </section>
  );
}
