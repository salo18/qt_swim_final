export default async function test(req, res) {

  console.log('CRON');
  
  const response = {
    a: 'hello',
    b: 'whatsup'
  }
  res.status(200).json( response );
}


