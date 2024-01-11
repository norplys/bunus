export default function Contact(){
    return(
        <section className="grid justify-center items-center bg-slate-100 py-16 gap-5">
            <h1 className="font-bold text-5xl justify-self-center">Hubungi Kami</h1>
            <p className="max-w-3xl text-center">Halo pelanggan tersayang bubur ayam kampung nusantara ! ada kritik, keluhan, saran, atau pertanyaan ? hubungi kami melalui form dibawah ini</p>
            <div className="flex justify-between mt-5">
                <form className="flex flex-col gap-5 min-w-96">
                    <input type="text" placeholder="Nama" className="border-2 border-primary-orange rounded-xl px-3 py-1 w-full"/>
                    <input type="text" placeholder="Email" className="border-2 border-primary-orange rounded-xl px-3 py-1 w-full"/>
                    <textarea placeholder="Pesan" className="border-2 border-primary-orange rounded-xl px-3 py-1 w-full h-40"></textarea>
                    <button className="py-1 px-3 font-bold rounded-xl mb-4 w-fit bg-primary-cyan shadow-xl text-white text-lg scale-95 hover:shadow-2xl hover:scale-100 duration-300">Kirim Pesan</button>
                </form>
                <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9896283388084!2d106.7146518768642!3d-6.132095060125373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d4011a5293f%3A0x3af5a7556c06e77!2sBubur%20Ayam%20Kampung%20Nusantara!5e0!3m2!1sid!2sid!4v1704983161177!5m2!1sid!2sid" width="600" height="450"  allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-72 h-72 shadow-2xl hover:shadow-none hover:scale-95 duration-300"></iframe>
                </div>
            </div>
        </section>
    )
}