export default function Toast({ mensagem }) {
  if (!mensagem) return null;
  return (
    <div
      role="status"
      className="fixed bottom-7 left-1/2 z-[99] -translate-x-1/2 animate-up bg-ink px-[26px] py-[14px] text-[13px] text-cream"
    >
      {mensagem}
    </div>
  );
}
