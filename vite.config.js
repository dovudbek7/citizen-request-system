import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
export default defineConfig({
    plugins: [react()],
    assetsInclude: ["**/*.MOV"],
    resolve: {
        alias: {
            "@": "/src",
            // "@": new URL("./src", import.meta.url).pathname,
        },
    },
});
