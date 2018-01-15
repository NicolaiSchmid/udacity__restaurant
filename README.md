# Mobile Web Specialist Certification Course
---
## Development
To use this application, generate a GoogleMaps Api key, place it in an environment variable called `GOOGLE_APIKEY`.
Now just run `yarn install` or `npm install` to install the dependencies and fire up the build and a webserver with `gulp development`

## Production build
To build this project for production use, create the same `GOOGLE_APIKEY` environment variable as before, install all nodeJs dependencies and finally build the project with `gulp build`. This copy all the files, includes the API-keys and generates a ServiceWorker inside the `dist/` folder. The files inside there are ready to be deployed.




