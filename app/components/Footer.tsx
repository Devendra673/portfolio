import { siteConfig } from "@/lib/data";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border px-6 py-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
          Made with Next.js
        </p>
      </div>
    </footer>
  );
};

export default Footer;
