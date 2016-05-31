# EZ-Compiler

### A fast and easy tool to get your project up and going, then watch it, and build it!

#### How to install:
`npm install -g ez-compiler`

#### How to get started with a project:
1. `npm init` or `npm init -y` (if you're lazy like me)/
2. `ezc create default` OR `ezc create angular1` (with any flags you like. See listed below.)
3. `npm install` to install the preprocessor flags you added
4. `ezc compile` (to watch and automatically compile and build files)

#### Flags for "create":
When you run `ezc create default` OR `ezc create angular1`, you can add flags to use preprocessors, like SASS, LESS, Pug/Jade, Coffeescript, and more. These change the file extensions in the `src` directory to the corresponding file extensions. These are the current flags that exist as of right now. Please don't hesitate to suggest ones that should be added.

- `--stylus` for Stylus
- `--sass` for Sass
- `--scss` for Scss
- `--less` for Less
- `--pug` for Pug/Jade
- `--coffee` for Coffeescript
