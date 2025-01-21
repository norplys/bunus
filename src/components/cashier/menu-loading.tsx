export default function MenuLoading() {
  return (
    <section className="grid justify-items-center gap-2 border rounded-2xl overflow-hidden shadow-lg cursor-pointer scale-95 hover:scale-100 duration-300 p-2 animate-pulse w-80">
      <div className="md:h-60 overflow-hidden h-40 w-full bg-orange-100 rounded-xl"></div>
      <h1 className="bg-orange-200 w-full h-2"></h1>
      <p className="bg-orange-200 w-full h-2"></p>
    </section>
  );
}
