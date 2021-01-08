# BattleSquids

## Project Description

Ever wanted to play Battleship with your friends, but wished the game had more of a Cthulu-esque flavor? Well, welcome to BattleSquids! This is an evolution of Battleship where ships are squids that "ink" opposing squids.Player which will ink the opposing squids first, will win the game.

## Technologies Used

* AWS RDS DB, with a PostgreSQL Engine
* Spring backend with Hibernate adapter and JDBC connection to db
* Spring MVC controllers
* Angular frontend

## Testing

* JUnit
* Mockito

## Features

List of features ready:
* Register account.
* Login and logout of account.
* Create game.
* Invite other users to a game via username.
* Reject or Accept the invite.
* Placing the squids.
* Take turns guessing the placement of opposing squid.
* View your game history.

Future development:
* Chat for players in the game
* Chat for spectators
* Save progress when user leaves game 
* Notify the opponent if other leaves the game
* $kin$
* Beat Fortnite

## Getting Started
   
git clone https://github.com/Weeglord/BattleSquids

### Backend:
Use Maven update to build the project
Run Tomcat 9 Server set to use localhost:8080

### Frontend:
npm install
ng serve
Navigate to http://localhost:4200 on web browser

## Usage
* As an end-user, register for an account if not registered; login if registered.
* Create a game
* Invite another user by username
* Arrange squids
* Set readiness
* Take turn by clicking on a tile on the opposing board
* Win by being the first player to ink all of opponent’s squids

## Contributors

Jason Zelonka (Repo owner), Do Yeun Kim, Muhammad Aown, and Shaker Funkhouser

## Licenses
This project uses .gif loading icons from loading.io
