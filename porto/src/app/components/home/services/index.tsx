// - services/languages section showing tech stack with official icons - \

// - language definitions with devicon CDN urls - \
const languages = [
  {
    name  : "TypeScript",
    color : "#3178C6",
    icon  : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name  : "JavaScript",
    color : "#F7DF1E",
    icon  : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name  : "Java",
    color : "#ED8B00",
    icon  : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name  : "Python",
    color : "#3776AB",
    icon  : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name  : "Luau",
    color : "#00A2FF",
    icon  : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg",
  },
];

const Services = () => {
  return (
    <section>
      <div className="container">
        <div className="border-x border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-7 py-8 sm:py-12">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">
              Languages I use
            </p>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border bg-card hover:bg-primary/5 transition-colors duration-200"
                >
                  {lang.icon ? (
                    <img
                      src={lang.icon}
                      alt={lang.name}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  ) : (
                    <span
                      className="w-5 h-5 rounded-sm flex items-center justify-center text-[9px] font-black text-white"
                      style={{ backgroundColor: lang.color }}
                    >
                      L
                    </span>
                  )}
                  <span className="text-sm font-medium">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
