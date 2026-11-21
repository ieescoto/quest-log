import {QuestSchema} from '../schemas/questForm'
import type {QuestFormFields} from '../schemas/questForm'
import { useForm } from "react-hook-form"
import type { SubmitHandler} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react";
import type { Context } from "../interfaces/context";
import { ContextData } from "../context/Context";
import type {MissionContextType} from "../interfaces/missions"
import {QUEST_REWARDS} from "../constants/questRewards"
import type {Mission} from "../interfaces/missions"
import {supabase} from "../bd/supabase"
import {STORAGE_KEY} from "../constants/storageKey"

interface QuestModalProps {
  setOpen : Function,
  isEditing? : boolean,
  editQuest? : Mission
}

export default function QuestModal({setOpen,isEditing=false,editQuest}:QuestModalProps) {
    const context: Context = useContext<Context>(ContextData);
    const questsData : MissionContextType = context.mission;
    const {
      register,
      handleSubmit,
      reset,
      watch,
      formState: { errors },
    } = useForm<QuestFormFields>({
      resolver: zodResolver(QuestSchema),
    });

    async function updateQuest(questData:QuestFormFields){
      try{
        const {data,error} = await supabase.from("quests").update({
          ...questData,
          deadline: new Date(questData.deadline)
        }).eq("id",editQuest?.id).select("id,title,description,category,difficulty,status,deadline").single()

        if(!error){
          questsData.setMission(questsData.data.map((quest)=>{
          if(quest.id === data.id)
          {
            return data;
          }
          return quest;
        }))
        }else{
          console.error("Error trying to edit the quest: ",error.message)
        }
      }catch(error){
        console.error("Unexpected error trying to edit the Quest: ", error)
      }
    }
    
    async function addQuest(questData:QuestFormFields){
      try{
        const {data,error} = await supabase.from("quests").insert({
          ...questData,
          user_id: localStorage.getItem(STORAGE_KEY),
          deadline: new Date(questData.deadline)
        }).select("id,title,description,category,difficulty,status,deadline").single()

        if(!error){
           questsData.setMission([...questsData.data, data]);
        }else{
          console.error("Error trying to add the quest: ",error.message)
        }
      }catch(error){
        console.error("Unexpected error trying to add the Quest: ", error)
      }
    }


    const onSubmit:  SubmitHandler<QuestFormFields> = (data) => {
      if(isEditing)
      {
        updateQuest(data)
      }
      else
      {
       addQuest(data)
    }
    reset();
    setOpen(false);
  }

    const onError = (errors: any) => {
      console.log("Errores de validación:", errors);
    };

    const selectedDifficulty = watch("difficulty");

  return (
    /* CAPA OSCURA: cubre visualmente la aplicación detrás del modal.
       Más adelante controlarás su visibilidad desde el componente padre. */
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm">

      {/* CONTENEDOR DEL MODAL */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="quest-modal-title"
        className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-violet-400/30 bg-[#101225] shadow-2xl shadow-violet-950/40"
      >

        {/* ENCABEZADO DEL MODAL */}
        <header className="flex items-start justify-between gap-4 border-b border-white/10 bg-linear-to-br from-violet-950/80 to-slate-900/80 p-6">

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
              Quest Book
            </p>

            <h2
              id="quest-modal-title"
              className="text-2xl font-black text-white"
            >
              Create a new quest
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Define your next challenge and prepare for the adventure.
            </p>
          </div>

          {/* BOTÓN VISUAL PARA CERRAR: tú añadirás su evento */}
          <button
            type="button"
            aria-label="Cerrar modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-xl text-slate-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
            onClick={()=>setOpen(false)}
          >
            ×
          </button>
        </header>

        {/* FORMULARIO VISUAL: falta conectar validación y envío */}
        <form onSubmit={handleSubmit(onSubmit,onError)} className="space-y-6 p-6">

          {/* TÍTULO DE LA MISIÓN */}
          <div>
            <label
              htmlFor="quest-title"
              className="mb-2 block text-sm font-semibold text-slate-200"
            >
              Quest Title
              <span className="ml-1 text-rose-400">*</span>
            </label>

            <input
              {...register("title")}
              id="quest-title"
              name="title"
              type="text"
              /* required */
              /* minLength={3}
              maxLength={60} */
              defaultValue={editQuest?.title || ""}
              placeholder="Ej. Explore the Whispering Forest"
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10"
            />

            {!errors.title && (<p className="mt-2 text-xs text-slate-500">
              Between 3 and 60 characters.
            </p>)}
            {errors.title && (
              <p className="mt-2 text-xs text-rose-400">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* DESCRIPCIÓN DE LA MISIÓN */}
          <div>
            <label
              htmlFor="quest-description"
              className="mb-2 block text-sm font-semibold text-slate-200"
            >
              Description
              <span className="ml-1 text-rose-400">*</span>
            </label>

            <textarea
              {...register("description")}
              id="quest-description"
              name="description"
              /* required */
              /* minLength={10}
              maxLength={300} */
              defaultValue={editQuest?.description || ""}
              rows={4}
              placeholder="Describe the objective, the challenge, and what the adventurer must achieve..."
              className="w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10"
            />

            {!errors.description && (<p className="mt-2 text-xs text-slate-500">
              Explain your quest in a maximum of 300 characters.
            </p>)}
            
            {errors.description && (
              <p className="mt-2 text-xs text-rose-400">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* CATEGORÍA Y DIFICULTAD */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* CATEGORÍA: debe coincidir con tus tipos de TypeScript */}
            <div>
              <label
                htmlFor="quest-category"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Category
              </label>

              <select
                {...register("category")}
                id="quest-category"
                defaultValue={editQuest?.category || "study"}
                name="category"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-slate-200 outline-none focus:border-violet-400"
              >
                <option value="study">📚 Study</option>
                <option value="adventure">🧭 Adventure</option>
                <option value="combat">⚔️ Combat</option>
                <option value="exploration">🌲 Exploration</option>
              </select>
            </div>

            {/* DIFICULTAD: la recompensa dependerá de esta elección cuando implementes la lógica */}
            <div>
              <label
                htmlFor="quest-difficulty"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Difficulty
              </label>

              <select
                {...register("difficulty")}
                id="quest-difficulty"
                defaultValue={editQuest?.difficulty || "easy"}
                name="difficulty"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-slate-200 outline-none focus:border-violet-400"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="epic">Epic</option>
              </select>
            </div>
          </div>

          {/* FECHA LÍMITE OPCIONAL */}
          <div>
            <label
              htmlFor="quest-deadline"
              className="mb-2 block text-sm font-semibold text-slate-200"
            >
              Deadline
              <span className="ml-2 text-xs font-normal text-slate-500">
                (Optional)
              </span>
            </label>

            <input
              {...register("deadline")}
              id="quest-deadline"
              defaultValue={editQuest?.deadline || ""}
              name="deadline"
              type="date"
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-violet-400"
            />

            <p className="mt-2 text-xs text-slate-500">
              Leave it blank if the quest has no deadline.
            </p>
          </div>

          {/* PANEL DE RECOMPENSAS: ejemplo visual de dificultad fácil.
              Más adelante lo actualizarás según la dificultad seleccionada. */}
          <section className="rounded-xl border border-amber-300/20 bg-linear-to-br from-amber-400/5 to-violet-500/5 p-4">

            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">🎁</span>
              <h3 className="font-bold text-white">
                Quest Reward
              </h3>
            </div>

            <p className="mb-4 text-xs leading-5 text-slate-400">
              Rewards are assigned automatically based on difficulty.
              No need to enter them manually.
            </p>

            <div className="grid grid-cols-2 gap-3">

              {/* RECOMPENSA DE EXPERIENCIA */}
              <div className="rounded-lg border border-amber-300/10 bg-slate-950/60 p-3">
                <p className="text-xs text-slate-400">Experience</p>
                <p className="mt-1 text-xl font-black text-amber-300">
                  ✦ {QUEST_REWARDS[selectedDifficulty]?.xp || 0} XP
                </p>
              </div>

              {/* RECOMPENSA DE MONEDAS */}
              <div className="rounded-lg border border-violet-300/10 bg-slate-950/60 p-3">
                <p className="text-xs text-slate-400">Coins</p>
                <p className="mt-1 text-xl font-black text-violet-300">
                  ◆ {QUEST_REWARDS[selectedDifficulty]?.coins || 0} Coins
                </p>
              </div>
            </div>
          </section>

          {/* PIE DEL MODAL: botones sin eventos implementados */}
          <footer className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">

            {/* CANCELAR: luego conectarás el cierre del modal */}
            <button
              type="button"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
              onClick={()=>setOpen(false)}
            >
              Cancel
            </button>

            {/* CREAR: todavía no guarda ni envía datos */}
            <button
              type="submit"
              className="rounded-xl bg-linear-to-br from-violet-500 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:brightness-110"
            >
              ✦ Create Quest
            </button>
          </footer>

        </form>
      </section>
    </div>
  );
}
