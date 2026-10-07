import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, ChevronDown, Menu, X, Download, Send, Code2, Database, Wrench, GraduationCap, Briefcase, Zap, Users, Brain, BookOpen, Clock, Star } from "lucide-react";

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Section wrapper with fade-in ─── */
function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
}

/* ─── Section heading ─── */
function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-14 text-center">
      <span className="inline-block font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">{label}</span>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  );
}

/* ─── Tech badge ─── */
function TechBadge({ name, icon }: { name: string; icon?: string }) {
  return (
    <div className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-default">
      {icon && <span className="text-base">{icon}</span>}
      <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-200 font-mono">{name}</span>
    </div>
  );
}

/* ─── Skill card ─── */
function SkillCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="group p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
      <div className="mb-3 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-200">
        {icon}
      </div>
      <p className="text-sm font-medium text-foreground/90">{title}</p>
    </div>
  );
}

/* ─── Animated grid background ─── */
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(133,227,215,1) 1px, transparent 1px), linear-gradient(90deg, rgba(133,227,215,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-accent/4 blur-[100px]" />
    </div>
  );
}

/* ─── Code avatar illustration ─── */
function CodeAvatar() {
  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80 flex-shrink-0">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_20s_linear_infinite]">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div
            key={deg}
            className="absolute w-2.5 h-2.5 rounded-full bg-accent/60"
            style={{
              top: `calc(50% - 5px + ${Math.sin((deg * Math.PI) / 180) * 140}px)`,
              left: `calc(50% - 5px + ${Math.cos((deg * Math.PI) / 180) * 140}px)`,
            }}
          />
        ))}
      </div>
      {/* Inner ring */}
      <div className="absolute inset-8 rounded-full border border-secondary/30 animate-[spin_12s_linear_infinite_reverse]">
        {[45, 135, 225, 315].map((deg) => (
          <div
            key={deg}
            className="absolute w-2 h-2 rounded-full bg-primary/70"
            style={{
              top: `calc(50% - 4px + ${Math.sin((deg * Math.PI) / 180) * 100}px)`,
              left: `calc(50% - 4px + ${Math.cos((deg * Math.PI) / 180) * 100}px)`,
            }}
          />
        ))}
      </div>
      {/* Center */}
      <div className="absolute inset-[72px] rounded-full bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 backdrop-blur-sm flex items-center justify-center">
        <Code2 className="w-14 h-14 text-primary" strokeWidth={1.2} />
      </div>
    </div>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  const links = ["Sobre mí", "Tecnologías", "Proyecto", "Formación", "Habilidades", "Contacto"];
  const scroll = (id: string) => {
    document.getElementById(id.toLowerCase().replace(" ", "-").replace("ó", "o").replace("é", "e").replace("ó", "o").replace("á", "a").replace("ú", "u").replace("í", "i"))?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display font-bold text-lg text-foreground hover:text-primary transition-colors"
        >
          FS<span className="text-accent">.</span>
        </button>
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scroll(l)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              {l}
            </button>
          ))}
        </div>
        <a
          href="#contacto"
          onClick={(e) => { e.preventDefault(); scroll("contacto"); }}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/20 transition-all duration-200"
        >
          Contratar
        </a>
        {/* Mobile menu button */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <button key={l} onClick={() => scroll(l)} className="text-left text-muted-foreground hover:text-primary transition-colors font-medium py-1">
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <div id="hero" className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      <GridBackground />
      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-20">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-accent tracking-wider">Disponible para trabajar</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05] mb-4">
              Facundo<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">Scardaoni</span>
            </h1>
            <p className="font-mono text-secondary text-base md:text-lg mb-6 tracking-wide">
              &lt; Estudiante Técnico en Computación /&gt;
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
              Estudiante de sexto año de Escuela Técnica con orientación en Computación. Apasionado por el desarrollo de software, bases de datos y la creación de soluciones tecnológicas. Actualmente busco mi primera experiencia profesional en el sector IT.
            </p>
            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              <button
                onClick={() => document.getElementById("proyecto")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                <Star className="w-4 h-4" /> Ver proyectos
              </button>
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card/60 text-foreground font-semibold text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <Download className="w-4 h-4" /> Descargar CV
              </a>
              <button
                onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-secondary/40 bg-secondary/10 text-secondary font-semibold text-sm hover:bg-secondary/20 transition-all duration-300"
              >
                <Mail className="w-4 h-4" /> Contactar
              </button>
            </div>
            {/* Quick info */}
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Argentina</span>
              <a href="mailto:facundoscardaoni@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" /> facundoscardaoni@gmail.com
              </a>
              <a href="tel:+5491134201460" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" /> 11 3420 1460
              </a>
            </div>
            {/* Social links */}
            <div className="flex gap-3 justify-center lg:justify-start">
              <a href="https://github.com/FacuScardaoni" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl border border-border bg-card/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200">
                <Github className="w-4 h-4" />
              </a>
              <a href="www.linkedin.com/in/facundo-scardaoni-b31942413" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl border border-border bg-card/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="mailto:facundoscardaoni@gmail.com" className="w-10 h-10 rounded-xl border border-border bg-card/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          {/* Avatar */}
          <div className="flex-shrink-0 flex items-center justify-center lg:pt-4">
            <CodeAvatar />
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground animate-bounce">
        <span className="font-mono text-xs">scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}

