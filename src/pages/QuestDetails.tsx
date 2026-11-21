import {useState, useContext } from "react";
import type { Context } from "../interfaces/context";
import { ContextData } from "../context/Context";
import Navbar from "../components/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import Error from "./Error";
import QuestModal from "../components/QuestModal";
import { supabase } from "../bd/supabase";
import {QUEST_REWARDS} from "../constants/questRewards"
import {toast} from "sonner"

export default function QuestDetail() {
  const navigate = useNavigate();
  const context = useContext<Context>(ContextData);
  const userData = context.user;
  const questData = context.mission;
  const previousLevel = userData.data.level
  const { id } = useParams();
  const actualMission = questData.data.find((quest) => String(quest.id) === id);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false)

  if(deleting) return null

  if (!actualMission) return <Error />;

  async function updateUserData(){
      try {
        const { data, error } = await supabase
          .from("profiles")
          .update({
            xp: userData.data.xp + (actualMission!==undefined ? QUEST_REWARDS[actualMission.difficulty].xp : 0),
            coins: userData.data.coins + (actualMission!==undefined ? QUEST_REWARDS[actualMission.difficulty].coins : 0),
          })
          .eq("id", userData.data.id)
          .select()
          .single();
          
          if (!error) {
            userData.setUser(data);
  
            const newLevel = Math.floor(data.xp/100) + 1
            if(newLevel > previousLevel){
              toast.success(`You level up to: ${newLevel}!`)
            }
          }else{
            console.error("Error when trying to complete a quest: ", error.message)
          }
      } catch (error) {
        console.error("There was an unexpected error when updating the user: ", error);
      }

  }

  async function updateQuestStatus(){
    try{
      const {data,error} = await supabase.from("quests").update({status: "completed"}).eq("id",id).select("id,title,description,category,difficulty,status,deadline").single()

      if(!error){
        questData.setMission(
          questData.data.map((quest) => {
            if (quest.id === data.id) {
              return data;
            }
            return quest;
          }),
        );
        toast.success("Quest completed!")
      }else{
        console.error("Error trying to update quest status: ",error.message)
      }

    }catch(error){
      console.error("Unexpected error when updating quest status: ", error)
    }
  }

  function completeQuest() {
    if (actualMission?.status === "completed") {
      toast.error("This quest has already been completed.")
      return;
    }

    updateUserData();
    updateQuestStatus();
  }

  function deleteQuest() {
    const deleteQuest = async () => {
      try{
        setDeleting(true)
        const {data,error} = await supabase.from("quests").delete().eq("id",actualMission?.id).select("id").single()
        
        if(!error){
          toast.success(`Quest "${actualMission?.title}" has been deleted.`);
          questData.setMission(
            questData.data.filter((quest) => quest.id !== data.id),
          );
          navigate("/quests");
        }else{
          setDeleting(false);
          toast.error("Could not delete quest");
        }
  
      }catch(error){
        console.error("Unexpected error when trying to delete the quest: ",error)
      }
    }

    if (actualMission?.status === "completed") {
      toast.error("You cannot delete a completed quest.");
      return;
    }

    deleteQuest()
  }

  function editQuest() {
    if (actualMission?.status === "completed") {
      toast.error("You cannot edit a completed quest.")
      return;
    }

    setOpen(true);
  }

  

  return (
    <div className="min-h-screen bg-[#090b18] pb-[calc(68px+env(safe-area-inset-bottom))] text-slate-100 lg:pb-0">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <Navbar />

        <main className="min-w-0 flex-1">
          {open && (
            <QuestModal
              setOpen={setOpen}
              isEditing={true}
              editQuest={actualMission}
            />
          )}
          {/* MAIN CONTENT */}
          <div className="mx-auto max-w-6xl space-y-7 p-5 md:p-8">
            {/* BREADCRUMB / BACK NAVIGATION */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link to="/quests" className="transition hover:text-violet-300">
                Quests
              </Link>

              <span>/</span>

              <span className="text-slate-300">Quest Details</span>
            </div>

            {/* QUEST HEADER */}
            <section className="relative overflow-hidden rounded-3xl border border-violet-400/25 bg-linear-to-br from-violet-950/80 via-[#19162f] to-slate-950 p-6 md:p-9">
              {/* BACKGROUND DECORATION */}
              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />

              <div className="relative">
                {/* CATEGORY AND DIFFICULTY */}
                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-300">
                    {actualMission?.category}
                  </span>

                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                    {actualMission?.difficulty}
                  </span>

                  <span className="rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-300">
                    {actualMission?.status}
                  </span>
                </div>

                {/* QUEST TITLE AND DESCRIPTION */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="min-w-0 flex-1">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                      quest-{actualMission?.id}
                    </p>

                    <h1 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
                      {actualMission?.title}
                    </h1>

                    {/* <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                      Venture into the ancient forest, follow the river trail,
                      and uncover the mysterious whispers hidden among the trees.
                      Discover what lies beyond the old forest path.
                    </p> */}
                  </div>

                  {/* QUEST ILLUSTRATION */}
                  <div className="flex h-36 w-full shrink-0 items-center justify-center rounded-2xl border border-emerald-300/20 bg-linear-to-br from-emerald-950 to-slate-900 text-7xl md:h-44 md:w-48">
                    🌲
                  </div>
                </div>
              </div>
            </section>

            {/* MAIN DETAILS AND REWARDS */}
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_0.8fr]">
              {/* LEFT COLUMN */}
              <div className="space-y-6">
                {/* QUEST INFORMATION */}
                <article className="rounded-2xl border border-white/10 bg-white/3 p-6">
                  <h2 className="text-lg font-bold">
                    <span className="mr-2 text-violet-300">📜</span>
                    Quest Information
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {actualMission?.description}
                  </p>

                  {/* <p className="mt-3 text-sm leading-7 text-slate-400">
                    Follow the river, explore the surrounding area, and
                    uncover the secrets hidden within the forest.
                  </p> */}

                  {/* QUEST METADATA */}
                  <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-slate-500">Category</p>
                      <p className="mt-2 font-semibold text-slate-200">
                        {actualMission?.category}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Difficulty</p>
                      <p className="mt-2 font-semibold text-emerald-300">
                        {actualMission?.difficulty}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Deadline</p>
                      <p className="mt-2 font-semibold text-slate-200">
                        {actualMission?.deadline === null
                          ? "No deadline"
                          : actualMission?.deadline}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Status</p>
                      <p
                        className={
                          actualMission?.status === "pending"
                            ? "mt-2 font-semibold text-amber-300"
                            : "mt-2 font-semibold text-emerald-300"
                        }
                      >
                        ● {actualMission?.status}
                      </p>
                    </div>
                  </div>
                </article>

                {/* REWARDS SECTION */}
                <article className="rounded-2xl border border-amber-300/20 bg-linear-to-br from-amber-500/[0.07] to-slate-900 p-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎁</span>

                    <div>
                      <h2 className="text-lg font-bold">Quest Rewards</h2>

                      <p className="mt-1 text-xs text-slate-400">
                        Complete this quest to claim your rewards.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* EXPERIENCE REWARD */}
                    <div className="rounded-xl border border-amber-300/20 bg-slate-950/50 p-5">
                      <p className="text-xs text-slate-400">
                        Experience Points
                      </p>

                      <p className="mt-3 text-3xl font-black text-amber-300">
                        +{QUEST_REWARDS[actualMission.difficulty].xp || 0} XP
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        Helps you level up
                      </p>
                    </div>

                    {/* COINS REWARD */}
                    <div className="rounded-xl border border-violet-300/20 bg-slate-950/50 p-5">
                      <p className="text-xs text-slate-400">Gold Coins</p>

                      <p className="mt-3 text-3xl font-black text-violet-300">
                        +{QUEST_REWARDS[actualMission.difficulty].coins || 0}
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        Spend them on characters
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              {/* RIGHT COLUMN */}
              <aside className="space-y-6">
                {/* QUEST STATUS CARD */}
                <article className="rounded-2xl border border-white/10 bg-white/3 p-6">
                  <h2 className="text-lg font-bold">Quest Status</h2>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10 text-2xl">
                      ⚔️
                    </div>

                    <div>
                      <p className="font-bold text-amber-300">
                        {actualMission?.status || "Pending"}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {actualMission?.status === "pending"
                          ? "This quest has not been completed yet."
                          : "This quest has been completed."}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-white/5 bg-slate-950/50 p-4">
                    <p className="text-xs text-slate-500">Available rewards</p>

                    <p className="mt-2 text-sm font-semibold text-slate-200">
                      {QUEST_REWARDS[actualMission.difficulty].xp} XP and{" "}
                      {QUEST_REWARDS[actualMission.difficulty].coins} Gold Coins
                    </p>
                  </div>

                  {/* COMPLETE QUEST ACTION */}
                  <button
                    onClick={completeQuest}
                    type="button"
                    className="mt-5 w-full rounded-xl bg-linear-to-r from-emerald-500 to-green-600 px-4 py-3 font-bold text-white shadow-lg shadow-emerald-950/30 transition hover:brightness-110"
                  >
                    {actualMission?.status === "pending"
                      ? "✓ Mark as Completed"
                      : "✓ Quest Completed"}
                  </button>
                </article>

                {/* QUEST ACTIONS */}
                <article className="rounded-2xl border border-white/10 bg-white/3 p-6">
                  <h2 className="text-lg font-bold">Quest Actions</h2>

                  <div className="mt-5 space-y-3">
                    {/* EDIT QUEST */}
                    <button
                      onClick={editQuest}
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/20"
                    >
                      ✎ Edit Quest
                    </button>

                    {/* DELETE QUEST */}
                    <button
                      type="button"
                      onClick={deleteQuest}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-400/20 bg-rose-500/5 px-4 py-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/10"
                    >
                      🗑 Delete Quest
                    </button>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-slate-500">
                    Quest changes will affect your adventure progress.
                  </p>
                </article>
              </aside>
            </section>

            {/* BACK TO QUESTS */}
            <div className="border-t border-white/10 pt-5">
              <Link
                to="/quests"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-violet-300"
              >
                ← Back to All Quests
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
