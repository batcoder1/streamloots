# Streamloots Card System

Card system with hexagonal Architecture

![Steamloots card System Hexagonal Architecture](./img/hexagonal.jpg)

The code is divided in 3 main layers:

Core or Domain

- Entities: Business Objects
- Repositories: Interfaces to interact with the entities
- Interactors: Business logic, actions that the system can perform.

Application

- DataSources: Outputs of our system implementing repositories and connected to storage systems.
- Controllers: Inputs of our system encapsulating the transport layer. They should trigger the Interactors.
- EmailNotifier: Output of our system implementing NotifierRepository
- DatadogNotifier: Output of our system implementing AnalitycRepository
- GoogleNotifier: Output of our system implementing AnalitycRepository

  Infrastructure:

- MongoDB: The system use respositories to connect with the database
- Email Server(gmail): The system use notifier to send the email
- Notification Server(firebase): The system use notifier to send the notification

## Getting started locally

- Clone the repo
  `git clone https://github.com/wooltar/streamloots`

- Get up
  `docker-compose up`

## Test

- Get up mongoDB
  `docker-compose start mongodb`

- Run tests
  `npm run test`

## Stress test

- Get up
  `docker-compose up`

- Load cards
  `npm run load:cards`

Open another console and execute

`npm run stress`

You can check the result report in `./reports/stress_test_aaammdd.log`

## API

The API Rest documentation

## CARDS

## Get user Cards

Reply with all the cards if the userId of the request is the same as the user who makes the request, otherwise it returns the published letters of the user of the request

### Request

`GET /cards/`

```
curl --request GET 'http://localhost:9091/cards?userId=5fdb251d091c226b9bb59145' \
 --header 'Content-Type: application/json' \
  authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdHJlYW1sb290cy5jb20iLCJ1c2VySWQiOiI1YTUwMTU5MzA4ZjVhODAwMTExZGU3NTkiLCJpYXQiOjE1MTYyMzkwMjJ9.mj8-t--lfImQGg8HoA_9XOvDlunl3YJoPttkIbOHNMU`

```

### Response

HTTP/1.1 200 OK

```
[]
```

or

### Response

HTTP/1.1 200 OK

```
[ {
    id: "5fdb251e6388226b9c700be3",
    rarity: "common",
    name: "EllisLittleBird",
    userId: "5fd9e4e61d07bf42228549ee",
    published: "false",
    limited: 6,
    image: "Cross.jpeg",
  },
  {
    id: "5fdb251e8de0ff6bc0bfd706",
    rarity: "common",
    name: "ManningLittleFox',
    userId: "5fd9e4e6b3f882b667d83805",
    published: "false",
    limited: 5,
    image: "Terry.jpeg",
  },]
```

or

### Response

HTTP/1.1 404 Not Found

```
{
  "error": {
    "code": 404,
    "description": "Not found"
  }
}
```

## Get card

The card is returned if it is published or if it is the owner who makes the request

### Request

`GET /cards/card?id={{id}}`

```
curl --request GET 'http://localhost:9091/cards/card?id=5fdb251e8de0ff6bc0bfd706' \
 --header 'Content-Type: application/json' \
  authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdHJlYW1sb290cy5jb20iLCJ1c2VySWQiOiI1YTUwMTU5MzA4ZjVhODAwMTExZGU3NTkiLCJpYXQiOjE1MTYyMzkwMjJ9.mj8-t--lfImQGg8HoA_9XOvDlunl3YJoPttkIbOHNMU`

```

### Response

HTTP/1.1 200 OK

```
 {
    id: "5fdb251e8de0ff6bc0bfd706",
    rarity: "common",
    name: "ManningLittleFox',
    userId: "5fd9e4e6b3f882b667d83805",
    published: "false",
    limited: 5,
    image: "Terry.jpeg",
  },
```

or

### Response

HTTP/1.1 404 Not Found

```
{
  "error": {
    "code": 404,
    "description": "Not found"
  }
}
```

## Create a Card

### Request

`PUT /cards/card`

