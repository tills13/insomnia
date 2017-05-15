const path = require("path");
const pkg = require("../app/package.json");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    context: path.join(__dirname, "../app"),
    entry: [
        "./renderer.js",
        "./renderer.html"
    ],
    output: {
        path: path.join(__dirname, "../build"),
        filename: "bundle.js",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["babel-loader", "awesome-typescript-loader"],
                exclude: [/node_modules/, /__fixtures__/, /__tests__/]
            },
            {
                test: /\.jsx?$/,
                use: ["babel-loader"],
                exclude: [/node_modules/, /__fixtures__/, /__tests__/]
            },
            {
                test: /\.(less|css)$/,
                use: [
                    "style-loader",
                    { loader: "css-loader", options: { importLoaders: 1 } },
                    { loader: "less-loader", options: { noIeCompat: true } }
                ]
            },
            {
                test: /\.(html|woff2)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.(png)$/,
                loader: "url-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        mainFields: ["webpack", "browser", "web", "browserify", ["jam", "main"], "main"]
    },
    externals: [
        ...Object.keys(pkg.dependencies),
        "file", "system"
    ],
    plugins: [],
    target: "electron-renderer"
};
