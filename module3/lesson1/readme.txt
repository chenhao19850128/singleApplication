Promise give us a lot of flexibility when dealing asynchronous behavior
The $q service is the Angular implementation of Promise API
Promise either get resolved or rejected
The 'then' method takes 2 arguments (both function values)
 - 1st function tp handle success or 'resolve' outcome
 - 2nd function to handle error or 'reject' outcome
 - 'then' itself returns a Promise, so it chainable
 $q.all method allows us to execute multiple promises in parallel, handling success/failure in one central place
