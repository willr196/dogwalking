export function Empty({ text }: { text: string }) {
  return (
    <div className="text-center py-12 bg-ww-green/5 rounded-[20px] border-2 border-dashed border-ww-green/15">
      <p className="text-ww-muted">{text}</p>
    </div>
  );
}