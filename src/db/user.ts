import { connectToMongoDBCluster, connectToMongoDBCollection, CrudOperations, CrudOperationsWithFilter, CrudOperationsWithUpdatedFields } from "./index";
import config from "../config";
import { User, userGenerator } from "../generators/user";
import {
  Collection,
  DeleteResult,
  Document,
  Filter,
  InsertOneResult,
  MatchKeysAndValues,
  MongoClient,
  UpdateFilter,
  UpdateResult,
  WithId,
} from "mongodb";



// export async function executeUserCrudOperations(
//   crudOperations: CrudOperations<User, any>|CrudOperationsWithFilter<User, any>|CrudOperationsWithUpdatedFields<User, any>
// ) {
//   const uri = config.db.url;
//   if (uri) {
//     const [collection,db,mongoClient] = await connectToMongoDBCollection<User>('user',"slightsweet")
//     if () {
//       crudOperations(collection, async () => {
//         await mongoClient?.close();
//       });
//     } else {
//     }
//   } else {
//     console.log("Error MongoDB URL");
//   }
// }

export const createUser: CrudOperations<User, InsertOneResult<User>> = async (
  collection: Collection<User>
) => {
  const user = userGenerator({
    name: "Sylas",
  });
  const insertOneResult = await collection.insertOne(user);
  return insertOneResult;
};

export const findUser: CrudOperationsWithFilter<User, WithId<User>[]> = async (
  collection: Collection<User>,
  filter: Filter<User>
) => {
  const findResult = await collection.find(filter).toArray();
  return findResult;
};

export const updateUser: CrudOperationsWithUpdatedFields<
  User,
  UpdateResult<User>
> = async (
  collection: Collection<User>,
  filter: Filter<User>,
  updatedFields: MatchKeysAndValues<User>
) => {
  const updateResult = await collection.updateMany(filter, {
    $set: updatedFields,
  });
  return updateResult;
};

export const deleteUser: CrudOperationsWithFilter<User, DeleteResult> = async (
  collection: Collection<User>,
  filter: Filter<User>
) => {
  const deleteResult = await collection.deleteMany(filter);
  return deleteResult;
};
