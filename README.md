# CMS-backend

## Node version

above version 18

tested on local with version v18.13.0

## PostgreSQL version

tested on local with version PostgreSQL 17.0

## Go to the project directory

cd CareMonitor

## Install dependencies

npm install

## Create a .env from the sample

cp env-sample .env

## Database setup by code command line

run commad 

npm run db:migrate

## Database setup

1. Migrate Data Tables below run commands

npm run migrate

2. Seeder database collection

npm run seeder

## Setup some hidden folder

create folder logs & uploads

 /CareMonitor/logs
 /CareMonitor/uploads

## Start server with PM2

npm install pm2 -g

npm run dev:start

## Every update restart server

npm run dev:flush

## delete pme server

npm run delete

## Start the server local

## Install nodemon run command

npm install nodemon -g

npm run start:nodemon

## Delete local logs files & upload files

## Delete logs

npm run rm:log

## Delete uploads
npm run rm:upload

## Delete all
npm run rm:files




