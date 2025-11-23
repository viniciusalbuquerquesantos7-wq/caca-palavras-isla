import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Word {
  word: string;
  hint: string;
  found: boolean;
}

interface Position {
  row: number;
  col: number;
}

const WORDS_DATA: Omit<Word, "found">[] = [
  { word: "DARALISLAM", hint: '"Mundo que aderiu ao Islã" após Maomé.' },
  { word: "RAMADA", hint: "O nono mês sagrado do calendário Islâmico, dedicado ao jejum e à oração." },
  { word: "SUNITA", hint: "Muçulmano que segue a tradição da Sunnah e representa a maioria do Islã." },
  { word: "ALCORAO", hint: "Livro sagrado do Islã, revelado a Maomé." },
  { word: "CALIFA", hint: "Título dado ao líder político e religioso que sucedeu Maomé." },
  { word: "ALAH", hint: "Nome de Deus na religião islâmica." },
  { word: "SHARIA", hint: "Conjunto de leis islâmicas baseadas no Alcorão e na tradição." },
  { word: "HIJAZ", hint: "Espaço geográfico onde temos a de criação do Islã, engloba Meca e Medina." },
];

// Detectar tamanho da tela
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// Tamanho da grade varia conforme o dispositivo
const getGridSize = (isMobile: boolean) => isMobile ? 12 : 18;

const DIRECTIONS = [
  { dr: 0, dc: 1 },   // horizontal direita
  { dr: 0, dc: -1 },  // horizontal esquerda
  { dr: 1, dc: 0 },   // vertical baixo
  { dr: -1, dc: 0 },  // vertical cima
  { dr: 1, dc: 1 },   // diagonal baixo-direita
  { dr: -1, dc: -1 }, // diagonal cima-esquerda
  { dr: 1, dc: -1 },  // diagonal baixo-esquerda
  { dr: -1, dc: 1 },  // diagonal cima-direita
];

// Caracteres com acentos para preencher a grade
const ACCENTED_CHARS = "AÀÁÂÃÄÅEÈÉÊËIÌÍÎÏOÒÓÔÕÖUÙÚÛÜÇÑ";

function generateGrid(words: string[], gridSize: number): string[][] {
  const grid: string[][] = Array(gridSize).fill(null).map(() => 
    Array(gridSize).fill("")
  );

  // Função para verificar se a palavra cabe na posição
  const canPlaceWord = (word: string, row: number, col: number, dir: { dr: number; dc: number }): boolean => {
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dir.dr;
      const newCol = col + i * dir.dc;
      
      if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize) {
        return false;
      }
      
      if (grid[newRow][newCol] !== "" && grid[newRow][newCol] !== word[i]) {
        return false;
      }
    }
    return true;
  };

  // Função para colocar a palavra na grade
  const placeWord = (word: string, row: number, col: number, dir: { dr: number; dc: number }) => {
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dir.dr;
      const newCol = col + i * dir.dc;
      grid[newRow][newCol] = word[i];
    }
  };

  // Tentar colocar cada palavra
  for (const word of words) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

      if (canPlaceWord(word, row, col, dir)) {
        placeWord(word, row, col, dir);
        placed = true;
      }
      attempts++;
    }
  }

  // Preencher células vazias com letras aleatórias
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === "") {
        grid[i][j] = ACCENTED_CHARS[Math.floor(Math.random() * ACCENTED_CHARS.length)];
      }
    }
  }

  return grid;
}

