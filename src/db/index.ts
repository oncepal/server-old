import { Collection, Filter, Document,MatchKeysAndValues, MongoClient, Db } from 'mongodb';
import config from '../config';
export type CrudOperations<T extends Document, S> = (
    collection: Collection<T>,
    callback: () => {}
  ) => Promise<S>;
  export type CrudOperationsWithFilter<T extends Document, S> = (
    collection: Collection<T>,
    filter: Filter<T>,
    callback: () => {}
  ) => Promise<S>;
  export type CrudOperationsWithUpdatedFields<T extends Document, S> = (
    collection: Collection<T>,
    filter: Filter<T>,
    updatedFields: MatchKeysAndValues<T>,
    callback: () => {}
  ) => Promise<S>;
  
export async function connectToMongoDBCluster(uri: string) {
 
    try {
        const mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 }
 export async function connectToMongoDBCollection<T extends Document>(collectionName:string,dbName='slightsweet') {
    const uri = config.db.url;
    let mongoClient: MongoClient;
    if (uri) {
      mongoClient = await connectToMongoDBCluster(uri);
      if (mongoClient) {
        const db = mongoClient.db(dbName);
        const collection = db.collection<T>(collectionName);
        return [collection,mongoClient,db] as [Collection<T>,MongoClient,Db]
      } else {
      }
    } else {
      console.log("Error MongoDB URL");
    }

    return []
 }



