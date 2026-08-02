export default function Footer() {
  return (
    <footer className="bg-black border-t border-slate-800 py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold text-green-400">
          StocksLearner
        </h2>

        <p className="text-gray-400 mt-4">
          Learn Trading • Build Wealth • Grow Financially
        </p>

        <div className="flex justify-center gap-8 mt-8 text-gray-300">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">FAQ</a>
          <a href="#">Contact</a>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          © 2026 StocksLearner. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}