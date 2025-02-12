'use client';

import type { Database } from '@/utils/database.types';
import { Button } from '@founderswap/design-system/components/ui/button';
import { Separator } from '@founderswap/design-system/components/ui/separator';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState } from 'react';

type Skills = Database['public']['Tables']['skill_translations']['Row'];

interface Step2Props {
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  defaultValues?: {
    interests?: string[];
    skills?: Partial<Skills>;
  };
}

interface Category {
  id: string;
  title: string;
}

const transitionProps = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

const categories: Category[] = [
  {
    id: '1',
    title: 'User Analytics',
  },
  {
    id: '2',
    title: 'Event Tracking',
  },
  {
    id: '3',
    title: 'A/B Testing',
  },
  {
    id: '4',
    title: 'User Journeys',
  },
  {
    id: '5',
    title: 'Engagement Tracking',
  },
  {
    id: '6',
    title: 'Data Management',
  },
  {
    id: '7',
    title: 'Security & Compliance',
  },
];

export function Step2Form({ onSubmit, submitLabel = 'Continue' }: Step2Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCategory = (categoryId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelected((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (formData: FormData) => {
    selected.forEach((categoryId) => {
      formData.append('categories[]', categoryId);
    });

    await onSubmit(formData);
  };

  return (
    <form action={handleSubmit}>
      <div className="space-y-10">
        <motion.div
          className="flex w-[520px] flex-wrap gap-2"
          layout
          transition={transitionProps}
        >
          {categories.map((category) => {
            const isSelected = selected.includes(category.id);
            return (
              <motion.button
                key={category.id}
                onClick={(e) => toggleCategory(category.id, e)}
                type="button"
                layout
                initial={false}
                className={`inline-flex items-center overflow-hidden whitespace-nowrap rounded-full border px-4 py-2 font-medium text-base ${
                  isSelected
                    ? ' border-brand-subtlest bg-brand-subtlest text-brand-strong transition-all duration-500 hover:bg-brand-subtle active:bg-item-subtle'
                    : ' border-item bg-item text-description transition-all duration-500 hover:border-item-hover hover:bg-item-hover active:bg-item-active'
                }
                `}
              >
                <motion.div
                  className="relative flex items-center"
                  animate={{
                    width: isSelected ? 'auto' : '100%',
                    paddingRight: isSelected ? '1.5rem' : '0',
                  }}
                  transition={{
                    ease: [0.175, 0.885, 0.32, 1.275],
                    duration: 0.3,
                  }}
                >
                  <span className="text-sm">{category.title}</span>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                          mass: 0.5,
                        }}
                        className="absolute right-0"
                      >
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-brand">
                          <Check
                            className="h-3 w-3 stroke-icon-inverse"
                            strokeWidth={1.5}
                          />
                        </div>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>
        <Separator />
        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-fit"
            disabled={selected.length === 0}
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
