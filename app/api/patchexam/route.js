import { MongoClient } from 'mongodb';

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { xmid, ...updateFields } = body;
    delete updateFields._id;

    if (!xmid) {
      return new Response(JSON.stringify({ error: 'Missing xmid for update' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = await MongoClient.connect(
      'mongodb+srv://aruncp1204:Cparun1234@mdbcluster.ewlg1mu.mongodb.net/?retryWrites=true&w=majority&appName=MDBCluster'
    );
    const db = client.db('test');
    const collection = db.collection('exams');

    const result = await collection.updateOne(
      { xmid: xmid },              
      { $set: updateFields }     
    );

    client.close();

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: 'No document found with this xmid' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Update failed', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
