import PuzzleArena from "../components/PuzzleArena";

export default function Hero() {
  return (
    <>
      <div className="relative flex justify-between items-center h-screen">
        <div className="w-[50vw] h-screen px-10 ">
          <div className=" mt-25">
            <span className="inline-block font-headings leading-tight text-6xl">
              A new way to
              <span className="bg-amber-300 px-2">code</span>
              <br></br> &<span className="bg-amber-300 px-2">learn</span>
              together
            </span>
            <span className="mt-4 font-body inline-block max-w-170 text-lg leading-relaxed tracking-wide color-text">
              A real-time collaborative IDE powered by AI, enabling teams to{" "}
              <br />
              code, communicate, and build together with integrated chat and
              video.
            </span>
            <div className="mt-7">
              <button className="px-6 py-3 rounded-xl bg-surface text-white text-sm font-semibold hover:bg-elevated">
                Get started
              </button>
              <button className="ml-4 px-6 py-3 rounded-xl border border-elevated/30 text-sm hover:border-surface/60 hover:bg-white">
                Learn more
              </button>
            </div>
          </div>
          <div className="flex gap-28 mt-13 ml-1 ">
            <div>
              <span className="text-3xl font-bold text-surface">650+</span>
              <span className="block text-sm text-gray-600">Students reached</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-surface">100K+</span>
              <span className="block text-sm text-gray-600">Lines Coded</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-surface">10+</span>
              <span className="block text-sm text-gray-600">Instructors</span>
            </div>
          </div>
        </div>
        <div className="w-[50vw] h-[80vh] flex items-center justify-center p-10 -mt-10">
            <PuzzleArena />
        </div> 
      </div>
    </>
  );
}
