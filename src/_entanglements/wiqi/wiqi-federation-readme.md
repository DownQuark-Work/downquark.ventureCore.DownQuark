# Federation Wiki
## Quick Start
`% npm install wiki --global-style`
@deprecated: `% npx wiki --data ./dq-data`
> N.B. The wiki packages must to be installed with --global-style to work.

_probably good for local_
`% npx wiki -p 3000 --data ./dq-data -f --autoseed --security_type friends --cookieSecret 'DOWNQUARK_WORK' --session_duration 7`

> https://github.com/fedwiki

## update
`% npm outdated --silent -g | grep '^Package\|^wiki'`
`% npm update`

## with leveldb
`% npm install wiki-storage-leveldb -save # in cur directory`
`% npx wiki --database '{"type": "leveldb"}' --data FILESYSTEM_PATH`

## farm
> any instance on a public port will automatically be treated as a farm
> - still probably what we want to do even though we won't be farming/seeding
> - actually, we should farm and seed individual instances for each project
>   - and internal dq farm
`% npx wiki -p 80 -f # viewable at localhost (with no port)`
- [more info](http://localhost/view/welcome-visitors/view/how-to-wiki/fed.wiki.org/host-a-site)

---
Neighborhood Seeding
Two options are added for seeding a neighborhood.
- When running a server farm --autoseed will populate the neighborhood with the other sites in the farm that have been visited.
- Adding --neighbours 'comma separated list of sites' will add those sites to the neighborhood.

Reference
- [plugins](https://github.com/WardCunningham/assets/tree/master/pages)
  - [more](https://github.com/fedwiki)
    - [installing](http://fed.wiki.org/view/add-plugins)
- [fed logs](http://search.fed.wiki.org:3030/logs)
- [downquark wiki on federation.wiki](http://downquark.federated.wiki/view/entanglement/view/dq-farm/view/search-for-)

Interesting Wikis
- http://ddd.fed.wiki.org/view/welcome-visitors/view/search-for-
- http://metaphor.sfw.c2.com/

---
dev
- [create a wiki](http://mhresources.federated.wiki/view/create-a-wiki)
- [create new page](http://downquark.localhost/view/create-new-page)
- [plugin with frame example](https://github.com/WardCunningham/assets/blob/master/pages/find-empty-pages/empties.html)
  - `import * as frame from 'http://code.fed.wiki/assets/v1/frame.js'`

> ### Security
> > By default wiki will, if we don't configure a security module, make all content read-only.
> > The previous default where unclaimed sites were editable by anybody can be enabled by setting security\_legacy to true.
> - [add security](https://github.com/fedwiki/wiki-security-passportjs/blob/master/docs/configuration.md)
>   - (passport)[#]
>   -  (friends)[https://github.com/fedwiki/wiki-security-friends/blob/master/README.md]


