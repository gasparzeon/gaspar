"use client"

import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { CipherDecoder } from "@/components/cipher-decoder"
import { InteractiveMap } from "@/components/interactive-map"

export default function ArtigosPage() {
  const { theme } = useTheme()

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-mono text-3xl md:text-4xl font-bold mb-8 text-center">Cicada 3301: Análise Completa</h1>

          {/* Introdução */}
          <section className="mb-12">
            <div
              className={`p-8 rounded-lg border ${
                theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
              }`}
            >
              <h2 className="font-mono text-2xl mb-6">O Maior Mistério da Internet</h2>
              <p className="font-mono mb-4 opacity-90 leading-relaxed">
                Cicada 3301 é um nome dado a uma organização enigmática que, em seis ocasiões, postou um conjunto de
                quebra-cabeças e jogos de realidade alternativa complexos para possivelmente recrutar decifradores de
                códigos do público. O primeiro quebra-cabeça da internet começou em 5 de janeiro de 2012 no fórum 4chan
                e durou por aproximadamente um mês.
              </p>
              <p className="font-mono mb-4 opacity-90 leading-relaxed">
                Foi chamado de "o enigma mais elaborado e misterioso da era da Internet" e listado, pelo The Washington
                Post, como um dos "5 maiores mistérios não resolvidos da internet", havendo muita especulação quanto à
                sua finalidade.
              </p>
            </div>
          </section>

          {/* Timeline Detalhada */}
          <section className="mb-12">
            <h2 className="font-mono text-2xl mb-6">Cronologia Completa</h2>
            <div className="space-y-6">
              {[
                {
                  date: "5 de Janeiro de 2012",
                  title: "O Primeiro Enigma",
                  description:
                    'Uma imagem aparece no 4chan com a mensagem: "Olá. Estamos procurando indivíduos altamente inteligentes. Para encontrá-los, criamos um teste." A imagem continha dados ocultos que levavam a mais pistas.',
                  details: [
                    "Imagem inicial postada às 21:34 UTC",
                    "Primeira pista resolvida em 4 horas",
                    "Mais de 1000 pessoas participaram",
                    "Duração total: aproximadamente 1 mês",
                  ],
                },
                {
                  date: "5 de Janeiro de 2013",
                  title: "Segunda Rodada",
                  description:
                    "Exatamente um ano depois, uma nova imagem aparece. Esta rodada foi mais complexa, envolvendo coordenadas geográficas reais e pistas físicas espalhadas pelo mundo.",
                  details: [
                    "Pistas físicas em 14 países diferentes",
                    "Uso de QR codes em postes e muros",
                    "Referências a textos antigos e filosofia",
                    "Coordenadas levavam a locais específicos",
                  ],
                },
                {
                  date: "5 de Janeiro de 2014",
                  title: "Terceira Iteração",
                  description:
                    "A terceira e mais complexa rodada. Muitas pistas permaneceram não resolvidas. Esta foi a última rodada oficial conhecida com atividade significativa.",
                  details: [
                    "Maior complexidade criptográfica",
                    "Pistas individualizadas para participantes",
                    "Uso extensivo de esteganografia",
                    "Algumas pistas nunca foram decifradas",
                  ],
                },
                {
                  date: "5 de Janeiro de 2016",
                  title: "Retorno Misterioso",
                  description:
                    "Após dois anos de silêncio, uma nova pista aparece no Twitter. No entanto, a atividade foi limitada e não houve confirmação oficial da autenticidade.",
                  details: [
                    "Pista postada no Twitter oficial",
                    "Menor engajamento da comunidade",
                    "Autenticidade questionada",
                    "Atividade cessou rapidamente",
                  ],
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border ${
                    theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
                  }`}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div
                      className={`md:w-48 p-3 rounded border text-center ${
                        theme === "dark" ? "border-green-400/20 bg-black/30" : "border-green-600/20 bg-white"
                      }`}
                    >
                      <div className="font-mono text-sm font-bold">{event.date}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-mono text-lg font-bold mb-3">{event.title}</h3>
                      <p className="font-mono mb-4 opacity-90">{event.description}</p>
                      <ul className="font-mono text-sm space-y-1 opacity-80">
                        {event.details.map((detail, i) => (
                          <li key={i}>• {detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ferramentas Interativas */}
          <section className="mb-12">
            <h2 className="font-mono text-2xl mb-6">Ferramentas de Análise</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <CipherDecoder />
              <InteractiveMap />
            </div>
          </section>

          {/* Técnicas Criptográficas */}
          <section className="mb-12">
            <h2 className="font-mono text-2xl mb-6">Técnicas Criptográficas Utilizadas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  category: "Cifras Clássicas",
                  techniques: [
                    { name: "Cifra de César", description: "Deslocamento simples de letras no alfabeto" },
                    { name: "Cifra Atbash", description: "Substituição onde A=Z, B=Y, etc." },
                    { name: "Cifra de Vigenère", description: "Cifra polialfabética usando palavra-chave" },
                    { name: "Cifra de Livro", description: "Referências a páginas e linhas de textos específicos" },
                  ],
                },
                {
                  category: "Criptografia Moderna",
                  techniques: [
                    { name: "RSA", description: "Criptografia de chave pública" },
                    { name: "PGP/GPG", description: "Pretty Good Privacy para autenticação" },
                    { name: "Diffie-Hellman", description: "Troca de chaves criptográficas" },
                    { name: "Esteganografia", description: "Ocultação de dados em imagens e arquivos" },
                  ],
                },
                {
                  category: "Matemática e Lógica",
                  techniques: [
                    { name: "Teoria dos Números", description: "Números primos e fatorização" },
                    { name: "Gematria", description: "Numerologia hebraica e valores de letras" },
                    { name: "Quadrados Mágicos", description: "Arranjos matemáticos especiais" },
                    { name: "Autoreferência", description: "Conceitos que se referenciam" },
                  ],
                },
                {
                  category: "Tecnologia",
                  techniques: [
                    { name: "Tor", description: "Rede anônima para comunicação" },
                    { name: "Linux", description: "CDs bootáveis com pistas" },
                    { name: "TCP/IP", description: "Esteganografia em protocolos de rede" },
                    { name: "QR Codes", description: "Códigos bidimensionais em locais físicos" },
                  ],
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border ${
                    theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
                  }`}
                >
                  <h3 className="font-mono text-lg font-bold mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.techniques.map((technique, i) => (
                      <div key={i}>
                        <h4 className="font-mono text-sm font-bold">{technique.name}</h4>
                        <p className="font-mono text-xs opacity-80">{technique.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Referências Culturais */}
          <section className="mb-12">
            <h2 className="font-mono text-2xl mb-6">Referências Culturais e Filosóficas</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  category: "Literatura",
                  items: [
                    "Agrippa (Um livro dos mortos) - William Gibson",
                    "Gödel, Escher, Bach - Douglas Hofstadter",
                    "Liber AL vel Legis - Aleister Crowley",
                    "O Matrimônio do Paraíso e o Inferno - William Blake",
                    "Self-Reliance - Ralph Waldo Emerson",
                    "Mabinogion - Manuscritos galeses",
                  ],
                },
                {
                  category: "Arte e Música",
                  items: [
                    "O Ancião dos Dias - William Blake",
                    "A Senhora de Shalott - John William Waterhouse",
                    "Nabucodonosor - William Blake",
                    "Newton - William Blake",
                    "Johann Sebastian Bach",
                    "M. C. Escher",
                    "Francisco Goya",
                  ],
                },
                {
                  category: "Filosofia",
                  items: [
                    "Carl Jung - Psicologia analítica",
                    "Friedrich Nietzsche - Filosofia existencial",
                    "Søren Kierkegaard - Existencialismo",
                    "Jean-Paul Sartre - Fenomenologia",
                    "Robert Anton Wilson - Filosofia discordiana",
                    "Budismo Zen - Kōans e meditação",
                    "Kabbalah - Misticismo judaico",
                  ],
                },
              ].map((section, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border ${
                    theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
                  }`}
                >
                  <h3 className="font-mono text-lg font-bold mb-4">{section.category}</h3>
                  <ul className="font-mono text-sm space-y-2 opacity-90">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-xs leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Teorias e Especulações */}
          <section className="mb-12">
            <h2 className="font-mono text-2xl mb-6">Teorias sobre a Identidade</h2>
            <div className="space-y-6">
              {[
                {
                  theory: "Agência de Inteligência",
                  probability: "Alta",
                  evidence: [
                    "Recursos financeiros significativos para pistas globais",
                    "Conhecimento avançado em criptografia militar",
                    "Interesse em recrutar talentos em segurança",
                    "Métodos similares aos usados por NSA/CIA",
                  ],
                  counterevidence: [
                    "Falta de confirmação oficial",
                    "Métodos muito públicos para operação secreta",
                    "Referências filosóficas não típicas de agências",
                  ],
                },
                {
                  theory: "Organização Cibernética Privada",
                  probability: "Média",
                  evidence: [
                    "Foco em privacidade e criptografia",
                    "Métodos de recrutamento não convencionais",
                    "Interesse em indivíduos com habilidades específicas",
                    "Uso de tecnologias de anonimato",
                  ],
                  counterevidence: [
                    "Falta de monetização ou produto final",
                    "Nenhuma empresa assumiu responsabilidade",
                    "Escala muito grande para organização privada",
                  ],
                },
                {
                  theory: "Experimento Acadêmico",
                  probability: "Baixa",
                  evidence: [
                    "Referências extensas a literatura e filosofia",
                    "Metodologia estruturada de pesquisa",
                    "Interesse em comportamento coletivo online",
                    "Uso de conceitos de teoria dos jogos",
                  ],
                  counterevidence: [
                    "Recursos muito extensos para projeto acadêmico",
                    "Falta de publicação de resultados",
                    "Duração muito longa para experimento típico",
                  ],
                },
                {
                  theory: "Arte Conceitual/ARG",
                  probability: "Baixa",
                  evidence: [
                    "Elementos artísticos e estéticos elaborados",
                    "Narrativa complexa e envolvente",
                    "Comunidade dedicada de participantes",
                    "Impacto cultural significativo",
                  ],
                  counterevidence: [
                    "Falta de créditos artísticos",
                    "Nenhuma tentativa de monetização",
                    "Escala muito grande para projeto artístico",
                    "Foco técnico muito específico",
                  ],
                },
              ].map((theory, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border ${
                    theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-mono text-lg font-bold">{theory.theory}</h3>
                    <span
                      className={`px-3 py-1 rounded font-mono text-xs ${
                        theory.probability === "Alta"
                          ? "bg-green-400/20 text-green-400"
                          : theory.probability === "Média"
                            ? "bg-yellow-400/20 text-yellow-400"
                            : "bg-red-400/20 text-red-400"
                      }`}
                    >
                      Probabilidade: {theory.probability}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-mono text-sm font-bold mb-2 text-green-400">Evidências A Favor:</h4>
                      <ul className="font-mono text-xs space-y-1 opacity-80">
                        {theory.evidence.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-mono text-sm font-bold mb-2 text-red-400">Evidências Contra:</h4>
                      <ul className="font-mono text-xs space-y-1 opacity-80">
                        {theory.counterevidence.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Impacto e Legado */}
          <section className="mb-12">
            <h2 className="font-mono text-2xl mb-6">Impacto e Legado</h2>
            <div
              className={`p-8 rounded-lg border ${
                theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
              }`}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-mono text-lg font-bold mb-4">Influência Cultural</h3>
                  <ul className="font-mono text-sm space-y-2 opacity-90">
                    <li>• Inspirou documentários e livros</li>
                    <li>• Criou comunidades dedicadas de pesquisadores</li>
                    <li>• Influenciou outros ARGs e puzzles online</li>
                    <li>• Tornou-se símbolo da cultura hacker</li>
                    <li>• Demonstrou poder da colaboração online</li>
                    <li>• Popularizou conceitos de criptografia</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-lg font-bold mb-4">Impacto Técnico</h3>
                  <ul className="font-mono text-sm space-y-2 opacity-90">
                    <li>• Educou milhares sobre criptografia</li>
                    <li>• Promoveu uso de ferramentas de privacidade</li>
                    <li>• Destacou importância da segurança digital</li>
                    <li>• Inspirou desenvolvimento de novas técnicas</li>
                    <li>• Criou interesse em esteganografia</li>
                    <li>• Fomentou discussões sobre anonimato</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-green-400/20">
                <h3 className="font-mono text-lg font-bold mb-4">Citações Notáveis</h3>
                <blockquote className="font-mono text-sm italic opacity-80 mb-4">
                  "Cicada 3301 é provavelmente o puzzle mais elaborado e misterioso da era da internet." - The Guardian
                </blockquote>
                <blockquote className="font-mono text-sm italic opacity-80">
                  "Um dos 5 maiores mistérios não resolvidos da internet." - The Washington Post
                </blockquote>
              </div>
            </div>
          </section>

          {/* Conclusão */}
          <section>
            <div
              className={`p-8 rounded-lg border ${
                theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
              }`}
            >
              <h2 className="font-mono text-2xl mb-6">Conclusão</h2>
              <p className="font-mono mb-4 opacity-90 leading-relaxed">
                Mais de uma década após o primeiro puzzle, Cicada 3301 permanece como um dos maiores mistérios da
                internet. Sua verdadeira identidade, propósito e destino final continuam desconhecidos. O que sabemos é
                que criou um fenômeno cultural único que transcendeu o mundo digital.
              </p>
              <p className="font-mono mb-4 opacity-90 leading-relaxed">
                Independentemente de quem estava por trás dos puzzles, Cicada 3301 conseguiu algo notável: uniu milhares
                de pessoas ao redor do mundo em uma busca colaborativa por conhecimento, demonstrando o poder da
                inteligência coletiva e da curiosidade humana.
              </p>
              <p className="font-mono opacity-90 leading-relaxed">
                O legado de Cicada 3301 vive não apenas nos mistérios não resolvidos, mas na inspiração que continua a
                fornecer para uma nova geração de criptógrafos, hackers e pensadores que valorizam a privacidade, o
                conhecimento e a busca pela verdade.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
