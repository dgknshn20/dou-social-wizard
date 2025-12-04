// Navbar içindeki tab listende Wizard için özel stil verebilirsin
const Navbar = ({ activePage, setActivePage }: NavbarProps) => {
  const tabs: { id: PageTab; label: string }[] = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'about', label: 'Hakkında' },
    { id: 'wizard', label: 'AI Paket Önerici' },
    { id: 'contact', label: 'İletişim' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
             <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
               Dou<span className="text-[#800000]">Social</span>
             </span>
          </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 rounded-full bg-neutral-900/70 p-1">
          {tabs.map((tab) => {
            const isActive = activePage === tab.id;
            const isWizard = tab.id === 'wizard';

            return (
              <button
                key={tab.id}
                onClick={() => setActivePage(tab.id)}
                className={[
                  "relative px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm rounded-full transition-all duration-200",
                  isActive
                    ? "bg-white text-black shadow-lg shadow-black/50"
                    : "text-neutral-300 hover:text-white hover:bg-white/10",
                  isWizard && !isActive && "border border-[#800000]/40",
                  isWizard && "flex items-center gap-1.5"
                ].join(" ")}
              >
                {isWizard && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#800000] animate-pulse" />
                )}
                <span>{tab.label}</span>
                {isWizard && (
                  <span className="hidden text-[10px] font-medium text-[#ffcccc] md:inline">
                    • Önerini Bul
                  </span>
                )}
              </button>
            );
          })}

          {/* Sağda “Teklif Al” mini butonu (opsiyonel) */}
          <button
            onClick={() => setActivePage('wizard')}
            className="ml-1 hidden rounded-full bg-[#800000] px-3 py-1.5 text-xs font-medium text-white shadow-md shadow-[#800000]/40 transition-transform duration-200 hover:scale-[1.03] md:inline-flex"
          >
            Teklif Al
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;