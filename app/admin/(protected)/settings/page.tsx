import { getSiteSettings, SETTINGS_LABELS } from "@/lib/settings/data";
import { updateSiteSetting } from "@/lib/actions/settings";
import { Textarea } from "@/components/ui/form/textarea";
import { Button } from "@/components/ui/button";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-h2 font-bold text-ink">Settings</h1>
      <p className="text-body-sm text-ink/60">
        These values control site-wide contact details. Defaults are pre-filled; save a field to
        override it.
      </p>

      <div className="flex flex-col gap-4">
        {Object.entries(SETTINGS_LABELS).map(([key, label]) => (
          <form
            key={key}
            action={updateSiteSetting.bind(null, key)}
            className="flex flex-col gap-3 rounded-lg border border-ink/10 bg-white p-6"
          >
            <label htmlFor={key} className="text-body-sm font-medium text-ink">
              {label}
            </label>
            <Textarea id={key} name="value" defaultValue={settings[key]} rows={2} />
            <Button type="submit" variant="outline" size="sm" className="w-fit">
              Save
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
}
