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
