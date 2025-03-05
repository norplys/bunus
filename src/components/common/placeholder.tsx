import { Logo } from "./logo";

export function Placeholder() {
  return (
    <main className="flex items-center justify-center bg-foreground min-h-screen w-screen absolute top-0 left-0 z-50">
      <Logo
        text={true}
        placeholder={true}
        icon={true}
        logoClassName="w-64 h-64 hidden md:block"
        className="text-primary-foreground animate-pulse"
      />
    </main>
  );
}
