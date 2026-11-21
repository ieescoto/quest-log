import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Error() {
  return (
    <div className="flex min-h-screen bg-slate-950 pb-[calc(68px+env(safe-area-inset-bottom))] text-white lg:pb-0">

      {/* SIDEBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="flex min-w-0 flex-1 items-center justify-center px-4 py-12">

        <section className="w-full max-w-2xl text-center">

          <div className="mb-8">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 shadow-lg shadow-violet-950/40">
              <span className="text-6xl">🧭</span>
            </div>
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-violet-400">
            Lost in the Unknown
          </p>

          <h1 className="mb-4 text-7xl font-black tracking-tight sm:text-8xl">
            404
          </h1>

          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            This Quest Does Not Exist
          </h2>

          <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
            It seems you've wandered into an unexplored area.
            The path you're looking for may have disappeared
            or never existed.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-violet-500 to-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:brightness-110"
          >
            Return to Dashboard
          </Link>

          <p className="mt-8 text-xs text-slate-600">
            Every adventurer gets lost sometimes.
          </p>

        </section>
      </main>
    </div>
  );
}
