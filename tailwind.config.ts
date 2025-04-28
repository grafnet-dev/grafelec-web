import type { Config } from "tailwindcss"

const config = {
  // darkMode n'est plus configuré ici
  content: [/* gardez votre configuration content existante */],
  
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Utilisez maintenant les variables CSS directement
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        /* ... gardez le reste de votre configuration de couleurs ... */
      },
      // Gardez le reste de votre configuration theme.extend
    },
  },
  // Les plugins sont maintenant importés en CSS
} satisfies Config

export default config
