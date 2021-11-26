const firebase = require("../firebase");

const createGame = async () => {

  const players = await firebase().firestoreAdmin().collection("users")
    .where('active', '==', true)
    .get();

  console.log(JSON.stringify(players));

  const fillerPlayer = {
    active: true,
    displayName: 'Joker',
    photoUrl: 'https://cdn3.iconfinder.com/data/icons/robots-flat-collection/60/Robots_-_Flat_-_006_-_Bender-512.png'
  }

  const tournamentSortedPlayers = pair(players, fillerPlayer);

  /* const rounds = [];
  for (round of tournamentSortedPlayers) {
    
  }


  const rounds = [
    {
      games = [
        {
          players = [

          ]
        }
      ]
    }
  ] */

  const data = {
    created: new Date(),
    ongoing: true,
    rounds: tournamentSortedPlayers
  }

  const doc = await firebase.firestore.collection("tournaments")
    .add(data);

  return doc.id ? {id: doc.id, ...data} : null;
}

const pair = (_items, _fill={})  => {

  const items = [..._items]
  if(_items.length%2) items.push(_fill)

  const splitAt = (i, xs) => [ xs.slice(0, i), xs.slice(i, xs.length) ]
  const shuffle = (xs) => xs.slice(0).sort(() => .5 - Math.random())
  const zip = (xs) => xs[0].map((_,i) => xs.map(x => x[i]))

  return zip(splitAt(items.length/2, shuffle(items)))
}