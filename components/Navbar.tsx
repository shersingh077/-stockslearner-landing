export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050816]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          className="text-3xl font-extrabold text-green-400 tracking-wide"
        >
          StocksLearner
        </a>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
          <a href="#home" className="hover:text-green-400 transition">Home</a>
          <a href="#services" className="hover:text-green-400 transition">Services</a>
          <a href="#process" className="hover:text-green-400 transition">Process</a>
          <a href="#reviews" className="hover:text-green-400 transition">Reviews</a>
          <a href="#faq" className="hover:text-green-400 transition">FAQ</a>
          <a href="#contact" className="hover:text-green-400 transition">Contact</a>
        </nav>

        {/* Animated Join Button */}
        <a
          href="#contact"
          className="relative inline-flex items-center justify-center px-7 py-3 font-bold text-white rounded-xl
          bg-green-500 hover:bg-green-400
          transition-all duration-300
          hover:scale-110
          animate-pulse
          shadow-[0_0_20px_#22c55e]"
        >
          🚀 Join Now
          <span className="absolute inset-0 rounded-xl animate-ping bg-green-400 opacity-20"></span>
        </a>

      </div>
    </header>
  );
}