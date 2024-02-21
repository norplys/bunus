export default function Cart() {
  return (
    <div className="min-h-screen grid grid-cols-4 justify-center p-5 border border-black">
      <div className="col-span-3">
        <h1 className="text-4xl text-center font-extrabold pb-2 ">
          Your Cart 5 Items
        </h1>
      </div>
      <div>
        <h1 className="text-5xl font-extrabold border-b-2 border-b-primary-red pb-2">
          Summary
        </h1>
      </div>
    </div>
  );
}
