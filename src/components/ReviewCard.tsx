interface ReviewCardProps {
  text: string;
  parentName: string;
  date?: string;
}

export default function ReviewCard({ text, parentName }: ReviewCardProps) {
  return (
    <div className="bg-card-bg rounded-3xl p-8 card-shadow h-full flex flex-col">
      <p className="text-foreground/70 mb-4 flex-grow">
        &quot;{text}&quot;
      </p>
      <p className="font-semibold">- {parentName}</p>
    </div>
  );
}