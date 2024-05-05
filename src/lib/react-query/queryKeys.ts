export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = "createUserAccount",

  // USER KEYS
  GET_CURRENT_USER = "getCurrentUser",
  GET_USERS = "getUsers",
  GET_USER_BY_ID = "getUserById",

  // COURSE KEYS
  GET_POLLS = "getPolls",
  GET_INFINITE_COURSES = "getInfiniteCourses",
  GET_RECENT_POLLS = "getRecentPolls",
  GET_POLL_BY_ID = "getPollById",
  GET_CHAPTER_BY_ID = "getChapterById",
  GET_USER_POLLS = "getUserPolls",
  GET_FILE_PREVIEW = "getFilePreview",
  GET_CATEGORIES = "getCategories",
  GET_CURRENT_POLL = "getCurrentPoll",
  GET_CURRENT_CHAPTER = "getCurrentChapter",
  
  // COMMUNITY KEYS
  GET_RECENT_COMMUNITIES = "getRecentCommunities",
  GET_COMMUNITIES = "getCommunities",
  GET_COMMUNITY_BY_ID = "getCommunityById",
  
  //  SEARCH KEYS
  SEARCH_POSTS = "getSearchPosts",
  SEARCH_COMMUNITIES = "getSearchCommunities",
}