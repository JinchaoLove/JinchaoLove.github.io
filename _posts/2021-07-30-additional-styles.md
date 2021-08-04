---
title: TeXt - Additional Styles
key: 20210801
tags: TeXt
---

Alert, Tag, Image, Extensions.
<!--more-->

Success!
{:.success}

`success`{:.success} `info`{:.info} `warning`{:.warning} `error`{:.error}

<div class="grid-container">
<div class="grid grid--p-3">
<div class="cell cell--12 cell--md-5 cell--lg-4" markdown="1">
![Image](https://raw.githubusercontent.com/kitian616/jekyll-TeXt-theme/master/docs/assets/images/image.jpg "Image_rounded"){:.rounded}
</div>
<div class="cell cell--12 cell--md-5 cell--lg-4" markdown="1">
![Image](https://raw.githubusercontent.com/kitian616/jekyll-TeXt-theme/master/docs/assets/images/image.jpg "Image_circle+shadow"){:.circle.shadow}
</div>
</div>
</div>

<div class="grid-container">
<div class="grid grid--p-1">
<div class="cell cell--6 cell--md-4 cell--lg-2">
<div class="button button--success button--pill my-2"><i class="fas fa-space-shuttle"></i> CLICK ME</div>
</div>
<div class="cell cell--6 cell--md-4 cell--lg-2">
<div class="button button--outline-info button--pill my-2"><i class="fas fa-space-shuttle"></i> CLICK ME</div>
</div>
<div class="cell cell--6 cell--md-4 cell--lg-2">
<div class="button button--warning button--rounded my-2"><i class="fas fa-user-astronaut"></i> CLICK ME</div>
</div>
<div class="cell cell--6 cell--md-4 cell--lg-2">
<div class="button button--outline-error button--rounded my-2"><i class="fas fa-user-astronaut"></i> CLICK ME</div>
</div>
</div>
</div>


[Documentation](https://tianqi.name/jekyll-TeXt-theme/docs/en/additional-styles)

## Alert

Success Text.
{:.success}

Info Text.
{:.info}

Warning Text.
{:.warning}

Error Text.
{:.error}

## Tag

`success`{:.success}

`info`{:.info}

`warning`{:.warning}

`error`{:.error}

## Image

| `Border` | `Shadow` |
| ---- | ---- |
| ![Image](https://raw.githubusercontent.com/kitian616/jekyll-TeXt-theme/master/docs/assets/images/image.jpg "Image_border"){:.border} | ![Image](https://raw.githubusercontent.com/kitian616/jekyll-TeXt-theme/master/docs/assets/images/image.jpg "Image_shadow"){:.shadow} |

| `Rounded` | `Circle` |
| ---- | ---- |
| ![Image](https://raw.githubusercontent.com/kitian616/jekyll-TeXt-theme/master/docs/assets/images/image.jpg "Image_rounded"){:.rounded} | ![Image](https://raw.githubusercontent.com/kitian616/jekyll-TeXt-theme/master/docs/assets/images/image.jpg "Image_circle"){:.circle} |

### Mixture

| `Border+Rounded` | `Circle+Shadow` |
| ---- | ---- |
| ![Image](https://raw.githubusercontent.com/kitian616/jekyll-TeXt-theme/master/docs/assets/images/image.jpg "Image_border+rounded"){:.border.rounded} | ![Image](https://raw.githubusercontent.com/kitian616/jekyll-TeXt-theme/master/docs/assets/images/image.jpg "Image_circle+shadow"){:.circle.shadow} |

| `Rounded+Shadow` | `Circle+Border+Shadow` |
| ---- | ---- |
| ![Image](https://raw.githubusercontent.com/kitian616/jekyll-TeXt-theme/master/docs/assets/images/image.jpg "Image_rounded+shadow"){:.circle.rounded.shadow} | ![Image](https://raw.githubusercontent.com/kitian616/jekyll-TeXt-theme/master/docs/assets/images/image.jpg "Image_circle+border+shadow"){:.circle.border.shadow}

## Extensions
With the help of extensions, you can easily add **audios**, **videos**, **slides** and **demos** in your posts.

### Audio

#### SoundCloud

<div>{%- include extensions/soundcloud.html id='313627932' -%}</div>

#### Netease Cloud Music (网易云音乐)

Available in Chinese mainland.

<div>{%- include extensions/netease-cloud-music.html id='413812448' -%}</div>

### Video

#### YouTube

<div>{%- include extensions/youtube.html id='wbY97-hdD5c' -%}</div>

#### TED

<div>{%- include extensions/ted.html id='emily_esfahani_smith_there_s_more_to_life_than_being_happy' -%}</div>

#### bilibili (哔哩哔哩)

<div>{%- include extensions/bilibili.html id='11091080' -%}</div>


### Slide

#### SlideShare

<div>{%- include extensions/slideshare.html id='u9L9zDsqEWNKE1' -%}</div>

### Demos

#### CodePen

<div>{%- include extensions/codepen.html user='kitian616' hash='aQmWZG' default_tab='html,result' -%}</div>

## Extra

| Name | Description |
| ---- | ---- |
| Spacing | [Doc](https://tianqi.name/jekyll-TeXt-theme/docs/en/spacing) |
| Grid | [Doc](https://tianqi.name/jekyll-TeXt-theme/docs/en/grid) |
| Icons | [Doc](https://tianqi.name/jekyll-TeXt-theme/docs/en/icons) |
| Image | [Doc](https://tianqi.name/jekyll-TeXt-theme/docs/en/image) |
| Button | [Doc](https://tianqi.name/jekyll-TeXt-theme/docs/en/button) |
| Item | [Doc](https://tianqi.name/jekyll-TeXt-theme/docs/en/item) |
| Card | [Doc](https://tianqi.name/jekyll-TeXt-theme/docs/en/card) |
| Hero | [Doc](https://tianqi.name/jekyll-TeXt-theme/docs/en/hero) |
| Swiper | [Doc](https://tianqi.name/jekyll-TeXt-theme/docs/en/swiper) |
