import { Card } from '@founderswap/design-system/components/ui/card';
import { Checkbox } from '@founderswap/design-system/components/ui/checkbox';
import { Label } from '@founderswap/design-system/components/ui/label';
import { cn } from '@founderswap/design-system/lib/utils';

export interface Category {
  id: string;
  title: string;
  subcategories: string[];
}

interface CategoryItemProps {
  category: Category;
  checked: boolean;
  onCheckedChange: (categoryId: string, checked: boolean) => void;
}

export const CategoryItem = ({
  category,
  checked,
  onCheckedChange,
}: CategoryItemProps) => {
  return (
    <Card
      asChild
      className={cn(
        'cursor-pointer border-item p-5 transition-all active:scale-[99%]',
        'has-[:checked]:border-brand has-[:checked]:ring-2 has-[:checked]:ring-brand-subtlest',
        'duration-500'
      )}
    >
      <Label className="block" htmlFor={category.id}>
        <div className="flex items-center gap-3">
          <Checkbox
            id={category.id}
            name={category.title}
            checked={checked}
            onCheckedChange={(isChecked) =>
              onCheckedChange(category.id, isChecked === true)
            }
          />
          <Label className="font-medium text-sm">{category.title}</Label>
        </div>
      </Label>
    </Card>
  );
};
