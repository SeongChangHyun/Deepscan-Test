## Getting started

```bash
# clone the project

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9527.

## Build

```bash
# build for test environment
npm run build:sit

# build for production environment
npm run build:prod
```

## Advanced

```bash
# --report to build with bundle size analytics
npm run build:prod --report

# --generate a bundle size analytics. default: bundle-report.html
npm run build:prod --generate_report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```

## Docker

```bash
# --Docker build:
docker build -f Dockerfile -t tg3_fe .

# --Docker run:
docker run -it -p 80:8000 --rm --name tg3_fe tg3_fe
