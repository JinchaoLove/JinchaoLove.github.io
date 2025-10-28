<div align="center">

# Academic Chirpy Theme

A minimal, responsive, and feature-rich Jekyll theme for academics and technical writing.

</div>

## TODO

- [ ] Show or hide TOC with same methods like sidebar

## Features

<details>
  <summary>
    <i>Click to view features</i>
  </summary>
  <p>

- Style
  - Dark / Light Theme Mode
  - Dark / Light Mode Images
  - Localized UI language
- Modules
  - BibTex Bibliography
  - Built-in Search with Shortcut Keys
  - Table of Contents
  - Code Syntax Highlighting
  - Embed Jupyter Notebook
  - Mathematical Expressions
  - Mermaid Diagram & Flowchart
  - Mindmap
  - Embed Media
  - Comment Systems
- Blog
  - Pinned Posts
  - Hierarchical Categories
  - Trending Tags
  - Last Modified Date of Posts
- Others
  - Atom Feeds
  - Google Analytics
  - SEO & Performance Optimization

  </p>

</details>

## Build

1. Upgrade by comparing changes in the [chirpy][chirpy] theme:

    <https://github.com/cotes2020/jekyll-theme-chirpy/compare/13bf51e..master>

2. Install or update [Node.js][nodejs], [Ruby Gem][ruby], and [imagemagick][imagemagick], then run:

    ```sh
    gem install --user-install bundler jekyll html-proofer
    ```

3. Install the dependencies:

    ```sh
    # rm -rf ./**/node_modules && jekyll clean  # clean
    pip3 install jupyter
    npm i && npm run build  # build js assets
    bundle  # install jekyll packages
    ```

4. Local preview:

    ```sh
    bash tools/run  # then visit http://127.0.0.1:4000/, press `F12` to debug
    ```

5. Test

    ```sh
    bash tools/test
    ```

## Deploy

- To deploy in [Github Pages][github_pages]:

  - Fork or upload the repository to Github
  - `Settings` > `Pages` > select the `Branch` to `master` or your branch

- To deploy in [Vercel][vercel], add new project, import the repository, then configure with:

  - `Framework Preset`: `Jekyll`
  - `Build and Output Settings` > OVERRIDE `Build Command`:

    ```sh
    bash tools/build
    ```

## Credits

This theme is mainly modified from [Chirpy Jekyll Theme][chirpy], and built with [Jekyll][jekyllrb] ecosystem, [Bootstrap][bootstrap], [Font Awesome][icons] and some other [wonderful tools][lib].

<!-- Links -->
[nodejs]: https://nodejs.org/
[ruby]: https://jekyllrb.com/docs/installation/
[html_proofer]: https://github.com/gjtorikian/html-proofer
[imagemagick]: https://imagemagick.org/script/download.php
[chirpy]: https://github.com/cotes2020/jekyll-theme-chirpy/wiki/
[jekyllrb]: https://jekyllrb.com/
[bootstrap]: https://getbootstrap.com/
[icons]: https://fontawesome.com/v6/icons/
[lib]: https://github.com/cotes2020/chirpy-static-assets/
[github_pages]: https://pages.github.com/
[vercel]: https://vercel.com/
