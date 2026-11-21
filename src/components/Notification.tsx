interface NotificationProps {
  title: string;
  message: string;
  icon: string;
}

export function Notification({ title, message, icon }: NotificationProps) {
  return (
    // NOTIFICATION CONTAINER
    // Position this notification above the application content.
    <div className="fixed right-4 top-4 z-100 w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-right-5 fade-in duration-300">
      <div className="rounded-xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-md">
        <div className="flex items-start gap-3">
          {/* NOTIFICATION ICON */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-2xl">
            {icon}
          </div>

          {/* NOTIFICATION MESSAGE */}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-white">{title}</h3>

            <p className="mt-1 text-xs leading-5 text-slate-400">{message}</p>
          </div>

          {/* CLOSE BUTTON: Connect to notification dismissal later. */}
          <button
            type="button"
            aria-label="Close notification"
            className="text-slate-500 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* NOTIFICATION TIMER: Visual only. Connect its animation later. */}
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
          <div className="h-full w-2/3 rounded-full bg-violet-400" />
        </div>
      </div>
    </div>
  );
}
