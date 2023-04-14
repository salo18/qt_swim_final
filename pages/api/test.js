export default function test(req, res) {
  const obj = {
    a: 'hi',
    b: 'there',
  }

  res.status(200).json( obj );
}