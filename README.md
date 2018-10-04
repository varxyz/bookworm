# Bookworm
Hobby app built for managing favorite books and tracking your reading progress.

Project built using React, Redux and Firebase. It makes use of a Nodejs server for fetching API data from NYT (for top current books) and subsequent API calls from Goodreads API. Authentication is handled with Firebase.

The project is hosted on Heroku because it allows a nodejs env that the project uses in background. The switch to Heroku hosting was made due to the fact that Github Pages doesn't allow front-end routing. The version of this project running in GH Pages (implemented using some hacky solutions) can be viewed on the `master` branch

[DEMO](https://bkworm.herokuapp.com)

### Getting Started

```
> git clone git@github.com:varxyz/bookworm.git
> cd bookworm
> yarn
> yarn dev
```
