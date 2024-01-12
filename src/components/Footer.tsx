export default function Footer() {
  return (
    <footer className="bg-primary-brown grid p-20 justify-center items-center gap-10">
      <div className="flex justify-around">
        <div className="grid grid-cols-2 text-slate-50 font-thin gap-2">
          <h1 className="col-span-2 font-bold">Jam Buka</h1>
          <div>Senin</div>
          <div>07:00 - 20:00</div>
          <div>Selasa</div>
          <div>07:00 - 20:00</div>
          <div>Rabu</div>
          <div>07:00 - 20:00</div>
          <div>Kamis</div>
          <div>Closed</div>
          <div>Jumat</div>
          <div>07:00 - 20:00</div>
          <div>Sabtu</div>
          <div>07:00 - 20:00</div>
          <div>Minggu</div>
          <div>07:00 - 20:00</div>
        </div>
        <div className="flex flex-col gap-2 text-slate-50">
          <h1 className="font-bold ">Seputar Kami</h1>
          <div className="font-thin">Testimoni</div>
          <div className="font-thin">Tentang Kami</div>
        </div>
      </div>
      <div className="text-slate-50">
        Copyright © 2022 Bubur Nusantara. All rights reserved.
      </div>
    </footer>
  );
}
