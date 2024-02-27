# React Query in Larger App
## Setup, Centralization, Custom Hooks

* centralizing fetching indicator / error handling
* refetching data
* integrating with auth
* dependent queries
* testing
* more examples of **useQuery**, mutations, pagination, prefetching

### Caveats about Lazy Days App

* Not production ready!
    - not reactive
    - not mobile friendly
    - appointment updates aren't auth-protected
    - no admin user / interface to update staff, treatments
* Client and server
    - download both and run `npm install`
    - create .env file in server and **EXPRESS_SECRET**

### Custom Hooks

* in larger apps, make custom hook for each type of data
    - can access from multiple components
    - no risk of mising up keys
    - query function encapsulated in custom hook 
    -  abstracts implemantation from display layer
        - update hook if you change implementation
        - no need to update components

### useIsFetching

* In smaller apps
    - used **isFetching** from **useQuery** return object
    - Reminder: **isLoading** is **isFetching** plus no cached data
* In a larger app
    - Loading spinner whenever any query **isFetching**
    - **useFetching** tells us this!
* No need for **isFetching** on every custom hook / **useQuery** call

### Passing errors to toasts

* Pass **useQuery** errors to Chakra UI "toast"
    - First for single call, then centralized
* **onError** callback to **useQuery**
    - Instead of destructuring **isError, error** from **useQuery** return
    - runs if query function throws an error
    - **error** parameter to callback
* Will use toasts
    - Chakra UI comes with a handy use Toast hook
    - [https://chakra-ui.com/docs/components/toast](https://chakra-ui.com/docs/components/toast)

### QueryClient default **onError** option

* No **useError** analogy for **useIsFetching**
    - not a boolean; unclear how to implement
* Instead, set default **onError** handler for QueryClient
    - defaults for QueryClient
    - [https://github.com/TanStack/query/blob/main/packages/react-query/src/types.ts](https://github.com/TanStack/query/blob/main/packages/react-query/src/types.ts)
    - ``
        { 
            queries: { useQuery options },
            mutations: { useMutation options }
        }
    ``
### Alternative to **onError**: ErrorBoundary

* Alternative: handle error with React Error Boundary
- [https://pt-br.legacy.reactjs.org/docs/error-boundaries.html](https://pt-br.legacy.reactjs.org/docs/error-boundaries.html)
* **useErrorBoundary** for **useQuery**
    - reference: [https://tanstack.com/query/v4/docs/framework/react/reference/useQuery](https://tanstack.com/query/v4/docs/framework/react/reference/useQuery)
* option to **useQuery** / **useMutation**
    - or in **defaultOptions** when creating QueryClient
* Set to true to propagate errors to the nearest error boundary

