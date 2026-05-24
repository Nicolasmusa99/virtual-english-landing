// Shared hooks for Virtual English landing
const { useEffect, useRef, useState, useCallback } = React;

// IntersectionObserver-based reveal hook
function useReveal(options = {}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setSeen(true);
          el.classList.add('in');
          io.disconnect();
        }
      });
    }, { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return ref;
}

// Reveal child wrapper with stagger
function Reveal({ children, delay = 0, as: As = 'div', className = '', style }) {
  const ref = useReveal();
  return (
    <As
      ref={ref}
      className={'reveal ' + className}
      style={{ transitionDelay: delay + 'ms', ...(style || {}) }}
    >
      {children}
    </As>
  );
}

// Count-up hook: starts when element enters viewport
function useCountUp(target, { duration = 1800, decimals = 0, suffix = '' } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(target * eased);
            if (t < 1) requestAnimationFrame(tick);
            else setValue(target);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  const formatted = (() => {
    if (decimals > 0) return value.toFixed(decimals);
    const n = Math.round(value);
    // Group thousands with dot (es-AR style) for 2400+
    if (target >= 1000) return n.toLocaleString('es-AR');
    return String(n);
  })();
  return [ref, formatted + suffix];
}

// Scroll position hook
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

// Inline SVG icons
const Icon = {
  Check: (p) => (
    <svg viewBox="0 0 16 16" width={p.size || 14} height={p.size || 14} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3.5 8.5 6.8 11.6 12.5 5.4"/></svg>
  ),
  Play: (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 22} height={p.size || 22} fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
  ),
  WhatsApp: (p) => (
    <svg viewBox="0 0 32 32" width={p.size || 28} height={p.size || 28} fill="currentColor"><path d="M19.11 17.18c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.41.12-.55.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.13-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.46l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.83.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.65.21 1.25.18 1.71.11.52-.08 1.6-.65 1.83-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.31zM16.04 4C9.96 4 5 8.96 5 15.04c0 2.13.6 4.21 1.74 6.03L5 28l7.13-1.87a11 11 0 0 0 3.91.72h.01c6.08 0 11.04-4.96 11.04-11.04 0-2.95-1.15-5.72-3.23-7.8A11 11 0 0 0 16.04 4zm0 20.13h-.01c-1.69 0-3.34-.45-4.78-1.3l-.34-.2-3.55.93.95-3.45-.22-.36a9.18 9.18 0 0 1-1.42-4.92c0-5.07 4.13-9.21 9.21-9.21 2.46 0 4.77.96 6.51 2.7a9.16 9.16 0 0 1 2.69 6.51c0 5.08-4.14 9.21-9.04 9.21z"/></svg>
  ),
  Arrow: (p) => (
    <svg viewBox="0 0 16 16" width={p.size || 14} height={p.size || 14} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="8" x2="13" y2="8"/><polyline points="9 4 13 8 9 12"/></svg>
  ),
  Mail: (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
  ),
};

window.useReveal = useReveal;
window.Reveal = Reveal;
window.useCountUp = useCountUp;
window.useScrollY = useScrollY;
window.Icon = Icon;
