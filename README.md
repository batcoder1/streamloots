# Streamloots Card System

Card system with hexagonal Architecture

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

![Steamloots card System Hexagonal Architecture](./img/hexagonal.jpg)

## Getting started

- Clone the repo
  `git clone https://github.com/wooltar/streamloots`

- Install dependencies
  `npm install`

- Run mongo and mongoclient
  `docker-compose up`

- Start server
  `npm start`

## Task

```
When the owner retrieves the cards, she will have access to the following statistics: For each card, the total number of cards obtained and the total number of cards used by all the users.`
When another user retrieves the cards, she will have access to the following statistics: For each card, the total number of cards obtained and the total number of cards used by herself.
```

## Possible Solution

To perform this task, I would create a collection called `Transactions`, that would keep every operation performed with each card. In this collection We could keed the cardId, el owner of the card(userFrom), the user to receive the card(userTo) and the transaction price, after that we would have to update the balance of the user accounts.
To resolve the task we can get the data from this collection.
