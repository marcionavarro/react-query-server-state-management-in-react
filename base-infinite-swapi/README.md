# Infinite Scroll Star Wars Api

* Infinite scroll
    - fetch new data "just in time" as user scrolls
    - more efficient tha fetching all data at once
* Fetch new data when...
    - user clicks a button
    - user scrolls to certain point on the page

### UseInfiniteQuery

* Requires different API format than pagination
* Hence new project 
* Pagination
    - track current page in component state
    - new uqery updates page number
* **useInifiteQuery** tracks next query
    - next query is returned as part of the data
```
{
    "count": 37,
    "next": "http://swapi.dev/api/species/?page=2"
    "previous": null,
    "results": [ ... ]
}
```


## 03 Infinite Queries for Loading Data _Just in Time_

### Set up Infinite SWAPI

* cd base-infinite-swapi
* **IMPORTANT!** npm install --legacy-peer-deps
    - **react-infinite-scroller** doesn't technically support React 17
* Install React Query
    - [https://react-query.tanstack.com/installation](https://react-query.tanstack.com/installation)
* Create query client ans and add provider to App.js
    - [https://react-query.tanstack.com/quick-start](https://react-query.tanstack.com/quick-start)
* Add devtools to App.js
    - [https://react-query.tanstack.com/devtools](https://react-query.tanstack.com/devtools)

### Shape of **useInfiniteQuery** Data

* Shap of **data** different than **useQuery**
* Object with two properties
    - **pages**
    - **pageParams**
* Every query has its own element in the **pages** array
* **pageParams** tracks the keys of queries that have been retrieved
    - rarely used, won't use here

### useInfiniteQuery **Syntax**

* **PageParam** is a parameter passed to the queryFn
    - `useInfiniteQuery("sw-people", ({pageParam = defaultUrl}) => fetchUrl(pageParam))`
    - Current value **pageParam** is maintained by React Query
* **useInfiniteQuery** options
    - **getNextParam**: (lastPage, allPages)
        - Updates **pageParam**
        - Might use all of the pages of data (**allPages**)
        - we will use just the **lastPage** of data (specifically the **next** property)

### **useInfiniteQuery** Return Object Properties

* **fetchNextPage**
    - function to call when the user needs more data
* **hasNextPage**
    - Based on return value of **getNextPageParam**
    * If **undefined**, no more data
* **isFetchingNextPage**
    - For displaying a loading spinner
    - We'll see an example of when it's useful to distinguish between  
    **isFetching** and **isFetchingNextPage**

### **React Infinite Scroller**

* Works really nicely with **useInfiniteQuery**
    - [https://www.npmjs.com/package/react-infinite-scroller](https://www.npmjs.com/package/react-infinite-scroller)
* Popula two props for **InfiniteScroll** component:
    - **load-more={fetchNextPage}**
    - **hasMore={hasNextPage}**
* Component takes care of detecting when to load more
* Data in **data.pages[x].results**
