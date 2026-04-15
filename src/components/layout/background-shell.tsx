export function BackgroundShell() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-background bg-mesh" />
      <div className="fixed -left-20 top-16 -z-10 h-80 w-80 rounded-full bg-primary/20 blur-[100px]" />
      <div className="fixed bottom-10 right-0 -z-10 h-[22rem] w-[22rem] rounded-full bg-cyan-300/20 blur-[120px]" />
      <div className="fixed left-1/2 top-1/3 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-100/60 blur-[100px]" />
    </>
  );
}
