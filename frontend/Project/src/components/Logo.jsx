import { BookOpen, Check } from 'lucide-react';

export default function Logo({ size = 'md', withText = true, dark = false }) {
  const dims = { sm: 28, md: 34, lg: 44 }[size];
  const textSize = { sm: 'text-base', md: 'text-lg', lg: 'text-2xl' }[size];

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div
        className="relative grid place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-md shrink-0"
        style={{ width: dims, height: dims }}
      >
        <BookOpen size={dims * 0.56} className="text-white" strokeWidth={2.2} />
        <div className="absolute -bottom-1 -right-1 grid place-items-center rounded-full bg-teal-accent ring-2 ring-white dark:ring-ink-900" style={{ width: dims * 0.44, height: dims * 0.44 }}>
          <Check size={dims * 0.28} className="text-white" strokeWidth={3} />
        </div>
      </div>
      {withText && (
        <span className={`font-display font-extrabold ${textSize} tracking-tight ${dark ? 'text-white' : 'text-ink-900'}`}>
          Study<span className={dark ? 'text-teal-300' : 'text-brand-500'}>WithMe</span>
        </span>
      )}
    </div>
  );
}

