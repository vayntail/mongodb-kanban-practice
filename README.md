# About the app:

Hello! This project has three models: cards, columns, and tabs, to simulate a kanban board.
The front-end is not fully complete, however all API functions work via Postman.

# API functions:

## get:

**/api/tabs/**

- get all tabs

**/api/tabs/:tabId/columns**

- get all columns using tabId

**/api/tabs/:tabId/columns/:columnId/cards**
- get all cards using tabId and columnId

## post:
**/api/tabs/**
- create a new tab
- body: { "name": "" }

**/api/tabs/:tabId/columns**
- create a new column
- body: { "name": "" }

**/api/tabs/:tabId/columns/:columnId/cards**
- create a new card
- body: { "title": "", "content": "" }

## patch:
**/api/tabs/:tabId**
- edit tab name
- body: { "name": "" }

**/api/tabs/:tabId/columns/:columnId**
- edit column name
- body: { "name": "" }

**/api/tabs/:tabId/columns/:columnId/cards/:cardId**
- edit card details
- body: { "title": "", "content": "" }

## delete:

**/api/tabs/:tabId**
- delete tab

**/api/tabs/:tabId/columns/:columnId**
- delete column

**/api/tabs/:tabId/columns/:columnId/cards/:cardId**
- delete card
