import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

export const postcss = {
  plugins: [tailwindcss(), autoprefixer]
};
