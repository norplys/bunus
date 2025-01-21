export default function Footer() {
  return (
    <footer className="bg-primary-brown grid md:p-20 justify-center items-center gap-10 p-5">
      <div className="flex justify-around">
        <div className="grid grid-cols-2 text-slate-50 font-thin md:gap-2 gap-1">
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
        <div className="md:flex flex-col gap-2 text-slate-50 hidden">
          <h1 className="font-bold ">Seputar Kami</h1>
          <div className="font-thin">Testimoni</div>
          <div className="font-thin">Tentang Kami</div>
        </div>
      </div>
      <div className="text-slate-50 text-center md:text-start">
        Copyright © 2019 Bubur Nusantara. All rights reserved.
      </div>
    </footer>
  );
}
