# Getting Started


## 01 - Creating Queries and Loading Error states

* `npm install react-query`
* Create query client    
    - Client that manages queries and cache
* Apply QueryProvider  
    - Provides cache and client config to children
    - Takes query client as the value
* Run useQuery
    - Hook that queries the server

### IsFetching **vs.** isLoading

* isFetching
    - the async query function hasn't yet resolved
* isLoading
    - no cached data, plus isFetching

### React Query Dev Tools

* Shows queries (by key)
    - status of queries
    - last updated timestamp
* Data explorer
* Query explorer
* [https://react-query.tanstack.com/devtools](https://react-query.tanstack.com/devtools)

### Stale Data

* Why does it matter if the data is stale ?  
* Data refetch only triggers for stale data
    - For example, component remount, window refocus
    - **staleTime** translates to "max age"
    - How to tolerate data potentially being out of date?

### StaleTime **vs.** CacheTime

* **staleTime** is for re-fetching
* Cache is for data that might be re-used later
    - query goes into "cold storage" if there's no active **useQuery**
    - cache data expires after **cacheTime** (default:five minutes)
        - how long it's been since the last active **useQuery**
    - After the cache expires, the data is garbage collected
* Cache is backup data to display while fetching