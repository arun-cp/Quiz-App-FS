
import { MongoClient } from 'mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await MongoClient.connect(
      'mongodb+srv://aruncp1204:Cparun1234@mdbcluster.ewlg1mu.mongodb.net/?retryWrites=true&w=majority&appName=MDBCluster'
    );
    const db = client.db('test'); 
    const collection = db.collection('exams');
    await collection.insertOne(body);
    client.close();

    return new Response(JSON.stringify({ message: 'Inserted' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Insert failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
