import { AlertTriangle, ArrowRight, CalendarClock, CheckCircle2, CircleDashed, FolderKanban, ListTodo } from "lucide-react";

const tasks = [
  { title: "ML model checkpoint", status: "In Progress", priority: "High" },
  { title: "AURATHON final round prep", status: "Submitted for Review", priority: "High" },
  { title: "Department onboarding deck", status: "Assigned", priority: "Medium" },
];

const projects = [
  { name: "Generative AI workshop archive", progress: "72%" },
  { name: "Research connect platform", progress: "48%" },
];

export default function MemberDashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="mb-10">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Member dashboard</div>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">Welcome back, member.</h1>
      </section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Assigned tasks", value: "04", icon: ListTodo },
          { label: "Upcoming deadlines", value: "02", icon: CalendarClock },
          { label: "Awaiting review", value: "01", icon: CircleDashed },
          { label: "Completed", value: "06", icon: CheckCircle2 },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-[26px] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">{label}</span>
              <Icon size={18} className="text-[#ffb347]" />
            </div>
            <div className="mt-6 text-3xl font-black text-white">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black text-white">Assigned tasks</h2>
            <button type="button" className="inline-flex items-center gap-2 text-sm font-medium text-[#8feaf0]">
              View board <ArrowRight size={16} />
            </button>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.title} className="rounded-[22px] border border-white/10 bg-slate-950/30 p-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-white">{task.title}</h3>
                  <span className="rounded-full border border-[#ffb347]/30 bg-[#ffb347]/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[#ffdca8]">
                    {task.priority}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                  <span>{task.status}</span>
                  <span>Due soon</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center gap-3 text-[#ffb347]">
              <FolderKanban size={20} />
              <h2 className="text-xl font-black text-white">Project activity</h2>
            </div>
            {projects.map((project) => (
              <div key={project.name} className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm text-slate-200">
                  <span>{project.name}</span>
                  <span>{project.progress}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#ffb347] to-[#2ec5c4]" style={{ width: project.progress }} />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#091b2a] p-6">
            <div className="mb-4 flex items-center gap-3 text-[#ffb347]">
              <AlertTriangle size={20} />
              <h2 className="text-xl font-black text-white">Needs attention</h2>
            </div>
            <p className="text-slate-200">One task requires review, and one collaboration request is waiting for approval.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
