# San Diego Zoo Hackathon 2019 - Front-end

Global Problem Statement #9

---

# Wildflag

## Problem Statement

Individual NGOs conduct missions independently and discreetly. Discretion is especially important in initiatives that seek to thwart wildlife trafficking and poaching. From covert operations to research, missions can overlap, resulting in mission compromises and conflicts. There’s no standardized, secure method for flagging investigations and the only place for organizations to find each other is through word of mouth and on the ground.

## Motivation

We were inspired by the efforts made by organizations that seek to end wildlife trafficking and poaching, who may wish to avoid conflicts or forge new collaborations in other groups working in the same area. We built a mobile-first web app that can be used on any device to allow organizations to learn when potentially conflicting initiatives could be taking place and contact those interested parties.

## Tech Stack

* [Typescript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [Styled Components](https://www.styled-components.com/)
* [Material UI](https://material-ui.com)
* [Google Maps Platform](https://developers.google.com/maps/documentation)

## Installation

```
Fork the project `https://github.com/sehoven/zoohackathon-2019-fe`

$ git clone git@github.com:<YOUR-USER>/zoohackathon-2019-fe.git
$ cd zoohackathon-2019-fe
$ yarn install
```

## Running the project

1. Create a [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
2. Paste the following text in the `.env` file, replacing `<YOUR_API_KEY>` with the API key you just created
```REACT_APP_GOOGLE_MAPS_API_KEY=<YOUR_API_KEY>```
3. Run the project with the following command
```
$ yarn start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
