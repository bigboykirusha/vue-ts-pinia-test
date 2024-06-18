import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@components": path.resolve(__dirname, "./src/Components"),
			"@store": path.resolve(__dirname, "./src/store"),
			"@UI": path.resolve(__dirname, "./src/Components/UI"),
			"@pages": path.resolve(__dirname, "./src/pages"),
		},
	},
	plugins: [vue()],
});
