import { Query } from "appwrite";

import { appwriteConfig, account, databases } from "./config";

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
    throw error; // Throw an error with a message
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
