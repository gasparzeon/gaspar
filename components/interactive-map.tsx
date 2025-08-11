"use client"

import { useState } from "react"
import { useTheme } from "@/components/theme-provider"

interface Location {
  city: string
  country: string
  coordinates: [number, number]
  year: string
  description: string
}

const locations: Location[] = [
  {
    city: "Annapolis",
    country: "Maryland, EUA",
    coordinates: [38.9784, -76.4951],
    year: "2012",
    description: "Primeira pista física encontrada",
  },
  {
    city: "Chino",
    country: "Califórnia, EUA",
    coordinates: [34.0122, -117.6889],
    year: "2012",
    description: "QR code em poste telefônico",
  },
  {
    city: "Columbus",
    country: "Geórgia, EUA",
    coordinates: [32.4609, -84.9877],
    year: "2013",
    description: "Coordenadas levaram a biblioteca local",
  },
  {
    city: "Dallas",
    country: "Texas, EUA",
    coordinates: [32.7767, -96.797],
    year: "2012",
    description: "Poster com código em parada de ônibus",
  },
  {
    city: "Paris",
    country: "França",
    coordinates: [48.8566, 2.3522],
    year: "2013",
    description: "Pista encontrada no Louvre",
  },
  {
    city: "Moscou",
    country: "Rússia",
    coordinates: [55.7558, 37.6176],
    year: "2014",
    description: "Coordenadas na Praça Vermelha",
  },
  {
    city: "Seul",
    country: "Coréia do Sul",
    coordinates: [37.5665, 126.978],
    year: "2013",
    description: "Código em estação de metrô",
  },
  { city: "Tóquio", country: "Japão", coordinates: [35.6762, 139.6503], year: "2014", description: "Pista em Okinawa" },
]

export function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const { theme } = useTheme()

  return (
    <div
      className={`p-6 rounded-lg border ${
        theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
      }`}
    >
      <h3 className="font-mono text-lg mb-4">Mapa de Localizações Físicas</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Lista de Localizações */}
        <div className="space-y-2">
          <h4 className="font-mono text-sm mb-3 opacity-80">Locais onde pistas foram encontradas:</h4>
          {locations.map((location, index) => (
            <button
              key={index}
              onClick={() => setSelectedLocation(location)}
              className={`w-full text-left p-3 font-mono text-sm rounded border transition-all ${
                selectedLocation === location
                  ? theme === "dark"
                    ? "border-green-400 bg-green-400/10"
                    : "border-green-600 bg-green-600/10"
                  : theme === "dark"
                    ? "border-green-400/20 hover:border-green-400/50"
                    : "border-green-600/20 hover:border-green-600/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{location.city}</span>
                <span className="text-xs opacity-60">{location.year}</span>
              </div>
              <div className="text-xs opacity-80">{location.country}</div>
            </button>
          ))}
        </div>

        {/* Detalhes da Localização */}
        <div>
          {selectedLocation ? (
            <div
              className={`p-4 rounded border ${
                theme === "dark" ? "bg-black/50 border-green-400/10" : "bg-white border-green-600/10"
              }`}
            >
              <h4 className="font-mono text-lg font-bold mb-2">{selectedLocation.city}</h4>
              <p className="font-mono text-sm opacity-80 mb-2">{selectedLocation.country}</p>
              <p className="font-mono text-sm mb-3">{selectedLocation.description}</p>
              <div className="font-mono text-xs opacity-60">
                <p>Ano: {selectedLocation.year}</p>
                <p>
                  Coordenadas: {selectedLocation.coordinates[0]}, {selectedLocation.coordinates[1]}
                </p>
              </div>
            </div>
          ) : (
            <div
              className={`p-4 rounded border text-center ${
                theme === "dark" ? "bg-black/50 border-green-400/10" : "bg-white border-green-600/10"
              }`}
            >
              <p className="font-mono text-sm opacity-60">Selecione uma localização para ver detalhes</p>
            </div>
          )}

          {/* Estatísticas */}
          <div
            className={`mt-4 p-4 rounded border ${
              theme === "dark" ? "bg-black/30 border-green-400/10" : "bg-white border-green-600/10"
            }`}
          >
            <h4 className="font-mono text-sm mb-2">Estatísticas:</h4>
            <div className="font-mono text-xs space-y-1 opacity-80">
              <p>• Total de localizações: {locations.length}</p>
              <p>• Países envolvidos: {new Set(locations.map((l) => l.country.split(",")[1] || l.country)).size}</p>
              <p>• Período ativo: 2012-2014</p>
              <p>• Continentes: 4 (América, Europa, Ásia, Oceania)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
