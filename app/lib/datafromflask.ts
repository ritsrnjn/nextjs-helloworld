// export async function fetchHelloWorld() {
//   console.log('fetching data from flask');
//   try {
//     const res = await fetch(`api/python`);
//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.log('fetching data from flask failed');
//     console.log(err);
//     return 'new ';
//   }
// }

// write a post request to the flask server api/tracker
// with request body { "url": "https://playo.co/match/4211f58a-b76c-48fa-983f-0b7561cb1710" }

// export async function fetchPlayoTracker() {
//   console.log('fetching data from flask');
//   try {
//     const res = await fetch(`http://127.0.0.1:5328/api/tracker`, {
//       method: 'POST',
//       body: JSON.stringify({ url: 'https://playo.co/match/4211f58a-b76c-48fa-983f-0b7561cb1710' }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.log('fetching data from flask failed');
//     console.log(err);
//     return 'new ';
//   }
// }
