"use client"

import { useState } from "react"
import { withBasePath } from "@/lib/paths"


const slides = [
  {
    id: 1,
    image: "/CGPT_img_1.png",
    description: "Imagem de representação de bumba meu boi do maranhão criada pelo ChatGPT, modelo generativo da OpenAI.",
    content: (
      <p className="text-white/80 text-sm font-sans text-center leading-snug">
        Imagens geradas por IA da cultura maranhense apresentam{" "}
        <span className="font-bold text-orange-300">erros de representação</span>
      </p>
    ),
    author: "ChatGPT",
    authorColor: "bg-[#10A37F]",
  },
  {
    id: 2,
    image: "/CGPT_img_2.png",
    description: "Segunda imagem de representação de bumba meu boi criada pelo ChatGPT.",
    content: (
      <p className="text-white/80 text-sm font-sans text-center leading-snug">
        Imagens geradas por IA da cultura maranhense apresentam{" "}
        <span className="font-bold text-orange-300">erros de representação</span>
      </p>
    ),
    author: "ChatGPT",
    authorColor: "bg-[#10A37F]",
  },
  {
    id: 3,
    image: "/GMN_img_1.png",
    description: "Imagem de representação de bumba meu boi do maranhão criada pelo Gemini, modelo generativo da Google.",
    content: (
      <p className="text-white/80 text-sm font-sans text-center leading-snug">
        Imagens geradas por IA da cultura maranhense apresentam{" "}
        <span className="font-bold text-blue-300">erros de representação</span>
      </p>
    ),
    author: "Gemini",
    authorColor: "bg-[#4285F4]",
  },
  {
    id: 4,
    image: "/GMN_img_2.png",
    description: "Segunda imagem de representação de bumba meu boi criada pelo Gemini.",
    content: (
      <p className="text-white/80 text-sm font-sans text-center leading-snug">
        Imagens geradas por IA da cultura maranhense apresentam{" "}
        <span className="font-bold text-blue-300">erros de representação</span>
      </p>
    ),
    author: "Gemini",
    authorColor: "bg-[#4285F4]",
  },
  {
    id: 5,
    image: "/MDJ_img_1.jpg",
    description: "Imagem de representação de bumba meu boi do maranhão criada pelo Midjourney, modelo generativo da Midjourney, Inc.",
    content: (
      <p className="text-white/80 text-sm font-sans text-center leading-snug">
        Imagens geradas por IA da cultura maranhense apresentam{" "}
        <span className="font-bold text-purple-300">erros de representação</span>
      </p>
    ),
    author: "Midjourney",
    authorColor: "bg-[#7C3AED]",
  },
]

export function Carousel({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const getOffset = (idx: number): number => {
    let offset = idx - activeIndex
    if (offset > slides.length / 2) offset -= slides.length
    if (offset < -slides.length / 2) offset += slides.length
    return offset
  }

  const toPrev = () =>
    setActiveIndex((i) => (i === 0 ? slides.length - 1 : i - 1))
  const toNext = () =>
    setActiveIndex((i) => (i === slides.length - 1 ? 0 : i + 1))

  return (
    <>
      <style>{`@keyframes fadeUp {from { opacity: 0; transform: translateY(10px); } to   { opacity: 1; transform: translateY(0); }}`}</style>

      <div className={`relative w-full select-none ${className ?? ""}`}>
        <div className="relative h-[390px] flex items-center justify-center overflow-hidden">
          {slides.map((slide, idx) => {
            const offset = getOffset(idx)

            if (Math.abs(offset) > 1) return null

            const isCenter = offset === 0

            return (
              <div
                key={slide.id}
                onClick={() => !isCenter && setActiveIndex(idx)}
                style={{
                  position: "absolute",
                  transform: `translateX(${offset * 108}%) translateY(${isCenter ? "24px" : "-8px"}) scale(${isCenter ? 1.12 : 0.83})`,
                  opacity: isCenter ? 1 : 0.42,
                  filter: isCenter ? "none" : "blur(2px)",
                  zIndex: isCenter ? 20 : 10,
                  transition:
                    "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.65s ease, filter 0.65s ease",
                  cursor: isCenter ? "default" : "pointer",
                  pointerEvents: "auto",
                }}
                className="w-[30%] h-[185px] rounded-2xl overflow-hidden border-[2px] border-black/70 shadow-2xl">
                <div className="relative w-full h-full">
                  <img src={withBasePath(slide.image)} alt={slide.description} className="w-full h-full object-cover" draggable={false}/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-2.5 left-2.5">
                    <span
                      className={`px-2.5 py-0.5 ${slide.authorColor} text-white text-[10px] font-semibold rounded-full backdrop-blur-sm border border-white/20`}>
                      {slide.author}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div key={`caption-${activeIndex}`} className="mt-2 px-10 min-h-[2.5rem] flex items-center justify-center" style={{ animation: "fadeUp 0.4s ease both" }}>
          {slides[activeIndex].content}
        </div>
        <div className="flex justify-center items-center gap-2 mt-4">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setActiveIndex(idx)}
              aria-label={`Ir para slide ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ease-in-out ${
                idx === activeIndex ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/35 hover:bg-white/65"}`}/> ))}
        </div>
        <div
          onClick={toPrev}
          aria-label="Slide anterior"
          className="absolute left-0 top-0 w-[30%] h-[85%] z-30 cursor-pointer" />
        <div
          onClick={toNext}
          aria-label="Próximo slide"
          className="absolute right-0 top-0 w-[30%] h-[85%] z-30 cursor-pointer" />
      </div>
    </>
  )
}
