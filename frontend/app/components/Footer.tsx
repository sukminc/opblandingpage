export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border border-[#007AFF] flex items-center justify-center">
            <span className="text-[#007AFF] font-bold text-[10px] font-mono">1%</span>
          </div>
          <span className="text-sm text-[#555] font-mono">
            onepercentbetter.poker
          </span>
        </div>
        <p className="text-xs text-[#333] font-mono">
          GTO Defends. We Exploit. &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
