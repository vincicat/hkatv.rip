# hkatv.rip

[Source code repository hosted on GitHub](http://github.com/netsgnut/hkatv.rip)

## About

This repository stores the deployed version of [this website](http://hkatv.rip/).

Made with love by [@siuying](http://github.com/siuying) and [@netsgnut](http://github.com/netsgnut).

## How to Deploy?

Currently the website is hosted on [S3](http://aws.amazon.com/s3/) as a static website. One can copy all the files in `public/` to the root of the bucket and start rocking.

Alternatively one can also use the deploy script. It is written in Ruby and assumes [Bundler](http://bundler.io/) and [Rake](https://github.com/ruby/rake) are properly installed and configured.

The necessary dependencies are installed by:

```bash
bundle install
```

Place a `credentials.json` file and put it aside on the same directory with this readme. It should contain `AccessKeyId` and `SecretAccessKey`. Make sure this credential has write permission on the bucket specified at the Rakefile.

Uploading then is all about:

```bash
rake deploy
```

## History

(Some sentimental short paragraphs here... sometime maybe?)

## Acknowledgements

This project uses [Firebase](https://firebase.io/), [polyfill.io](http://polyfill.io/) and [Bliss.js](http://blissfuljs.com/). Hosting service powered by [Amazon Simple Storage Service](https://aws.amazon.com/s3/) and [Cloudflare](https://www.cloudflare.com/).

"tv.css" in public/ folder is derived from [this CodePen project](http://codepen.io/lbebber/pen/XJRdrV) by [Lucas Bebber](http://codepen.io/lbebber). Copyright © 2015 Lucas Bebber.

The current copies of "background.mp4", "preview.jpg", "cover.jpg" in public/ folder are derived from the video found [here](http://tvmost.com.hk/201601121957_video_2016_tenbig_01). Copyright © 2016 TVMOST.COM.HK.
