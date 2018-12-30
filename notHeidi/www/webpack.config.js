function getStyleUse(bundleFilename) {
    return [
        {
            loader: 'file-loader',
            options: {
                name: bundleFilename,
            },
    },
        {
            loader: 'extract-loader'
        },
        {
            loader: 'css-loader'
        },
        {
            loader: 'sass-loader',
            options: {
                includePaths: ['./node_modules'],
            }
    },
  ];
}
module.exports = [
    {
        entry: './style.scss',
        output: {
            // This is necessary for webpack to compile, but we never reference this js file.
            filename: 'style-bundle.js',
        },
        module: {
            rules: [{
                test: /style.scss$/,
                use: getStyleUse('bundle-style.css')
      }]
        },
  },
    {
        entry: "./app.js",
        output: {
            filename: "bundle-app.js"
        },
        module: {
            loaders: [{
                test: /app.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
      }]
        }
  }
];
