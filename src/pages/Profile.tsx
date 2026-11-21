import { useState, useContext } from "react";
import type { Context } from "../interfaces/context";
import { ContextData } from "../context/Context";
import Navbar from "../components/Navbar";
import { ProgressBar } from "../components/ProgressBar";
import { ProfileModal } from "../components/ProfileModal";

export default function Profile() {
  const context = useContext<Context>(ContextData);
  const userData = context.user.data;
  const completedQuests = context.mission.data.filter(
    ({ status }) => status === "completed",
  );
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090b18] pb-[calc(68px+env(safe-area-inset-bottom))] text-slate-100 lg:pb-0">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-6xl space-y-8 p-5 md:p-8">
            {/* PAGE HEADER */}
            <header>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-300">
                Your adventure
              </p>

              <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                Player Profile
              </h1>

              <p className="mt-2 text-sm text-slate-400 md:text-base">
                Manage your adventurer identity and track your progress.
              </p>
            </header>

            {/* PLAYER PROFILE HERO */}
            <section className="relative overflow-hidden rounded-3xl border border-violet-400/25 bg-linear-to-br from-violet-950/80 via-[#19162f] to-slate-950 p-6 md:p-8">
              {/* BACKGROUND DECORATION */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />

              <div className="relative flex flex-col items-center gap-6 sm:flex-row">
                {/* PLAYER AVATAR */}
                <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-4 border-amber-300/70 bg-violet-600/20 text-7xl shadow-xl shadow-violet-950/40">
                  {userData.avatar}
                </div>

                {/* PLAYER INFORMATION */}
                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                    Adventurer
                  </p>

                  <h2 className="mt-2 text-3xl font-black text-white">
                    {userData.username}
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Level {userData.level} Adventurer
                  </p>

                  {/* EXPERIENCE BAR */}
                  <div className="mt-5 max-w-lg">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-violet-200">
                        Experience Progress
                      </span>

                      <span className="text-slate-400">
                        {userData.xp} / {userData.nextLevelXP} XP
                      </span>
                    </div>

                    <ProgressBar design="bg-gradient-to-r from-violet-500 to-fuchsia-400" />

                    {/* <div className="h-3 overflow-hidden rounded-full border border-violet-300/20 bg-slate-950">
                      <div className="h-full w-0 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400" />
                    </div> */}

                    <p className="mt-2 text-xs text-slate-500">
                      {userData.nextLevelXP - userData.xp} XP needed to reach
                      Level {userData.level + 1}.
                    </p>
                  </div>
                </div>

                {/* EDIT PROFILE BUTTON */}
                {/* You will connect this button to your edit form later */}
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="w-full shrink-0 rounded-xl border border-violet-300/30 bg-violet-500/15 px-5 py-3 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/25 sm:w-auto"
                >
                  ✎ Edit Profile
                </button>
              </div>
            </section>

            {/* PLAYER STATISTICS */}
            <section>
              <div className="mb-4">
                <h2 className="text-xl font-bold">Adventure Overview</h2>

                <p className="mt-1 text-sm text-slate-400">
                  Your achievements throughout your journey.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* PLAYER LEVEL */}
                <article className="rounded-2xl border border-amber-300/25 bg-linear-to-br from-amber-400/10 to-slate-900 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">Current Level</p>

                    <span className="text-2xl">⭐</span>
                  </div>

                  <p className="mt-3 text-3xl font-black text-amber-300">
                    {userData.level}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Keep earning experience.
                  </p>
                </article>

                {/* TOTAL XP */}
                <article className="rounded-2xl border border-violet-400/25 bg-linear-to-br from-violet-500/10 to-slate-900 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">Total Experience</p>

                    <span className="text-2xl">✨</span>
                  </div>

                  <p className="mt-3 text-3xl font-black text-violet-300">
                    {userData.xp} XP
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Experience earned.
                  </p>
                </article>

                {/* COINS */}
                <article className="rounded-2xl border border-yellow-400/25 bg-linear-to-br from-yellow-500/10 to-slate-900 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">Gold Coins</p>

                    <span className="text-2xl">💎</span>
                  </div>

                  <p className="mt-3 text-3xl font-black text-yellow-300">
                    {userData.coins}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Available currency.
                  </p>
                </article>

                {/* COMPLETED QUESTS */}
                <article className="rounded-2xl border border-emerald-400/25 bg-linear-to-br from-emerald-500/10 to-slate-900 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">Completed Quests</p>

                    <span className="text-2xl">🏆</span>
                  </div>

                  <p className="mt-3 text-3xl font-black text-emerald-300">
                    {completedQuests.length}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Quests successfully completed.
                  </p>
                </article>
              </div>
            </section>

            {/* UNLOCKED CHARACTERS */}
            {/* <section className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">Unlocked Characters</h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Characters you have added to your collection.
                  </p>
                </div>

                {/* CHARACTER COLLECTION COUNT /}
                <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-xs font-semibold text-violet-300">
                  1 Character
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* UNLOCKED CHARACTER /}
                <article className="rounded-xl border border-amber-300/20 bg-linear-to-br from-amber-500/10 to-slate-950 p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                      Common
                    </span>

                    <span className="text-xs text-emerald-300">✓ Unlocked</span>
                  </div>

                  <div className="my-5 flex h-28 items-center justify-center rounded-xl bg-slate-950/50 text-6xl">
                    🧙
                  </div>

                  <h3 className="text-lg font-bold">Apprentice Mage</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    A beginner spellcaster who has just started learning the
                    ancient arts of magic.
                  </p>
                </article>

                {/* EMPTY CHARACTER SLOT /}
                <article className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-slate-950/30 p-5 text-center">
                  <span className="text-5xl opacity-40">🔒</span>

                  <h3 className="mt-4 font-bold text-slate-300">
                    More Characters Await
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                    Visit the character collection and spend your coins to
                    unlock new companions.
                  </p>
                </article>
              </div>
            </section> */}

            {open && <ProfileModal setOpen={setOpen} />}

            {/* FOOTER */}
            <footer className="border-t border-white/10 pt-5 text-center text-xs text-slate-500">
              QuestLog · Your adventure, your story.
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
