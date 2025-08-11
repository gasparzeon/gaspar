"use client"

import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"

export default function SobrePage() {
  const { theme } = useTheme()

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-mono text-3xl md:text-4xl font-bold mb-8 text-center">Sobre o Cicada 3301</h1>

          {/* Timeline */}
          <section className="mb-12">
            <h2 className="font-mono text-2xl mb-6">Linha do Tempo</h2>
            <div className="space-y-6">
              {[
                {
                  year: "2012",
                  title: "O Primeiro Enigma",
                  description:
                    'Em 4 de janeiro de 2012, uma imagem misteriosa aparece no 4chan com a mensagem: "Olá. Estamos procurando indivíduos altamente inteligentes."',
                },
                {
                  year: "2013",
                  title: "O Segundo Ciclo",
                  description:
                    "Um novo enigma é lançado, mais complexo que o anterior, envolvendo coordenadas geográficas e pistas físicas ao redor do mundo.",
                },
                {
                  year: "2014",
                  title: "O Terceiro Mistério",
                  description: "O último enigma oficial conhecido, que permanece parcialmente não resolvido até hoje.",
                },
                {
                  year: "2015-Presente",
                  title: "Especulações e Teorias",
                  description:
                    "Diversas teorias surgem sobre a identidade e propósito do grupo, mas nenhuma confirmação oficial.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-4 p-4 rounded-lg border ${
                    theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-mono font-bold ${
                      theme === "dark" ? "border-green-400" : "border-green-600"
                    }`}
                  >
                    {item.year}
                  </div>
                  <div>
                    <h3 className="font-mono text-lg font-bold mb-2">{item.title}</h3>
                    <p className="font-mono opacity-80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Symbols and Methods */}
          <section className="mb-12">
            <h2 className="font-mono text-2xl mb-6">Símbolos e Métodos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-lg border ${
                  theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
                }`}
              >
                <h3 className="font-mono text-lg mb-4">Criptografia Utilizada</h3>
                <ul className="font-mono text-sm space-y-2 opacity-80">
                  <li>
                    • <strong>Cifra de César:</strong> Cifra de deslocamento simples
                  </li>
                  <li>
                    • <strong>Cifra de Vigenère:</strong> Cifra polialfabética
                  </li>
                  <li>
                    • <strong>Cifra de Livro:</strong> Referências a textos específicos
                  </li>
                  <li>
                    • <strong>Criptografia PGP:</strong> Criptografia de chave pública
                  </li>
                  <li>
                    • <strong>Esteganografia:</strong> Mensagens ocultas em imagens
                  </li>
                </ul>
              </div>

              <div
                className={`p-6 rounded-lg border ${
                  theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
                }`}
              >
                <h3 className="font-mono text-lg mb-4">Símbolos Recorrentes</h3>
                <ul className="font-mono text-sm space-y-2 opacity-80">
                  <li>
                    • <strong>Cicada:</strong> O símbolo principal do grupo
                  </li>
                  <li>
                    • <strong>Runas:</strong> Alfabeto rúnico antigo
                  </li>
                  <li>
                    • <strong>Ouroboros:</strong> Serpente que morde a própria cauda
                  </li>
                  <li>
                    • <strong>3301:</strong> Número primo significativo
                  </li>
                  <li>
                    • <strong>Gematria:</strong> Numerologia hebraica
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Theories */}
          <section className="mb-12">
            <h2 className="font-mono text-2xl mb-6">Teorias e Especulações</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Recrutamento de Hackers",
                  description:
                    "A teoria mais aceita é que o Cicada 3301 seja um teste de recrutamento para uma organização que busca indivíduos com habilidades excepcionais em criptografia e hacking.",
                },
                {
                  title: "Projeto Governamental",
                  description:
                    "Alguns especulam que seja uma operação de agências de inteligência como NSA ou CIA para identificar talentos em segurança cibernética.",
                },
                {
                  title: "Experimento Social",
                  description:
                    "Pode ser um estudo sobre comportamento coletivo na internet e como comunidades se formam em torno de mistérios complexos.",
                },
                {
                  title: "Arte Conceitual",
                  description:
                    "Uma forma de arte digital que explora temas de privacidade, anonimato e a natureza da informação na era digital.",
                },
              ].map((theory, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
                  }`}
                >
                  <h3 className="font-mono text-lg font-bold mb-2">{theory.title}</h3>
                  <p className="font-mono opacity-80">{theory.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Impact */}
          <section>
            <h2 className="font-mono text-2xl mb-6">Impacto Cultural</h2>
            <div
              className={`p-6 rounded-lg border ${
                theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
              }`}
            >
              <p className="font-mono mb-4 opacity-90">
                O Cicada 3301 transcendeu seu status de simples enigma online para se tornar um fenômeno cultural.
                Inspirou documentários, livros, comunidades dedicadas e até mesmo imitadores.
              </p>
              <p className="font-mono mb-4 opacity-90">
                O mistério demonstrou o poder da colaboração online, com milhares de pessoas ao redor do mundo
                trabalhando juntas para decifrar as pistas. Também destacou a importância da privacidade e criptografia
                na era digital.
              </p>
              <p className="font-mono opacity-90">
                Até hoje, a verdadeira identidade e propósito do Cicada 3301 permanecem desconhecidos, mantendo vivo um
                dos maiores mistérios da internet.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
