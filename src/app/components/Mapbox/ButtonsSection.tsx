import { MarkIcon } from "@/app/components/icons/MarkIcon";
import { SparkleMiniIcon } from "@/app/components/icons/SparkleMiniIcon";
import { ButtonIcon } from "@/app/components/ui/button";

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
      <ButtonIcon
        onClick={() => onFetchResults()}
        disabled={isPending}
        icon={<SparkleMiniIcon />}
      >
        Generate circle radius
      </ButtonIcon>
      <ButtonIcon
        className="w-fit"
        onClick={() => onClearMap()}
        icon={<MarkIcon />}
      >
        Clear
      </ButtonIcon>
    </section>
  );
}
