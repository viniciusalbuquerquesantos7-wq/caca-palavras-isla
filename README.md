# 🌙 Caça-Palavras do Islã

Sistema interativo de caça-palavras sobre História do Islã com geração dinâmica de grades, dicas e validação de respostas.

## 🎮 Como Jogar

1. **Encontre as palavras**: Clique e arraste sobre as letras na grade para selecionar uma palavra
2. **Direções**: Você pode selecionar palavras em qualquer direção (horizontal, vertical ou diagonal)
3. **Validação**: Quando você encontrar uma palavra correta, ela será marcada como encontrada
4. **Progresso**: Acompanhe seu progresso na barra no topo da página
5. **Novo jogo**: Clique no botão "Gerar Novo Caça-Palavras" para criar uma nova grade

## 📚 Palavras Incluídas

- **DARALISLAM**: "Mundo que aderiu ao Islã" após Maomé
- **RAMADÃ**: O nono mês sagrado do calendário Islâmico
- **SUNITA**: Muçulmano que segue a tradição da Sunnah
- **ALCORAO**: Livro sagrado do Islã
- **CALIFA**: Líder político e religioso que sucedeu Maomé
- **ALAH**: Nome de Deus na religião islâmica
- **SHARIA**: Conjunto de leis islâmicas
- **HIJAZ**: Espaço geográfico da criação do Islã

## 🚀 Tecnologias

- **React 19**: Framework JavaScript para construção da interface
- **TypeScript**: Tipagem estática para maior segurança
- **Tailwind CSS 4**: Framework CSS para estilização
- **Vite**: Build tool rápido e moderno
- **shadcn/ui**: Componentes de UI acessíveis e customizáveis

## 💻 Desenvolvimento Local

### Pré-requisitos

- Node.js 20+
- pnpm 8+

### Instalação

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build
```

## 📦 Deploy no GitHub Pages

Este projeto está configurado para deploy automático no GitHub Pages através do GitHub Actions.

### Configuração

1. Faça fork ou clone este repositório
2. Vá em **Settings** → **Pages**
3. Em **Source**, selecione **GitHub Actions**
4. Faça push para a branch `main`
5. O deploy será feito automaticamente

### URL de Acesso

Após o deploy, seu jogo estará disponível em:
```
https://[seu-usuario].github.io/caca-palavras-isla/
```

## 📝 Estrutura do Projeto

```
caca-palavras-isla/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx          # Página principal do jogo
│   │   ├── components/           # Componentes reutilizáveis
│   │   ├── App.tsx               # Componente raiz
│   │   └── main.tsx              # Entry point
│   └── public/                   # Arquivos estáticos
├── .github/
│   └── workflows/
│       └── deploy.yml            # Workflow de deploy
└── README.md
```

## 🎨 Características

- ✅ Grade 18x18 com letras acentuadas
- ✅ Seleção em todas as direções (8 direções)
- ✅ Validação automática de palavras
- ✅ Barra de progresso visual
- ✅ Dicas com círculos de status
- ✅ Lista de palavras encontradas
- ✅ Geração dinâmica de novas grades
- ✅ Design responsivo para mobile e desktop
- ✅ Interface em português brasileiro

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

Desenvolvido com ❤️ para aprendizado sobre História do Islã
