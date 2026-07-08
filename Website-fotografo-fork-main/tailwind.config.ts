import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Adicionados os fallbacks padrão do sistema de navegação
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        work: ["var(--font-work-sans)", "sans-serif"], 
      },
      colors: {
        // Exemplo de paleta customizada 
        cultura: {
          azul: "#2172BE",     // Ex: Azul dos Azulejos Portugueses
          vermelho: "#D9042B", // Ex: Vermelho vibrante de sotaques da ilha
          terracota: "#FC4D04",// Ex: Tons dos casarões históricos
          fundo: "#F8F9FA",    // Cor base para não cansar a leitura
        },
        // Cores de feedback (importantes para o painel de curadoria/validação)
        status: {
          aprovado: "#10B981", // Verde (Imagem aceita)
          rejeitado: "#EF4444",// Vermelho (Imagem recusada)
          analise: "#F59E0B",  // Amarelo/Laranja (Em quarentena)
        }
      },
      spacing: {
        // Cria atalhos de espaçamento. 11 = 44px
        '11': '2.75rem', 
      },
      minHeight: {
        'touch': '44px', // Classe: min-h-touch (Garante a acessibilidade no mobile)
      },
      minWidth: {
        'touch': '44px', // Classe: min-w-touch
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;