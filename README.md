# Star Food (Senior JS + SCSS Architecture)

This project is your original **Star Food / Coffee** static site, refactored into a **Vite** app with a **feature-based architecture** (React/Angular-style thinking, but on pure JS).

## Run

```bash
npm i
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Folder structure

```
public/
  img/                 # static images (served as /img/...)

src/
  main.js              # entrypoint

  app/
    bootstrap.js       # starts app + features
    config.js          # selectors, keys, constants
    runtime.js         # lifecycle + disposables

  core/                # shared infrastructure
    container.js       # DI container
    store.js           # tiny state store
    eventBus.js        # pub/sub
    dom.js             # safe DOM helpers
    disposables.js     # cleanup helpers
    storage.js         # localStorage wrapper
    logger.js          # logging

  features/            # isolated feature modules
    navbar/
    swipers/
    tabs/
    scrollTop/
    theme/

  styles/
    abstracts/         # variables, mixins
    base/              # reset, base tags
    layout/            # header/footer/layout
    components/        # reusable UI pieces
    pages/             # page/section styles
    main.scss          # aggregates all SCSS
```

## How to add a new feature

1. Create `src/features/myFeature/myFeature.feature.js` (init function)
2. Export it from `src/features/myFeature/index.js`
3. Register it in `src/app/bootstrap.js`

Each feature returns a **disposable cleanup** function (unsubscribe listeners, destroy sliders, etc.)
