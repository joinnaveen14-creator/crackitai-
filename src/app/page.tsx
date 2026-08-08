import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
        CRACKIT <span className="text-[#3B82F6]">AI</span>
      </h1>
      <p className="text-[#94A3B8] text-xl max-w-2xl mb-10 leading-relaxed">
        Your Selection Is Not Luck. It's a Pattern. Analysis of 8 years of TSLPRB papers at your fingertips.
      </p>
      <Link href="/chat" className="bg-[#3B82F6] px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
        Start Preparing Free →
      </Link>
    </div>
  );
}
