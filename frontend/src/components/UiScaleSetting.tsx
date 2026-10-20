import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUiScale } from '@/hooks/useUiScale';
import { ZoomIn } from 'lucide-react';

export function UiScaleSetting() {
  const { scale, setScale, options } = useUiScale();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ZoomIn className="w-4 h-4 text-muted-foreground" />
        <Label htmlFor="ui-scale" className="text-sm font-medium">
          UI Size
        </Label>
      </div>
      <Select
        value={scale.toString()}
        onValueChange={(value) => setScale(parseFloat(value) as any)}
      >
        <SelectTrigger id="ui-scale" className="w-full">
          <SelectValue placeholder="Select UI size" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        Adjust the interface size for better readability and accessibility.
      </p>
    </div>
  );
}
