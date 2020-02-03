# Omni Stack SaaS

SaaS project to user management between projects and companies. For this project was used NodeJS (Adonis), ReactJS and React Native as base technologies, simulating team management application.

## Getting Started

You should have [NodeJS](https://nodejs.org/en/), [Docker](https://www.docker.com/get-started) and [NPM](https://www.npmjs.com/) (NPM normally is installed with NodeJS) installed to use the following steps on Back-end:

- Start up Docker to use the database. The following command is an example of start a docker container without using docker-compose:

```sh
docker container run -v $(pwd)/dtbase:/var/lib/postgresql/data -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=adonis -p 7777:5432 postgres
```

- Inside 'backend' folder, run ```sh npm install && npm run start ``` to install all dependecies and start the project locally.

Front-end and Mobile need different tools and configuration. You should have [YARN](https://yarnpkg.com/) (or NPM as installed before) and [React CLI](https://pt-br.reactjs.org/docs/create-a-new-react-app.html#create-react-app) (create-react-app) and [Expo](https://expo.io/) (Mobile).

- Front-end: Inside 'frontend' folder, run ```sh yarn && yarn start``` to install all dependencies and start the project at port 3000.

- Mobile: Inside 'mobile' folder, run ```sh expo start```and choose the simulator (iOS or Android) which you would like to run the project.

### Web

### Mobile

## Authors

[Gabriel Hahn Schaeffer](https://github.com/gabriel-hahn/) | [Rocketseat Course](https://github.com/Rocketseat)

See also the list of [contributors](https://github.com/gabriel-hahn/omni-stack-saas/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
