import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    const client = await MongoClient.connect(
      'mongodb+srv://aruncp1204:Cparun1234@mdbcluster.ewlg1mu.mongodb.net/?retryWrites=true&w=majority&appName=MDBCluster'
    );

    const db = client.db('test'); 
    const collection = db.collection('results');

    const result = await collection.find().toArray();

    client.close();

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch result' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
