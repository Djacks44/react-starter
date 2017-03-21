module.exports = {

  entry: "./app/app.js",

  output: {
    filename: "public/bundle.js"
  },
node: {
  fs: "empty",
  tls: "empty",
  net: "empty"
},
 
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {

          presets: ['react', 'es2015']
        }

      }
    ]
  }
}
