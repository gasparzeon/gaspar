"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useTheme } from "@/components/theme-provider"
import { HackerTools } from "@/components/hacker-tools"
import { CipherDecoder } from "@/components/cipher-decoder"
import { InteractiveMap } from "@/components/interactive-map"

export default function FuncoesPage() {
  const { theme } = useTheme()

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-mono text-3xl md:text-4xl font-bold mb-8 text-center">Funções Hacker</h1>

          <div className="mb-8">
            <div
              className={`p-6 rounded-lg border text-center ${
                theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
              }`}
            >
              <p className="font-mono opacity-80">
                Ferramentas essenciais para desenvolvedores, hackers éticos e entusiastas de segurança.
              </p>
              <p className="font-mono text-sm opacity-60 mt-2">
                ⚠️ Use apenas para fins educacionais e testes autorizados
              </p>
            </div>
          </div>

          {/* Ferramentas Principais */}
          <section className="mb-12">
            <HackerTools />
          </section>

          {/* Ferramentas Cicada */}
          <section className="mb-12">
            <h2 className="font-mono text-2xl mb-6">Ferramentas Especializadas</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <CipherDecoder />
              <InteractiveMap />
            </div>
          </section>

          {/* Informações Adicionais */}
          <section>
            <h2 className="font-mono text-2xl mb-6">Recursos Adicionais</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Validadores",
                  description: "CPF, CNPJ, Email e outros documentos",
                  tools: ["CPF", "CNPJ", "Email", "Cartão de Crédito"],
                },
                {
                  title: "Geradores",
                  description: "Dados fictícios para testes",
                  tools: ["Senhas", "Hashes", "UUIDs", "Tokens"],
                },
                {
                  title: "Conversores",
                  description: "Transformação de dados",
                  tools: ["Base64", "URL Encode", "JSON", "Cores"],
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border ${
                    theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
                  }`}
                >
                  <h3 className="font-mono text-lg font-bold mb-3">{category.title}</h3>
                  <p className="font-mono text-sm opacity-80 mb-4">{category.description}</p>
                  <ul className="font-mono text-xs space-y-1 opacity-70">
                    {category.tools.map((tool, i) => (
                      <li key={i}>• {tool}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
