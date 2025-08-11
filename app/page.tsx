"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { LoadingScreen } from "@/components/loading-screen"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useTheme } from "@/components/theme-provider"

export default function HomePage() {
  const [showLoading, setShowLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLoadingComplete = () => {
    setShowLoading(false)
    setTimeout(() => setShowContent(true), 300)
  }

  // Não mostrar loading screen durante SSR
  if (!isClient) {
    return (
      <>
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="font-mono text-4xl md:text-6xl font-bold mb-4">CICADA 3301</h1>
              <p className="font-mono text-lg md:text-xl opacity-80">{"O mistério que cativou a internet"}</p>
            </div>

            <div
              className={`w-32 h-32 mx-auto mb-8 rounded-full border-2 ${
                theme === "dark" ? "border-green-400" : "border-green-600"
              } flex items-center justify-center`}
            >
              <div className="font-mono text-2xl">🦗</div>
            </div>

            <div className="mb-16">
              <div
                className={`max-w-2xl mx-auto p-6 rounded-lg border ${
                  theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
                }`}
              >
                <h2 className="font-mono text-xl mb-4 text-center">Mensagem Criptografada</h2>
                <div className="font-mono text-sm leading-relaxed text-center opacity-80">
                  <p className="mb-2">TIBERIVS CLAVDIVS CAESAR diz</p>
                  <p className="mb-2">"lxxt&gt;33m2mqkyqsuolm"</p>
                  <p className="text-xs opacity-60">Dica: Olhe além da superfície. A verdade está nos padrões.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="font-mono text-2xl mb-6">Você Está Pronto?</h2>
              <p className="font-mono mb-8 opacity-80 max-w-2xl mx-auto">
                Teste seus conhecimentos sobre o enigma mais misterioso da internet. Apenas aqueles que verdadeiramente
                compreendem as profundezas do Cicada 3301 desbloquearão o segredo final.
              </p>

              <Link
                href="/quiz"
                className={`inline-block px-8 py-4 font-mono text-lg border-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "border-green-400 hover:bg-green-400 hover:text-black"
                    : "border-green-600 hover:bg-green-600 hover:text-white"
                }`}
              >
                INICIAR QUIZ
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className={`transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="mb-8">
              <h1 className="font-mono text-4xl md:text-6xl font-bold mb-4 typing-animation">CICADA 3301</h1>
              <p className="font-mono text-lg md:text-xl opacity-80 typing-animation-delay">
                {"O mistério que cativou a internet"}
              </p>
            </div>

            <div
              className={`w-32 h-32 mx-auto mb-8 rounded-full border-2 ${
                theme === "dark" ? "border-green-400" : "border-green-600"
              } flex items-center justify-center cicada-pulse`}
            >
              <div className="font-mono text-2xl">🦗</div>
            </div>
          </section>

          {/* Encrypted Message */}
          <section className="mb-16">
            <div
              className={`max-w-2xl mx-auto p-6 rounded-lg border ${
                theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
              }`}
            >
              <h2 className="font-mono text-xl mb-4 text-center">Mensagem Criptografada</h2>
              <div className="font-mono text-sm leading-relaxed text-center opacity-80">
                <p className="mb-2">TIBERIVS CLAVDIVS CAESAR diz</p>
                <p className="mb-2">"lxxt&gt;33m2mqkyqsuolm"</p>
                <p className="text-xs opacity-60">Dica: Olhe além da superfície. A verdade está nos padrões.</p>
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-mono text-2xl mb-6 text-center">Entre no Mistério</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="font-mono mb-4 opacity-90">
                    Em janeiro de 2012, uma imagem misteriosa apareceu no 4chan que lançaria um dos enigmas mais
                    intrigantes da internet. A imagem continha uma mensagem simples que levaria milhares por uma toca de
                    coelho de criptografia, esteganografia e sabedoria antiga.
                  </p>
                  <p className="font-mono mb-4 opacity-90">
                    Aqueles que resolveram os enigmas iniciais foram conduzidos através de uma complexa rede de pistas
                    que abrangiam os mundos digital e físico. QR codes apareceram em cartazes em grandes cidades. Textos
                    antigos foram referenciados. Cifras complexas foram empregadas.
                  </p>
                </div>
                <div
                  className={`p-6 rounded-lg border ${
                    theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
                  }`}
                >
                  <h3 className="font-mono text-lg mb-3">Elementos Principais:</h3>
                  <ul className="font-mono text-sm space-y-2 opacity-80">
                    <li>• Enigmas criptográficos</li>
                    <li>• Esteganografia em imagens</li>
                    <li>• Coordenadas do mundo físico</li>
                    <li>• Referências à filosofia antiga</li>
                    <li>• Comunicações na deep web</li>
                    <li>• Criptografia PGP</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="font-mono text-2xl mb-6">Você Está Pronto?</h2>
            <p className="font-mono mb-8 opacity-80 max-w-2xl mx-auto">
              Teste seus conhecimentos sobre o enigma mais misterioso da internet. Apenas aqueles que verdadeiramente
              compreendem as profundezas do Cicada 3301 desbloquearão o segredo final.
            </p>

            <Link
              href="/quiz"
              className={`inline-block px-8 py-4 font-mono text-lg border-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "border-green-400 hover:bg-green-400 hover:text-black"
                  : "border-green-600 hover:bg-green-600 hover:text-white"
              }`}
            >
              INICIAR QUIZ
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
