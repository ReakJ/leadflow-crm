import { Palette } from "lucide-react";
import { useTheme } from "../../context/useTheme";

const SettingsPage = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Settings
        </h1>

        <p className="text-sm text-base-content/60 mt-1">
          Manage your LeadFlow preferences.
        </p>
      </div>

      {/* Appearance */}
      <section className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Palette size={20} />
            </div>

            <div>
              <h2 className="card-title">
                Appearance
              </h2>

              <p className="text-sm text-base-content/60 mt-0.5">
                Customize how LeadFlow looks.
              </p>
            </div>
          </div>

          <div className="divider"/>

          <div>
            <h3 className="font-semibold">
              Theme
            </h3>

            <p className="mt-1 text-sm text-base-content/60">
              Choose your preferred appearances.
            </p>
          </div>

          {/* Theme choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-3xl">
            <ThemeCard 
              name="Light"
              themeName={themes.LIGHT}
              selected={theme === themes.LIGHT}
              onClick={() => setTheme(themes.LIGHT)}
              mode="light"
            />
            
            <ThemeCard 
              name="Dark"
              themeName={themes.DARK}
              selected={theme === themes.DARK}
              onClick={() => setTheme(themes.DARK)}
              mode="dark"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const ThemeCard = ({
  name,
  themeName,
  selected,
  onClick,
  mode
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        text-left rounded-xl border p-3 transition-all
        ${
          selected
            ? "border-primary ring-2 ring-primary/30"
            : "border-base-300 hover:border-primary/40"
        }  
      `}
    >
      {/* Preview */}
      <div
        data-theme={themeName}
        className="overflow-hidden rounded-lg border border-base-300 bg-base-100"
      >
        <div className="flex h-36">

          {/* Sidebar preview */}
          <div className="w-1/4 bg-base-200 border-r border-base-300 p-2">
            <div className="mb-3 h-2 w-12 rounded bg-base-content/20" />

            <div className="space-y-2">
              <div className="h-2 w-full rounded bg-base-content/10" />
              <div className="h-2 w-4/5 rounded bg-primary" />
              <div className="h-2 w-3/4 rounded bg-base-content/10" />
            </div>
          </div>

          {/* Content preview */}
          <div className="flex-1 bg-base-100 p-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="h-3 w-20 rounded bg-base-content/30" />
              
              <div className="h-5 w-5 rounded-full bg-primary"/>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 rounded-md bg-base-200" />
              <div className="h-12 rounded-md bg-base-200" />
              <div className="col-span-2 h-8 rounded-md bg-base-200"/>
            </div>
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="font-medium">
            {mode === "light" ? "Light" : "Dark"}
          </p>

          <p className="text-xs text-base-content/50">
            {mode === "light"
              ? "Clean and bright"
              : "Focused and comfortable"}
          </p>
        </div>

        {selected && (
          <span className="badge badge-primary">
            Selected
          </span>
        )}
      </div>
    </button>
  )
}

export default SettingsPage