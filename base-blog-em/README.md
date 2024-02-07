# Getting Started

## 01 - Creating Queries and Loading Error states

- `npm install react-query`
- Create query client
  - Client that manages queries and cache
- Apply QueryProvider
  - Provides cache and client config to children
  - Takes query client as the value
- Run useQuery
  - Hook that queries the server

### IsFetching **vs.** isLoading

- isFetching
  - the async query function hasn't yet resolved
- isLoading
  - no cached data, plus isFetching

### React Query Dev Tools

- Shows queries (by key)
  - status of queries
  - last updated timestamp
- Data explorer
- Query explorer
- [https://react-query.tanstack.com/devtools](https://react-query.tanstack.com/devtools)

### Stale Data

- Why does it matter if the data is stale ?
- Data refetch only triggers for stale data
  - For example, component remount, window refocus
  - **staleTime** translates to "max age"
  - How to tolerate data potentially being out of date?

### StaleTime **vs.** CacheTime

- **staleTime** is for re-fetching
- Cache is for data that might be re-used later
  - query goes into "cold storage" if there's no active **useQuery**
  - cache data expires after **cacheTime** (default:five minutes)
    - how long it's been since the last active **useQuery**
  - After the cache expires, the data is garbage collected
- Cache is backup data to display while fetching

## 02 - Pagination, Pre-fetching and Mutations

### Intro to Code Quizzes

- Give you challenge and hints, you write code
- Purpose
  - Practice what you've learned
  - reinforce in memory
  - Expose areas where your have questions
    - ask in Q&A!
    - Please include link to GitHub for "why is my code not working"
- For best learning, resist the urge to copy/paste!
  - even berrter, don't look at previous code for reference

### Code Quiz! Fetch Comments

- /src/PostDetails.js
- Run **useQuery**
- Account for error, loading and results
- Be sure to choose a different query key!(not **posts**)
  - React Query uses the key for cache / stale time
- query function needs **postId** parameter
  - () => fetchComments(post.id)
- Warning: comments won't refresh when you click on different posts!
  - Whe will look at how to fix this in the next lecture

### Why don't comments refresh?

* Every query uses the same key (**comments**)
* Data for queries with known keys only refetched upon trigger
* Example triggers:
  - component remount
  - window refocus
  - running refetch fucntion
  - automated refetch
  - query invalidation after a mutation 

### Solution

* Option: remove programmatically for every new title
  - it's not easy
  - it's not really what we want
* No reason to remove data form the cache
  - we're not even performing the same query!
* Query includes post ID
  - Cache on a per-query basis
  - don't share cache for any "comments" uqery regardless of post id
* What we really want: label the query for each post separately

### Array as Query Key

* Pass array for the query key, not just a string
* Treat the query key as a dependency array
  - When key changes, create a new query
* Query function values should be part of the key
#### **['comments',  post.id]**