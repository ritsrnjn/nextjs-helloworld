export async function fetchHelloWorld() {
  console.log('fetching data from flask');
  try {
    const res = await fetch(`api/python`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log('fetching data from flask failed');
    console.log(err);
    return 'new ';
  }
}
