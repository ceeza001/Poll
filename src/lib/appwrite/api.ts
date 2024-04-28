import { ID, Query } from "appwrite";

import { appwriteConfig, account, databases } from "./config";

// ============================================================
// AUTH
// ============================================================
// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.email);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  imageUrl: URL;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(user.email, user.password);

    console.log(session);
    return session;
  } catch (error) {
    console.log(error);
  }
}



// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.voterCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ============================== SIGN OUT
export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}

// ============================================================
// USER
// ============================================================

// ============================== GET USERS
export async function getCandidates(limit?: number) {
  const queries: any[] = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const candidates = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.candidatesCollectionId,
      queries
    );

    if (!candidates) throw Error;

    return candidates;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER BY ID
export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.voterCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

// ============================== VOTE
export async function vote(voterId: string, candidateId: string) {
  try {
    const updatedVoter = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.voterCollectionId,
      voterId,
      {
        candidates: candidateId,
      }
    );

    if (!updatedVoter) throw Error;

    return updatedVoter;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET VOTERS
export async function getVoters(limit?: number) {
  const queries: any[] = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const voters = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.voterCollectionId,
      queries
    );

    if (!voters) throw Error;

    return voters;
  } catch (error) {
    console.log(error);
  }
}
