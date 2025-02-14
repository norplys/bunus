import { Logo } from "./logo";

export function Placeholder() {
  return (
    <main className="flex items-center justify-center bg-foreground min-h-screen w-screen">
      <Logo
        text={true}
        placeholder={true}
        icon={true}
        logoClassName="rounded-full w-64 h-64"
        className="text-primary-foreground animate-pulse"
      />
    </main>
  );
}
