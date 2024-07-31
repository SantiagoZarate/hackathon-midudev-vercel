import { MarkIcon } from "@/components/icons/MarkIcon";
import { SparkleMiniIcon } from "@/components/icons/SparkleMiniIcon";
import { Button } from "@/components/ui/button";

interface Props {
  onFetchResults: () => void;
  onClearMap: () => void;
  isPending: boolean;
}

export function ButtonsSection({
  onClearMap,
  onFetchResults,
  isPending,
}: Props) {
  return (
    <section className="flex gap-2">
      <Button onClick={() => onFetchResults()} disabled={isPending}>
        <SparkleMiniIcon />
        Generate circle radius
      </Button>
      <Button className="w-fit" onClick={() => onClearMap()}>
        <MarkIcon />
        Clear
      </Button>
    </section>
  );
}
