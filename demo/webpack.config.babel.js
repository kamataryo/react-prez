import path from 'path'

export default {
  entry: './preview.jsx',
  output: {
    path: path.join(__dirname, '/'),
    publicPath: '',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [{ loader: 'babel-loader?compact=false' }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [],
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 3000
  }
}
