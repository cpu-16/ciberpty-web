// App entry — wires together components, theme, language, tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "lang": "es"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const lang = tweaks.lang === 'en' ? 'en' : 'es';
  const theme = tweaks.theme === 'light' ? 'light' : 'dark';

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('lang', lang);
    document.title = lang === 'es'
      ? 'CiberPTY · Ciberseguridad & Automatización'
      : 'CiberPTY · Cybersecurity & Automation';
  }, [theme, lang]);

  React.useEffect(() => {
    window.initMatrixRain && window.initMatrixRain();
    window.initCrosshair && window.initCrosshair();
  }, []);

  // Re-init reveal on every content change
  React.useEffect(() => {
    setTimeout(() => window.initRevealOnScroll && window.initRevealOnScroll(), 60);
  }, [lang]);

  const setLang = (l) => setTweak('lang', l);
  const setTheme = (t) => setTweak('theme', t);

  return (
    <>
      <Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>
      <main>
        <Hero lang={lang}/>
        <AboutSection lang={lang}/>
        <ServicesSection lang={lang}/>
        <OpsSection lang={lang}/>
        <StackSection lang={lang}/>
        <MethodSection lang={lang}/>
        <InsightsSection lang={lang}/>
        <ContactSection lang={lang}/>
      </main>
      <Footer lang={lang}/>
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Apariencia">
          <window.TweakRadio
            label="Tema"
            value={theme}
            onChange={(v) => setTheme(v)}
            options={['dark', 'light']}
          />
          <window.TweakRadio
            label="Idioma"
            value={lang}
            onChange={(v) => setLang(v)}
            options={['es', 'en']}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
