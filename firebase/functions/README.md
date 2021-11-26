Firebase Functions 🔥

## Setup

1. Download firebase tools globally if you don't have it already. $ `npm install -g firebase-tools` or $ `curl -sL https://firebase.tools | bash`
2. Make sure CLI is logged in to the right firebase project with $ `firebase login`, you may need to ask a developer on this project for project access.
3. Get service-account.json from somewhere/someone. 
4. $ `yarn install`

## Deploy

1. Make sure CLI is logged in to the right firebase project with $ `firebase login`.
2. $ `yarn build`?
3. $ `yarn deploy`

## Environment variables

Get an updated list with  
$ `firebase functions:config:get`  
or  
$ `yarn env` 

Set env vars with  
$ `firebase functions:config:set servicename.key1=val1 servicename.key2=val2`  
or  
$ `yarn env-set servicename.key1=val1 servicename.key2=val2`

Unset env vars with  
$ `firebase functions:config:unset servicename.key` 
or  
$ `yarn env-unset servicename.key1=val1 servicename.key2=val2`  
(don't remove env vars that are in use in production)

**Have not yet set up local env override yet.**

## Todo

1. add emulators section.
2. add google app credentials section.
