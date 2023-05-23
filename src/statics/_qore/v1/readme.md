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