/* ─── About ─── */
function About() {
  return (
    <Section id="sobre-mi" className="py-24 max-w-6xl mx-auto px-6">
      <SectionHeading label="01 / about" title="Sobre mí" />
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <p className="text-foreground/85 text-base leading-relaxed">
            Soy estudiante de sexto año de la{" "}
            <span className="text-primary font-semibold">Escuela Técnica N°35 "Ing. Eduardo Latzina"</span>,
            especializado en Computación. Durante mi formación adquirí conocimientos en programación, bases de datos y análisis de sistemas mediante proyectos académicos y formación técnica.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            Me interesa especialmente el desarrollo de software y continuar aprendiendo nuevas tecnologías mientras construyo experiencia profesional en el sector IT.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {["Java", "Python", "SQL", "OOP", "Git"].map((t) => (
              <span key={t} className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold">
                {t}
              </span>
            ))}
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "6°", label: "Año de formación técnica" },
            { value: "B2", label: "Nivel de inglés certificado" },
            { value: "2021", label: "Inicio de estudios técnicos" },
            { value: "100%", label: "Motivación para crecer" },
          ].map(({ value, label }) => (
            <div key={label} className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
              <p className="font-display text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent mb-1">{value}</p>
              <p className="text-xs text-muted-foreground leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Technologies ─── */
function Technologies() {
  const categories = [
    {
      icon: <Code2 className="w-5 h-5" />,
      title: "Lenguajes",
      items: [
        { name: "Java", icon: "☕" },
        { name: "SQL", icon: "🗄️" },
        { name: "HTML", icon: "🌐" },
        { name: "CSS", icon: "🎨" },
        { name: "JavaScript", icon: "⚡" },
      ],
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "Bases de Datos",
      items: [
        { name: "MySQL", icon: "🐬" },
        { name: "SQL Server", icon: "🔷" },
      ],
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: "Herramientas",
      items: [
        { name: "Git", icon: "🌿" },
        { name: "GitHub", icon: "🐙" },
        { name: "VS Code", icon: "💙" },
        { name: "Figma", icon: "✏️" },
      ],
    },
  ];
  return (
    <Section id="tecnologias" className="py-24 bg-muted/20 border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label="02 / stack" title="Tecnologías" />
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map(({ icon, title, items }) => (
            <div key={title} className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {icon}
                </div>
                <h3 className="font-display font-bold text-foreground">{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <TechBadge key={item.name} name={item.name} icon={item.icon} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Featured project ─── */
function FeaturedProject() {
  return (
    <Section id="proyecto" className="py-24 max-w-6xl mx-auto px-6">
      <SectionHeading label="03 / work" title="Proyecto Destacado" />
      <div className="relative group rounded-3xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden hover:border-primary/40 transition-all duration-500">
        {/* Glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="grid md:grid-cols-2 gap-0">
          {/* Visual */}
          <div className="relative bg-gradient-to-br from-primary/10 to-accent/5 p-10 flex items-center justify-center min-h-[300px] border-b md:border-b-0 md:border-r border-border">
            <div className="relative">
              {/* Game window mockup */}
              <div className="w-56 h-44 rounded-xl border border-primary/30 bg-muted/60 backdrop-blur overflow-hidden shadow-2xl shadow-black/40">
                <div className="h-7 bg-card/80 flex items-center gap-1.5 px-3 border-b border-border">
                  {["bg-red-500/70", "bg-yellow-500/70", "bg-green-500/70"].map((c) => (
                    <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                  ))}
                  <span className="font-mono text-xs text-muted-foreground ml-2">Souls 2D</span>
                </div>
                <div className="p-3 font-mono text-xs text-muted-foreground space-y-1">
                  <p className="text-green-400/80">{"// Player spawned"}</p>
                  <p><span className="text-primary">player</span>.hp = <span className="text-accent">100</span>;</p>
                  <p><span className="text-primary">enemy</span>.ai.<span className="text-secondary">attack</span>();</p>
                  <p className="text-yellow-400/80">{"// Combat loop active"}</p>
                  <p><span className="text-primary">score</span> += <span className="text-accent">250</span>;</p>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
          {/* Info */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-semibold">Proyecto Académico</span>
              <span className="px-3 py-1 rounded-full bg-card border border-border text-muted-foreground text-xs font-mono">Java</span>
            </div>
            <h3 className="font-display text-3xl font-extrabold text-foreground mb-4">Souls 2D</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Videojuego 2D desarrollado en Java con mecánicas de combate, movimiento y sistema de enemigos. Proyecto que aplica principios de arquitectura modular y programación orientada a objetos.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                "Implementación de movimiento y combate 2D",
                "Sistema de enemigos con lógica de IA básica",
                "Programación Orientada a Objetos",
                "Uso de estructuras de datos complejas",
                "Arquitectura modular y escalable",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Java", "Swing", "OOP", "Data Structures"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg bg-muted/60 border border-border text-muted-foreground text-xs font-mono">
                  {t}
                </span>
              ))}
            </div>
            <a
              href="https://github.com/FacuScardaoni"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm w-fit hover:bg-accent hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <Github className="w-4 h-4" /> Ver repositorio <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Education timeline ─── */
function Education() {
  const items = [
    {
      year: "2021 — Actualidad",
      institution: "Escuela Técnica N°35",
      subtitle: '"Ing. Eduardo Latzina"',
      degree: "Técnico en Computación",
      icon: <GraduationCap className="w-5 h-5" />,
      current: true,
    },
    {
      year: "2018 — 2023",
      institution: "CECIE",
      subtitle: "Centro de Estudios",
      degree: "Inglés — Nivel B2",
      icon: <BookOpen className="w-5 h-5" />,
      current: false,
    },
  ];
  return (
    <Section id="formacion" className="py-24 bg-muted/20 border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label="04 / education" title="Formación Académica" />
        <div className="relative max-w-2xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/30 to-transparent" />
          <div className="space-y-8">
            {items.map(({ year, institution, subtitle, degree, icon, current }) => (
              <div key={institution} className="relative flex gap-6 group">
                {/* Dot */}
                <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${current ? "border-primary bg-primary/10 text-primary" : "border-secondary/50 bg-secondary/10 text-secondary group-hover:border-primary group-hover:text-primary"}`}>
                  {icon}
                </div>
                {/* Card */}
                <div className={`flex-1 p-6 rounded-2xl border bg-card/60 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30 ${current ? "border-primary/30" : "border-border"}`}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-bold text-foreground text-lg">{institution}</h3>
                        {current && (
                          <span className="px-2 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono">En curso</span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-xs mb-2">{subtitle}</p>
                      <p className="text-primary font-semibold text-sm">{degree}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {year}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Skills ─── */
function Skills() {
  const skills = [
    { icon: <Brain className="w-5 h-5" />, title: "Resolución de problemas" },
    { icon: <Users className="w-5 h-5" />, title: "Trabajo en equipo" },
    { icon: <Zap className="w-5 h-5" />, title: "Pensamiento lógico" },
    { icon: <BookOpen className="w-5 h-5" />, title: "Aprendizaje rápido" },
    { icon: <Briefcase className="w-5 h-5" />, title: "Comunicación efectiva" },
    { icon: <Star className="w-5 h-5" />, title: "Organización y responsabilidad" },
  ];
  return (
    <Section id="habilidades" className="py-24 max-w-6xl mx-auto px-6">
      <SectionHeading label="05 / skills" title="Habilidades" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((s) => (
          <SkillCard key={s.title} icon={s.icon} title={s.title} />
        ))}
      </div>
    </Section>
  );
}

// ── EmailJS credentials ──────────────────────────────────────────────────────
// 1. Crear cuenta en https://www.emailjs.com (gratis)
// 2. Add Email Service → conectar Gmail → copiar Service ID
// 3. Email Templates → crear plantilla con variables {{from_name}}, {{from_email}}, {{message}} → copiar Template ID
// 4. Account → API Keys → copiar Public Key
// Reemplazar los tres valores de abajo con los tuyos:
const EMAILJS_SERVICE_ID  = "service_u3zqjbl";
const EMAILJS_TEMPLATE_ID = "template_hnt4qhq";
const EMAILJS_PUBLIC_KEY  = "Usaa5O4UqO8qfl3oN";

/* ─── Contact ─── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: unknown) {
      console.error("EmailJS error:", err);
      const msg = err && typeof err === "object" && "text" in err
        ? (err as { text: string }).text
        : String(err);
      setErrorMsg(msg);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };
  return (
    <Section id="contacto" className="py-24 bg-muted/20 border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading label="06 / contact" title="Trabajemos juntos" />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="space-y-6">
            <p className="text-muted-foreground text-base leading-relaxed">
              Actualmente me encuentro buscando mi primera experiencia profesional en tecnología. Estoy abierto a oportunidades de{" "}
              <span className="text-primary font-semibold">pasantías</span>,{" "}
              <span className="text-primary font-semibold">trainee</span> y{" "}
              <span className="text-primary font-semibold">posiciones junior</span>.
            </p>
            <div className="space-y-4">
              {[
                { icon: <Mail className="w-4 h-4" />, label: "Email", value: "facundoscardaoni@gmail.com", href: "mailto:facundoscardaoni@gmail.com" },
                { icon: <Phone className="w-4 h-4" />, label: "Teléfono", value: "11 3420 1460", href: "tel:+5491134201460" },
                { icon: <MapPin className="w-4 h-4" />, label: "Ubicación", value: "Argentina", href: null },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/60 hover:border-primary/30 transition-all duration-200">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Social */}
            <div className="flex gap-3">
              <a href="https://github.com/FacuScardaoni" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200 text-sm font-medium">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/facundo-scardaoni-b31942413" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200 text-sm font-medium">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 p-7 rounded-2xl border border-border bg-card/60 backdrop-blur-sm">
            {[
              { id: "name", label: "Nombre", type: "text", placeholder: "Tu nombre completo" },
              { id: "email", label: "Email", type: "email", placeholder: "tu@email.com" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-xs font-semibold text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  required
                  placeholder={placeholder}
                  value={form[id as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/40 text-foreground placeholder:text-muted-foreground/50 text-sm outline-none focus:border-primary/60 focus:bg-primary/5 transition-all duration-200"
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-muted-foreground mb-2 font-mono uppercase tracking-wider">
                Mensaje
              </label>
              <textarea
                id="message"
                required
                rows={4}
                placeholder="Cuéntame sobre la oportunidad..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted/40 text-foreground placeholder:text-muted-foreground/50 text-sm outline-none focus:border-primary/60 focus:bg-primary/5 transition-all duration-200 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" && <><span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" /> Enviando...</>}
              {status === "sent"    && <><span className="w-2 h-2 rounded-full bg-primary-foreground" /> ¡Mensaje enviado!</>}
              {status === "error"   && <><span className="w-2 h-2 rounded-full bg-red-400" /> {errorMsg || "Error al enviar."}</>}
              {status === "idle"    && <><Send className="w-4 h-4" /> Enviar mensaje</>}
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-10 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="font-display font-bold text-foreground">Facundo Scardaoni</p>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">Estudiante Técnico en Computación</p>
        </div>
        <div className="flex gap-3">
          {[
            { href: "https://github.com/FacuScardaoni", icon: <Github className="w-4 h-4" />, label: "GitHub" },
            { href: "https://www.linkedin.com/in/facundo-scardaoni-b31942413/", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
            { href: "mailto:facundoscardaoni@gmail.com", icon: <Mail className="w-4 h-4" />, label: "Email" },
          ].map(({ href, icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {icon} {label}
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground font-mono">© 2026 Facundo Scardaoni</p>
      </div>
    </footer>
  );
}

/* ─── Root ─── */
export default function App() {
  return (
    <div className="bg-background text-foreground" style={{ fontFamily: "'Inter', 'Manrope', sans-serif" }}>
      <style>{`
        .font-display { font-family: 'Manrope', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(133,227,215,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(133,227,215,0.4); }
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Technologies />
        <FeaturedProject />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
