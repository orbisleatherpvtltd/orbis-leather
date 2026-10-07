import { prisma } from "@/lib/db";
import { createFaqItem, updateFaqItem, deleteFaqItem } from "@/lib/actions/faq";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";
import { Checkbox } from "@/components/ui/form/checkbox";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminFaqPage() {
  const items = await prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-h2 font-bold text-ink">FAQ</h1>

      <div className="rounded-lg border border-ink/10 bg-white p-6">
        <h2 className="mb-4 text-body font-semibold text-ink">Add FAQ</h2>
        <form action={createFaqItem} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input name="question" placeholder="Question" required />
            <Input name="category" placeholder="Category (optional)" />
          </div>
          <Textarea name="answer" placeholder="Answer" rows={3} required />
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-body-sm text-ink/70">
              Sort order
              <Input name="sortOrder" type="number" defaultValue={0} className="w-20" />
            </label>
            <Checkbox name="isPublished" label="Published" />
          </div>
          <Button type="submit" variant="primary" size="sm" className="w-fit">
            Add FAQ
          </Button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <form
            key={item.id}
            action={updateFaqItem.bind(null, item.id)}
            className="flex flex-col gap-4 rounded-lg border border-ink/10 bg-white p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="question" defaultValue={item.question} required />
              <Input name="category" defaultValue={item.category ?? ""} placeholder="Category (optional)" />
            </div>
            <Textarea name="answer" defaultValue={item.answer} rows={3} required />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-body-sm text-ink/70">
                  Sort order
                  <Input
                    name="sortOrder"
                    type="number"
                    defaultValue={item.sortOrder}
                    className="w-20"
                  />
                </label>
                <Checkbox name="isPublished" label="Published" defaultChecked={item.isPublished} />
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" variant="outline" size="sm">
                  Save
                </Button>
                <DeleteButton
                  action={deleteFaqItem.bind(null, item.id)}
                  confirmText={`Delete this FAQ item? This cannot be undone.`}
                />
              </div>
            </div>
          </form>
        ))}
        {items.length === 0 && (
          <p className="rounded-lg border border-dashed border-ink/20 p-8 text-center text-ink/60">
            No FAQ items yet.
          </p>
        )}
      </div>
    </div>
  );
}
