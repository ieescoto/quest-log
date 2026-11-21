import { useEffect, useState, useContext } from "react";
import type { Context } from "../interfaces/context";
import { ContextData } from "../context/Context";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "../schemas/profileForm";
import type { ProfileFormFields } from "../schemas/profileForm";
import { supabase } from "../bd/supabase";

interface ProfileModalProps {
    setOpen : Function
}

export function ProfileModal({ setOpen }: ProfileModalProps) {
  const context = useContext<Context>(ContextData);
  const user = context.user;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormFields>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      avatar: user.data.avatar,
    },
  });

  const onSubmit: SubmitHandler<ProfileFormFields> = (formData) => {
    const updateProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .update({
            username: formData.username,
            avatar: formData.avatar,
          })
          .eq("id", user.data.id)
          .select()
          .single();

        if (!error) {
          user.setUser(data);
          alert("Profile updated successfully!");
          reset();
          setOpen(false);
        }
      } catch (error) {}
    };

    updateProfile();
  };

  const onError = (errors: any) => {
    console.log("Errores de validación:", errors);
  };

  const selectedAvatar = watch("avatar");

  return (
    // MODAL OVERLAY
    // Covers the screen and darkens the background.
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm">
      {/* MODAL CONTAINER */}
      {/* Limits the modal size and allows scrolling on smaller screens. */}
      <section className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/50 md:p-8">
        {/* MODAL HEADER */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              Customize Your Profile
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Choose how other adventurers see you.
            </p>
          </div>

          {/* CLOSE BUTTON: Connect this button to your modal visibility state. */}
          <button
            onClick={() => setOpen(false)}
            type="button"
            aria-label="Close modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* PROFILE FORM */}
        {/* You will connect React Hook Form and Zod later. */}
        <form className="space-y-7" onSubmit={handleSubmit(onSubmit, onError)}>
          {/* PLAYER NAME */}
          <div>
            <label
              htmlFor="player-name"
              className="mb-2 block text-sm font-semibold text-slate-200"
            >
              Adventurer Name
            </label>

            <input
              {...register("username")}
              id="player-name"
              name="username"
              type="text"
              /* required
              maxLength={30} */
              defaultValue={user.data.username}
              placeholder="Enter your adventurer name"
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
            />

            {!errors.username && (
              <p className="mt-2 text-xs text-slate-500">
                Choose a name with up to 10 characters.
              </p>
            )}
            {errors.username && (
              <p className="mt-2 text-xs text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* AVATAR SELECTION */}
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-200">
              Choose Your Avatar
            </p>

            {/* Visual avatar options: you will implement the selection. */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setValue("avatar", "🧙")}
                type="button"
                aria-label="Mage avatar"
                className={`${selectedAvatar === "🧙" ? "border-violet-400 bg-violet-500/20" : "border-white/10 bg-slate-950/60"} flex h-14 w-14 items-center justify-center rounded-xl border-2 text-3xl transition hover:bg-violet-500/30`}
              >
                🧙
              </button>

              <button
                onClick={() => setValue("avatar", "🛡️")}
                type="button"
                aria-label="Knight avatar"
                className={`${selectedAvatar === "🛡️" ? "border-violet-400 bg-violet-500/20" : "border-white/10 bg-slate-950/60"} flex h-14 w-14 items-center justify-center rounded-xl border-2 text-3xl transition hover:border-violet-400/50`}
              >
                🛡️
              </button>

              <button
                onClick={() => setValue("avatar", "🏹")}
                type="button"
                aria-label="Archer avatar"
                className={`${selectedAvatar === "🏹" ? "border-violet-400 bg-violet-500/20" : "border-white/10 bg-slate-950/60"} flex h-14 w-14 items-center justify-center rounded-xl border-2 text-3xl transition hover:border-violet-400/50`}
              >
                🏹
              </button>

              <button
                onClick={() => setValue("avatar", "🧝")}
                type="button"
                aria-label="Healer avatar"
                className={`${selectedAvatar === "🧝" ? "border-violet-400 bg-violet-500/20" : "border-white/10 bg-slate-950/60"} flex h-14 w-14 items-center justify-center rounded-xl border-2 text-3xl transition hover:border-violet-400/50`}
              >
                🧝
              </button>

              <button
                onClick={() => setValue("avatar", "🐉")}
                type="button"
                aria-label="Dragon avatar"
                className={`${selectedAvatar === "🐉" ? "border-violet-400 bg-violet-500/20" : "border-white/10 bg-slate-950/60"} flex h-14 w-14 items-center justify-center rounded-xl border-2 text-3xl transition hover:border-violet-400/50`}
              >
                🐉
              </button>

              <button
                onClick={() => setValue("avatar", "⚔️")}
                type="button"
                aria-label="Sword avatar"
                className={`${selectedAvatar === "⚔️" ? "border-violet-400 bg-violet-500/20" : "border-white/10 bg-slate-950/60"} flex h-14 w-14 items-center justify-center rounded-xl border-2 text-3xl transition hover:border-violet-400/50`}
              >
                ⚔️
              </button>

              <button
                onClick={() => setValue("avatar", "🧙‍♀️")}
                type="button"
                aria-label="Wizard avatar"
                className={`${selectedAvatar === "🧙‍♀️" ? "border-violet-400 bg-violet-500/20" : "border-white/10 bg-slate-950/60"} flex h-14 w-14 items-center justify-center rounded-xl border-2 text-3xl transition hover:border-violet-400/50`}
              >
                🧙‍♀️
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Select an avatar to represent your adventurer.
            </p>
          </div>

          {/* FORM ACTIONS */}
          <div className="flex flex-wrap justify-end gap-3 border-t border-white/10 pt-6">
            <button
              type="reset"
              onClick={() => reset()}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
            >
              Reset
            </button>

            <button
              type="submit"
              className="rounded-xl bg-linear-to-r from-violet-500 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:brightness-110"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
