# EZ-Compiler

### A fast and easy tool to get your project up and going, then watch it, and build it!

#### How to install:
`npm install -g ez-compiler`

#### How to get started with a project:
1. `npm init` or `npm init -y` (If you're lazy like me and want npm to answer all the questions for you)
2. `ezc create default` OR `ezc create angular1` (with any flags you like. See listed below.)<br>
Files will be created in a `./src` directory. The file structures for default and angular1 are shown below<br>
3. `npm install` to install the preprocessor flags you added
4. `ezc compile` (to watch and automatically compile and build files)<br>
Once the files are compiled, they will automatically be put into the `./dist` folder. 
### !!!!Please don't change the directory names. This tool will not work if you change "src" or "dist"!!!!

#### Flags for "create":
When you run `ezc create default` OR ` ezc create angular1`, you can add flags to use preprocessors, like SASS, LESS, Pug/Jade, Coffeescript, and more. These change the file extensions in the `src` directory to the corresponding file extensions. These are the current flags that exist as of right now. Please don't hesitate to suggest ones that should be added.

- `--stylus` for Stylus
- `--sass` for Sass
- `--scss` for Scss
- `--pug` for Pug/Jade
- `--coffee` for Coffeescript
- `--babel` for Babel

#### File Structures:
##### Default
<ul>
    <li>dist
        <ul>
            <li>assets/</li>
            <li>css/
                <ul>
                    <li>style.css</li>
                </ul>
            </li>
            <li>js/
                <ul>
                    <li>app.js</li>
                </ul>
            </li>
            <li>index.html</li>
        </ul>
    </li>
    <li>src
        <ul>
            <li>assets/</li>
            <li>css/
                <ul>
                    <li>style.css</li>
                </ul>
            </li>
            <li>controllers/</li>
            <li>services/</li>
            <li>templates/</li>
            <li>app.js</li>
            <li>index.html</li>
        </ul>
    </li>
</ul>