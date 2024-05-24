import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.tj.aora",
  projectId: "664e4f8a000225ce1acc",
  databaseId: "664e57d70019d91464df",
  userCollectionId: "664e580a0025589e420b",
  videoCollectionId: "664e5847000ca3113c8e",
  storageId: "664e5db9001c4c3b8b1c",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

type CredentialsProps = {
  email: string;
  password: string;
  username?: string;
};

export const createUser = async ({
  email,
  password,
  username,
}: CredentialsProps) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signIn = async ({ email, password }: CredentialsProps) => {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

// Get Account
export const getAccount = async () => {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrantUser = async () => {
  try {
    const currantAccount = await getAccount();
    if (!currantAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currantAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error: any) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};
