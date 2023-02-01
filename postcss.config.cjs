import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

const postcss = {
  plugins: [tailwindcss(), autoprefixer()]
};

export default postcss;
