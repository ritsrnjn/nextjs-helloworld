export async function fetchHelloWorld() {
  console.log('fetching data from flask');
  try {
    const res = await fetch(`http://127.0.0.1:5328/api/python`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log('fetching data from flask failed');
    console.log(err);
    return 'new ';
  }
}
