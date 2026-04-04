# We are NOT using this one
> great idea, glad it's running. But too much for such a simple site.
> > We are going [buildless](https://www.spicyweb.dev/buildless-modern-development-workflows-are-this-close-to-a-reality/) instead.

(however, I am keeping this because it will no doubt be valuable later)
- another [buildless](https://18alan.space/strawberry/): 
---

To run for development:
 
 ```bash
 % cd <REPO_ROOT>/downquark.ventureCore.DownQuark/src/statics/_qore/v1
 % node ./_build/.bin/tsc --watch
 ```

Make sure **sass** is installed:
```bash
% brew install sass/sass/sass
  # verify
% which sass
```
- then:
```bash
% sass src/styles/_dq.scss _dist/styles/dq.css
```

A good reference:
- https://docs.gerillass.com/
- https://github.com/retrohacker/template/blob/main/index.html
- https://web.dev/new-patterns-for-amazing-apps/
- https://fullystacked.net/posts/linear/

- https://accessiblepalette.com/ <<
- https://keithjgrant.com/posts/2023/04/its-time-to-learn-oklch-color/#how-to-use-oklch