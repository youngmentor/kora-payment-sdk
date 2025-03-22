import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import pkg from "./package.json" assert { type: "json" };

export default [
  // UMD build for browsers
  {
    input: "index.js",
    output: {
      name: "KoraPayment",
      file: pkg.main,
      format: "umd",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-env"],
        exclude: "node_modules/**",
      }),
      terser(),
    ],
  },
  // ESM build for modern browsers and bundlers
  {
    input: "index.js",
    output: {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        presets: [["@babel/preset-env", { targets: { esmodules: true } }]],
        exclude: "node_modules/**",
      }),
    ],
  },
  // Type Declarations
  {
    input: "index.d.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];
