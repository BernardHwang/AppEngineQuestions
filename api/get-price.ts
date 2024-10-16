export default async function (payload: unknown = undefined) {
  return await fetch('https://dt-url.net/ec2prices').then(response => {
    return response.json();
  });
}
