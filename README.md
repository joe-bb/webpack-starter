## Description
Webpack starter template for faster web development

## Installation
In your terminal use command **npm install**

Run command **npm run dev -- --watch** to start watching your files

Run command **npm run production** to compile files for production (live site)

## webpack.config.js

Get compiled css after functions are finished, such as; sass compilation, source map extractions for assets (fonts, images, svg, etc).
```javascript
var ExtractTextPlugin = require("extract-text-webpack-plugin");
````

Compile files to push to production, run command in terminal **npm run production** to minify js and css. See package.json **scripts**.
```javascript
var inProduction = (process.env.NODE_ENV === 'production');
````

File names are kept when outputted into the assets folder. If you add new files you want to be built, add the file names here.
```javascript
custom: [
    './build/js/custom.js',
    './build/sass/main.scss'
]
````

Third-party **JS** files are added here. Vendor **CSS** files are added inside **./build/sass/main.scss** file. Importing third party javascript may be accompanied with css make sure its added in the main.scss file. 

Ordering vendors are made from last to first. We add popper.js and jquery before bootstrap.

Add vendors here. They are pulled from **node_modules** folder. Make sure you use the correct folder name if you add extra vendors and initiate **npm install** to avoid errors.
```javascript
vendor: [
    'wowjs',
    'slick-carousel',
    'bootstrap',
    'jquery-smooth-scroll',
    'jquery.scrollto',
    'popper.js'
]
````

Output path is ./assets folder. File names are kept with [name] webpack variable.
```javascript
output: {
    path:  path.resolve(__dirname, './assets'),
    filename: 'js/[name].js'
}
````

Using regex, find any sass and scss files. Compiles css file with extract text plugin. The order of loaders are as follows: sass with source map, resolve-url-loader, then convert to css with css-loader. If that doesn't work (fallback to) inline css with style-loader (added to custom.js file).

Resolve-url-loader: Resolves relative paths in url() statements based on the original source file. Source maps are added to pull and place files used (images, fonts, etc.).

Public path helps css url to be fixed on 'file-loader'. If not added, url wont work inside css/style.css, since it tries to look for images inside the 'css' folder. Instead of ./images/pic.png it will be ../images/pic.png, reaching correct folder.
```javascript
{
    test: /\.s[ac]ss$/,
    use: ExtractTextPlugin.extract({
        use: [
            'css-loader',
            'resolve-url-loader', 
            'sass-loader?sourceMap'
            ],
        fallback: 'style-loader',
        publicPath: './../'
    })
}
````

Adding fonts assets from css into /assets/font/ folder.
```javascript
{
    test: /\.(eot|ttf|woff|woff2)$/,
    loaders: [
        {
            loader: 'file-loader',
            options: {
                name: 'fonts/[name].[ext]'
            }
        }
    ]
}
````

Adding svg assets from css into /assets/svg/ folder.
```javascript
{
    test: /\.(svg)$/,
    loaders: [
        {
            loader: 'file-loader',
            options: {
                name: 'svg/[name].[ext]'
            }
        }
    ]
}
````

Adding image assets from css into /assets/images/ folder.
```javascript
{
    test: /\.(png|jpe?g|gif)$/,
    loaders: [
        {
            loader: 'file-loader',
            options: {
                name: 'images/[name].[ext]'
            }
        },
        'image-webpack-loader'
    ]
}
````

Load js files into vanilla js for the most js browser compatibility.
```javascript
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader"
}
````

Clean the cache on assets folder, deletes folder and renews with assets. Project base folder to find ./assets folder. 

Verbose is logging.
Dry run 'dry' is false.
```javascript
new CleanWebpackPlugin(['assets'], {
    root: __dirname,
    verbose: true,
    dry: false,
})
````

Output is in ./assets in css/style.css
```javascript
new ExtractTextPlugin('css/style.css')
````

Needed for bootstrap to work, adding help scripts.
```javascript
new webpack.ProvidePlugin({
    jQuery: 'jquery',
    Popper: ['popper.js', 'default'],
})
````

Uglify files when webpack production script is used. Minified after extraction, if extracting before, style.css will cause url errors.
```javascript
if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
    module.exports.plugins.push(
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessorOptions: { discardComments: { removeAll: true } }
        })
    );
}
````

## Changelog

**1.0**
* Initial release

##### Copyright

Bundles the following third-party resources:

>HTML5 Shiv, Copyright 2014 Alexander Farkas  
Licenses: MIT/GPL2  
Source: https://github.com/aFarkas/html5shiv  

>jQuery scrollTo, Copyright 2007-2015 Ariel Flesler  
License: MIT  
Source: https://github.com/flesler/jquery.scrollTo  

>normalize.css, Copyright 2012-2016 Nicolas Gallagher and Jonathan Neal  
License: MIT  
Source: https://necolas.github.io/normalize.css/  

>Font Awesome icons, Copyright Dave Gandy  
License: SIL Open Font License, version 1.1.  
Source: http://fontawesome.io/  

>Bootstrap, Copyright Twitter  
License: MIT  
Source: http://getbootstrap.com/  

>WOWjs, Copyright Matthieu Aussaguel  
License: GPLv3  
Source: http://mynameismatthieu.com/WOW/  

>Slick, Copyright (c) 2017 Ken Wheeler  
License: MIT   
Source: http://kenwheeler.github.io/slick/  

>Animate.css, Copyright by Daniel Eden  
License: MIT  
Source: https://daneden.github.io/animate.css/  