```
curl --request PUT 'http://localhost:9091/cards/card' \
 --header 'Content-Type: application/json' \
  authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdHJlYW1sb290cy5jb20iLCJ1c2VySWQiOiI1YTUwMTU5MzA4ZjVhODAwMTExZGU3NTkiLCJpYXQiOjE1MTYyMzkwMjJ9.mj8-t--lfImQGg8HoA_9XOvDlunl3YJoPttkIbOHNMU \
 --data-raw ' {
    rarity: "common",
    name: "ManningLittleFox',
    userId: "5fd9e4e6b3f882b667d83805",
    published: "false",
    limited: 5,
    image: "Terry.jpeg",
  }'
```

### Response

HTTP/1.1 200 OK

```
 {
    id: "5fdb251e8de0ff6bc0bfd706",
    rarity: "common",
    name: "ManningLittleFox',
    userId: "5fd9e4e6b3f882b667d83805",
    published: "false",
    limited: 5,
    image: "Terry.jpeg",
  }
```

## Update a Card

### Request

`PATCH /cards/card`

```
curl --request PUT 'http://localhost:9091/cards/card' \
 --header 'Content-Type: application/json' \
  authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdHJlYW1sb290cy5jb20iLCJ1c2VySWQiOiI1YTUwMTU5MzA4ZjVhODAwMTExZGU3NTkiLCJpYXQiOjE1MTYyMzkwMjJ9.mj8-t--lfImQGg8HoA_9XOvDlunl3YJoPttkIbOHNMU \
 --data-raw ' {
    id: "5fdb251e8de0ff6bc0bfd706",
    rarity: "common",
    name: "ManningLittleFox',
    userId: "5fd9e4e6b3f882b667d83805",
    published: "false",
    limited: 5,
    image: "Terry.jpeg",
  }'
```

### Response

HTTP/1.1 200 OK

```
 {
    id: "5fdb251e8de0ff6bc0bfd706",
    rarity: "common",
    name: "ManningLittleFox',
    userId: "5fd9e4e6b3f882b667d83805",
    published: "false",
    limited: 5,
    image: "Terry.jpeg",
  }
```

or

### Response

HTTP/1.1 404 Not Found

```
{
  "error": {
    "code": 404,
    "description": "Not found"
  }
}
```

## Bulk Cards Publish

### Request

`POST /cards/publish`

```
curl --request POST 'http://localhost:9091/cards/publish' \
 --header 'Content-Type: application/json' \
  authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdHJlYW1sb290cy5jb20iLCJ1c2VySWQiOiI1YTUwMTU5MzA4ZjVhODAwMTExZGU3NTkiLCJpYXQiOjE1MTYyMzkwMjJ9.mj8-t--lfImQGg8HoA_9XOvDlunl3YJoPttkIbOHNMU \
 --data-raw ' ["5fdb251e091c226b9bb59147","5fdb251e8de0ff6bc0bfd701","5fdb251e6388226b9c700be2"]'
```

### Response

HTTP/1.1 200 OK

## Bulk Cards Unpublish

### Request

`POST /cards/unpublish`

```
curl --request POST 'http://localhost:9091/cards/unpublish' \
 --header 'Content-Type: application/json' \
  authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdHJlYW1sb290cy5jb20iLCJ1c2VySWQiOiI1YTUwMTU5MzA4ZjVhODAwMTExZGU3NTkiLCJpYXQiOjE1MTYyMzkwMjJ9.mj8-t--lfImQGg8HoA_9XOvDlunl3YJoPttkIbOHNMU \
 --data-raw ' ["5fdb251e091c226b9bb59147","5fdb251e8de0ff6bc0bfd701","5fdb251e6388226b9c700be2"]'
```

### Response

HTTP/1.1 200 OK

## Pedding Task

```
When the owner retrieves the cards, she will have access to the following statistics: For each card, the total number of cards obtained and the total number of cards used by all the users.`
When another user retrieves the cards, she will have access to the following statistics: For each card, the total number of cards obtained and the total number of cards used by herself.
```

## Possible Solution

To perform this task, I would create a collection called `Transactions`, that would keep every operation performed with each card. In this collection We could keed the cardId, el owner of the card(userFrom), the user to receive the card(userTo) and the transaction price, after that we would have to update the balance of the user accounts.
To resolve the task we can get the data from this collection.