export default function Home() {
  const isMobile = useIsMobile();
  const gridSize = getGridSize(isMobile);
  
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedCells, setSelectedCells] = useState<Position[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  useEffect(() => {
    generateNewGame();
  }, [gridSize]);

  const generateNewGame = () => {
    const wordList = WORDS_DATA.map(w => w.word);
    const newGrid = generateGrid(wordList, gridSize);
    setGrid(newGrid);
    setWords(WORDS_DATA.map(w => ({ ...w, found: false })));
    setSelectedCells([]);
    setFoundWords([]);
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isSelecting) return;
    
    const lastCell = selectedCells[selectedCells.length - 1];
    if (!lastCell) return;

    // Verificar se está na mesma linha, coluna ou diagonal
    const rowDiff = row - selectedCells[0].row;
    const colDiff = col - selectedCells[0].col;
    
    if (rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff)) {
      setSelectedCells(prev => {
        const newCells = [prev[0]];
        const dr = rowDiff === 0 ? 0 : rowDiff > 0 ? 1 : -1;
        const dc = colDiff === 0 ? 0 : colDiff > 0 ? 1 : -1;
        const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
        
        for (let i = 1; i <= steps; i++) {
          newCells.push({
            row: prev[0].row + i * dr,
            col: prev[0].col + i * dc
          });
        }
        return newCells;
      });
    }
  };

  const handleMouseUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);

    // Verificar se a seleção forma uma palavra
    const selectedWord = selectedCells.map(pos => grid[pos.row][pos.col]).join("");
    const selectedWordReverse = selectedWord.split("").reverse().join("");

    const foundWord = words.find(w => 
      !w.found && (w.word === selectedWord || w.word === selectedWordReverse)
    );

    if (foundWord) {
      setWords(prev => prev.map(w => 
        w.word === foundWord.word ? { ...w, found: true } : w
      ));
      setFoundWords(prev => [...prev, foundWord.word]);
    }

    setSelectedCells([]);
  };

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some(pos => pos.row === row && pos.col === col);
  };

  const progress = words.filter(w => w.found).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-2 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
            <div className="text-2xl sm:text-3xl md:text-4xl">🌙</div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-emerald-900 mb-1 sm:mb-2">
            Caça-Palavras do Islã
          </h1>
          <p className="text-xs sm:text-sm md:text-lg text-emerald-700 mb-3 sm:mb-4 md:mb-6">
            Encontre as palavras relacionadas à História do Islã
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-3 sm:mb-4">
            <div className="flex justify-between text-xs sm:text-sm text-emerald-700 mb-1 sm:mb-2">
              <span>Progresso</span>
              <span>{progress}/{words.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
              <div 
                className="bg-emerald-500 h-2 sm:h-3 rounded-full transition-all duration-300"
                style={{ width: `${(progress / words.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8">
          {/* Grid Section */}
          <div className="lg:col-span-2">
            <Card className="p-2 sm:p-3 md:p-6 bg-white shadow-lg">
              <div className="overflow-x-auto">
                <div 
                  className="inline-block min-w-full"
                  onMouseLeave={() => {
                    if (isSelecting) {
                      setIsSelecting(false);
                      setSelectedCells([]);
                    }
                  }}
                >
                  <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
                    {grid.map((row, rowIndex) =>
                      row.map((cell, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`
                            aspect-square flex items-center justify-center text-xs sm:text-xs md:text-sm font-semibold
                            border border-emerald-200 cursor-pointer select-none transition-colors
                            ${isCellSelected(rowIndex, colIndex) 
                              ? "bg-emerald-500 text-white" 
                              : "bg-white text-emerald-900 hover:bg-emerald-50"
                            }
                          `}
                          onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                          onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                          onMouseUp={handleMouseUp}
                        >
                          {cell}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 sm:mt-4 md:mt-6 text-center">
                <Button 
                  onClick={generateNewGame}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm md:text-base py-1 sm:py-2 px-2 sm:px-4"
                >
                  🔄 Gerar Novo Caça-Palavras
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {/* Hints Section */}
            <Card className="p-3 sm:p-4 md:p-6 bg-white shadow-lg">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-900 mb-2 sm:mb-3 md:mb-4">Dicas</h2>
              <div className="space-y-2 sm:space-y-3">
                {words.map((word, index) => (
                  <div key={index} className="flex gap-2 sm:gap-3">
                    <div className={`
                      w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                      ${word.found 
                        ? "border-emerald-500 bg-emerald-500" 
                        : "border-gray-300"
                      }
                    `}>
                      {word.found && (
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs sm:text-sm font-semibold truncate ${word.found ? "text-emerald-600" : "text-gray-700"}`}>
                        {word.word}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{word.hint}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Found Words Section */}
            <Card className="p-3 sm:p-4 md:p-6 bg-white shadow-lg">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-900 mb-2 sm:mb-3 md:mb-4">Palavras Encontradas</h2>
              {foundWords.length === 0 ? (
                <p className="text-gray-500 text-xs sm:text-sm">
                  Nenhuma palavra encontrada ainda...
                  <br /><br />
                  Selecione as letras na grade para encontrar as palavras. Você pode selecionar em qualquer direção!
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {foundWords.map((word, index) => (
                    <span 
                      key={index}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs sm:text-sm font-semibold"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
