"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/icons";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export type AccordionItemData = {
  id: string;
  question: ReactNode;
  answer: ReactNode;
};

export type AccordionProps = {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
};

export function Accordion({ items, allowMultiple = false, defaultOpenIds = [], className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = allowMultiple ? new Set(prev) : new Set<string>();
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <StaggerGroup className={cn("flex flex-col gap-4", className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <StaggerItem
            key={item.id}
            className="rounded-2xl bg-paper px-6 shadow-lg shadow-ink/5 ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-leather/10"
          >
            <h3>
              <button
                type="button"
                id={`${item.id}-trigger`}
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-body-lg font-medium text-ink"
              >
                {item.question}
                <ChevronDownIcon
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-leather transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-trigger`}
              className="accordion-panel"
              data-open={isOpen}
            >
              <div>
                <p className="pb-5 text-body text-ink/70">{item.answer}</p>
              </div>
            </div>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
