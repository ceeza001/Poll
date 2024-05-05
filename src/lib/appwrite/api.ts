import { ID, Query } from "appwrite";

import { appwriteConfig, account, databases, storage, avatars } from "./config";
import { INewPoll, INewCandidate, IUpdateChapter, INewUser, IUpdateUser, IUpdatePoll } from "@/types";

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
      user.name,
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
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
  name: string;
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

    if (!currentAccount) throw new Error("Current account not found");

    const allUsers = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
    );

    if (!allUsers) throw new Error("No users found");

    const currentUser = allUsers.documents.find((user: any) => user.accountId === currentAccount.$id);
    
    return currentUser;
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

// ============================== UPDATE USER
export async function onboardUser(user: IOnboardUser) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    //  Onboard user
    const onboardedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      {
        name: user.name,
        matricNo: user.matricNo,
        level: user.level,
        department: user.department,
        type: user.type,
        username: user.username,
        bio: user.bio,
        onboarded: true,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    // Failed to update
    if (!onboardedUser) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return onboardedUser;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USERS
export async function getUsers() {
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}


// ============================== GET USER BY ID
export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE USER
export async function updateUser(user: IUpdateUser) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    //  Update user
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.poetCollectionId,
      user.userId,
      {
        penname: user.penname,
        bio: user.bio,
        onboarded: user.onboarded,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    // Failed to update
    if (!updatedUser) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

// ============================================================
// COURSES
// ============================================================

// ============================== UPLOAD FILE
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.error(error);
    // You can choose to rethrow the error or handle it as needed.
    throw error;
  }
}

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

// ============================== CREATE COURSE
export async function createPoll(poll: INewPoll) {
  try {
    // Create course
    const newPoll = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.pollCollectionId,
      ID.unique(),
      {
        creator: poll.userId,
        title: poll.title,
      }
    );

    if (!newPoll) {
      throw new Error("Failed to create a new course.");
    }

    return newPoll;
  } catch (error) {
    console.error(error);
    // You can choose to rethrow the error or handle it as needed.
    throw error;
  }
}

// ============================== DELETE COURSE
export async function deletePoll(pollId?: string, fileId?: string) {
  if (!deletePoll) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.pollCollectionId,
      pollId
    );

    if (!statusCode) throw Error;

    if (fileId) {
      await deleteFile(fileId);
    }

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET COURSE BY ID
export async function getPollById(pollId: string) {
  try {
    const poll = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.pollCollectionId,
      pollId
    );
console.log('poll', pollId);
    if (!poll) throw Error;

    return poll;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE COURSE
export async function updatePoll(poll: IUpdatePoll) {
  try {
     //  Update Course
    const updatedPoll = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.pollCollectionId,
      poll.pollId,
      {
        title: poll.title,
        description: poll.description,
        isPublished: poll.isPublished,
      }
    );

    // Failed to update
    if (!updatedPoll) {
      // Delete new file that has been recently uploaded
      
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    
    return updatedPoll;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET COURSES
export async function getPolls() {
  try {
    const polls = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.pollCollectionId,
    );

    if (!polls) throw new Error("No polls found");

    return polls;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ============================================================
// CANDIDATES
// ============================================================

// ============================== CREATE CHAPTER
export async function createCandidate(candidate: INewCandidate) {
  const hasFileToUpdate = candidate.file?.length > 0;
  
  try {
    let image = {
      imageUrl: candidate.imageUrl,
      imageId: candidate.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(candidate.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }
    // Create chapter
    const newCandidate = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.candidatesCollectionId,
      ID.unique(),
      {
        poll: candidate.pollId,
        name: candidate.name,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    if (!newCandidate) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      throw new Error("Failed to create a new course.");
    }

    if (candidate.imageId && hasFileToUpdate) {
      await deleteFile(candidate.imageId);
    }
    return newCandidate;
  } catch (error) {
    console.error(error);
    // You can choose to rethrow the error or handle it as needed.
    throw error;
  }
}

// ============================== DELETE CANDIDATE
export async function deleteCandidate(candidateId?: string, fileId?: string) {
  if (!candidateId) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.candidatesCollectionId,
      candidateId
    );

    if (!statusCode) throw Error;

    if (fileId) {
      await deleteFile(fileId);
    }

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET CHAPTER BY ID
export async function getChapterById(chapterId: string) {
  try {
    const chapter = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.chapterCollectionId,
      chapterId
    );

    if (!chapter) throw Error;

    return chapter;
  } catch (error) {
    console.log(error);
  }
}

// ============================== VOTE
export async function vote(votes: string[], candidateId: string) {
  try {
    const updatedVoter = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.candidatesCollectionId,
      candidateId,
      {
        votes: votes,
      }
    );

    if (!updatedVoter) throw Error;

    return updatedVoter;
  } catch (error) {
    console.log(error);
  }
}
