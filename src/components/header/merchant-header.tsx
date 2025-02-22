import { Logo } from "../common/logo";

export function MerchantHeader() {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-primary/70 text-primary-foreground h-20 p-4">
      <section className="layout">
        <Logo text={true} clickable={false} icon={true} logoClassName="w-12" />
      </section>
    </header>
  );
}
