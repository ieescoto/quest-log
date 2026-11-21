import { useForm } from "react-hook-form"
import type { SubmitHandler} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import {STORAGE_KEY} from "../constants/storageKey"
import {supabase} from "../bd/supabase"
import type {Mission} from "../interfaces/missions"
import {missions} from "../assets/missions.json"

export const WelcomeSchema = z.object({
  username: z.string().min(1, "Username is required").max(10, "Username must be at most 10 characters"),
});

export type ProfileFormFields = z.infer<typeof WelcomeSchema>;

interface WelcomeModalProps {
  setLoading : Function,
  setIsNewUser: Function,
  formatUser : Function,
  setQuest: Function,

}

interface WelcomeForm {
  username : string
}


export function WelcomeModal({setLoading, setIsNewUser,formatUser,setQuest}:WelcomeModalProps) {

  async function createUser(username:string) {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .insert([{username}])
          .select()
          .single();
  
        if (!error) {
          localStorage.setItem(STORAGE_KEY, data.id);
          formatUser(data);
          setLoading(false);
        } else {
          console.error("Error creating user:", error.message);
        }
      } catch (error) {
        console.error("Error creating user from the start:", error);
      }
    }

    async function setDefaultQuestData(){
        const userID = localStorage.getItem(STORAGE_KEY)
          try {
            const {data,error} = await supabase.from("quests").insert(
              missions.map((quest)=>{
                return {
                  user_id: userID,
                  title: quest.title,
                  description: quest.description,
                  category: quest.category,
                  difficulty: quest.difficulty,
                  status: quest.status,
                  deadline: quest.deadline
                }
    
            })).select("id,title,description,category,difficulty,status,deadline").order("id",{ascending:true})
    
            if(!error){
              setQuest(data);
            }else{
              console.error("Error inserting default quests to the DB: ", error.message)
              setQuest([]);
            }
          } catch (error) {
            console.error("Something went wrong when trying to insert deault Quests: " , error)
          }
      }

  const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<WelcomeForm>({
        resolver: zodResolver(WelcomeSchema),
      });

      const onSubmit:  SubmitHandler<WelcomeForm> = async (data) => {
        await createUser(data.username)
        await setDefaultQuestData()
        setIsNewUser(false)
      }
      

  return (
    // MODAL OVERLAY
    // This modal should appear on the first visit before profile creation.
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md">

      {/* MODAL CONTAINER */}
      <section className="w-full max-w-md rounded-2xl border border-violet-400/20 bg-slate-900 p-6 shadow-2xl shadow-violet-950/30 sm:p-8">

        {/* WELCOME HEADER */}
        <div className="mb-7 text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/15 text-5xl shadow-lg shadow-violet-950/30">
            🧙
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
            Your Journey Begins Here
          </p>

          <h1 className="text-2xl font-black text-white sm:text-3xl">
            Welcome, Adventurer!
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Every great adventure starts with a name.
            What should we call you?
          </p>
        </div>

        {/* PLAYER NAME FORM */}
        {/* Connect this input to your profile creation logic later. */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

          <div>
            <label
              htmlFor="welcome-username"
              className="mb-2 block text-sm font-semibold text-slate-200"
            >
              Adventurer Name
            </label>

            <input
              {...register("username")}
              id="welcome-username"
              name="username"
              type="text"
              /* required
              minLength={1}
              maxLength={30} */
              placeholder="Enter your name..."
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
            />

            {!errors.username && (<p className="mt-2 text-xs text-slate-500">
              You can change your name and avatar later in My Profile.
            </p>)}

            {errors.username && (
              <p className="mt-2 text-xs text-red-500">
                {errors.username.message}
              </p>)
              }

          </div>


          {/* START ADVENTURE BUTTON */}
          {/* Connect this button to profile creation and UUID generation. */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-linear-to-r from-violet-500 to-purple-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:brightness-110"
          >
            {isSubmitting ? "Creating User...":"Begin Your Adventure →"}
            
          </button>

        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-xs text-slate-500">
          No account required. Your adventure awaits.
        </p>

      </section>
    </div>
  );
}
