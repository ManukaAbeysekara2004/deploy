import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import { Spinner } from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { login } from '../api/authApi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  function validate() {
    const next = {};
    if (!email.trim()) next.email = 'Email is required.';
    if (!password) next.password = 'Password is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { user } = await login({ email: email.trim(), password });
      loginUser(user);
      toast.success(`Welcome back, ${user.username}!`);
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.friendlyMessage || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-12 bg-ink-50 dark:bg-ink-50 selection:bg-brand-500 selection:text-white transition-colors duration-200">
      {/* Left Branding Side (5 cols) */}
      <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-950 text-white p-12 shadow-2xl">
        {/* Background glow & mesh details */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-accent/20 rounded-full blur-3xl pointer-events-none" />
        
        {/* Header Logo */}
        <div className="relative z-10">
          <Logo dark size="lg" />
        </div>

        {/* Feature showcase / Quote */}
        <div className="relative z-10 my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-teal-300 mb-6 shadow-sm">
            <Sparkles size={14} className="animate-pulse" /> Student Productivity Hub
          </div>

          <blockquote className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm">
            "Small progress every day adds up to big results."
          </blockquote>

          <p className="mt-4 text-base text-brand-100/90 leading-relaxed max-w-md font-medium">
            Pick up right where you left off — your assignments, deadlines, and study streaks are waiting for you.
          </p>

          {/* Feature highlights */}
          <div className="mt-8 space-y-3">
            {[
              'Track coursework and assignment deadlines',
              'Real-time task completion analytics',
              'Focus timer & study goal reminders',
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-white/90 font-medium">
                <CheckCircle2 size={18} className="text-teal-300 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Tagline */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between">
          <p className="text-xs font-semibold text-brand-200 tracking-wide uppercase">
            Plan Better • Study Smarter • Achieve More
          </p>
        </div>
      </div>

      {/* Right Form Side (7 cols) */}
      <div className="lg:col-span-7 relative flex flex-col justify-center items-center px-6 sm:px-12 py-12">
        <ThemeToggle className="absolute top-6 right-6 w-10 h-10 shadow-sm border border-ink-200 dark:border-ink-700 rounded-full" />
        
        <div className="lg:hidden mb-8 text-center">
          <Link to="/" className="inline-block">
            <Logo size="lg" />
          </Link>
        </div>

        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-surface/90 dark:bg-surface/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-ink-200/80 dark:border-ink-700/80 shadow-xl shadow-brand-500/5 animate-fade-in-up">
            <div className="text-center sm:text-left mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-3">
                Welcome Back
              </span>
              <h2 className="font-display text-3xl font-extrabold text-ink-900 dark:text-ink-900 tracking-tight">
                Log in to StudyWithMe
              </h2>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-600 font-medium">
                Enter your credentials below to access your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-ink-700 dark:text-ink-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                    placeholder="you@gmail.com"
                    className={`w-full rounded-xl border bg-surface pl-10 pr-4 py-3.5 text-base text-ink-900 dark:text-ink-900 placeholder:text-ink-400 outline-none transition-all duration-200 focus:ring-2 ${
                      errors.email 
                        ? 'border-rose-accent focus:ring-rose-accent/20' 
                        : 'border-ink-300 dark:border-ink-600 focus:border-brand-500 focus:ring-brand-500/20'
                    }`}
                  />
                </div>
                {errors.email && <p className="mt-2 text-xs font-bold text-rose-accent">{errors.email}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-xs font-bold text-ink-700 dark:text-ink-700 uppercase tracking-wider">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                    placeholder="••••••••"
                    className={`w-full rounded-xl border bg-surface pl-10 pr-11 py-3.5 text-base text-ink-900 dark:text-ink-900 placeholder:text-ink-400 outline-none transition-all duration-200 focus:ring-2 ${
                      errors.password 
                        ? 'border-rose-accent focus:ring-rose-accent/20' 
                        : 'border-ink-300 dark:border-ink-600 focus:border-brand-500 focus:ring-brand-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-xs font-bold text-rose-accent">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white font-bold py-3.5 px-6 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/35 active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-base mt-2"
              >
                {loading ? (
                  <>
                    <Spinner size={18} />
                    <span>Signing you in...</span>
                  </>
                ) : (
                  <>
                    <span>Log In</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-ink-200/60 dark:border-ink-700/60 text-center">
              <p className="text-sm font-medium text-ink-600 dark:text-ink-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors underline-offset-4 hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

