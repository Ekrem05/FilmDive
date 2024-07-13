import IconArrows_remove from "@/components/Icons/IconArrows_remove";

export default function Badge({ label }) {
  return (
    <div>
      <p>{label}</p>
      <div>
        <IconArrows_remove />
      </div>
    </div>
  );
}
