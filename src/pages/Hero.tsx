export default function Hero() {
  return (
    <>
      <div className="w-[50vw] h-screen px-10 ">
        <div className="h-screen mt-25">
          <span className="inline-block font-headings leading-tight text-6xl">
            A new way to 
            <span className="bg-amber-300 px-2">code</span>
             <br></br> & 
            <span className="bg-amber-300 px-2">learn</span>
              together
          </span>
          <span className="mt-4 font-sans inline-block max-w-155 text-lg leading-relaxed tracking-wide color-text">
            A real-time collaborative IDE powered by AI, enabling teams to <br />
            code, communicate, and build together with integrated chat and video.
          </span>
            <div className="mt-8">
                <button className="px-6 py-3 rounded-xl bg-surface text-white text-sm font-semibold hover:bg-elevated">
                    Get started
                </button>
                <button className="ml-4 px-6 py-3 rounded-xl border border-elevated/30 text-sm hover:border-surface/60 hover:bg-white">
                    Learn more
                </button>
            </div>

        </div>
      </div>
    </>
  );
}
