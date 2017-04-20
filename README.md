# Experiments with async + await

My goal was to see if using async + await yielded more meaningful stack traces, that is, with better line numbers and an easier way to see exactly what code of yours lead up to the error. Possibly just the case I picked, using `request-promise`, showed that it doesn't: you still get pretty useless stack traces. I think it's because the errors in this case are emitted using an EventListener, so they still just emerge out of the blue with no context.

Run this like:

```
node index.js http://www.nextgen.com http://zzzzzzzzgoogle.com http://yahoo.com http://zzzzzzzzgoogle.com
```

Output will be similar to:

```
in series...
sleeping for 1000ms...
writing output0.html...
sleeping for 0ms...
ERROR: { RequestError: Error: getaddrinfo ENOTFOUND zzzzzzzzgoogle.com zzzzzzzzgoogle.com:80
    at new RequestError (/Users/stevek/Documents/workspace/async-await/node_modules/request-promise-core/lib/errors.js:14:15)
    at Request.plumbing.callback (/Users/stevek/Documents/workspace/async-await/node_modules/request-promise-core/lib/plumbing.js:87:29)
    at Request.RP$callback [as _callback] (/Users/stevek/Documents/workspace/async-await/node_modules/request-promise-core/lib/plumbing.js:46:31)
    at self.callback (/Users/stevek/Documents/workspace/async-await/node_modules/request/request.js:188:22)
    at emitOne (events.js:96:13)
    at Request.emit (events.js:191:7)
    at Request.onRequestError (/Users/stevek/Documents/workspace/async-await/node_modules/request/request.js:884:8)
    at emitOne (events.js:96:13)
    at ClientRequest.emit (events.js:191:7)
    at Socket.socketErrorListener (_http_client.js:358:9)
    at emitOne (events.js:96:13)
    at Socket.emit (events.js:191:7)
    at connectErrorNT (net.js:1032:8)
    at _combinedTickCallback (internal/process/next_tick.js:80:11)
    at process._tickCallback (internal/process/next_tick.js:104:9)
  name: 'RequestError',
  message: 'Error: getaddrinfo ENOTFOUND zzzzzzzzgoogle.com zzzzzzzzgoogle.com:80',
  cause: 
   { Error: getaddrinfo ENOTFOUND zzzzzzzzgoogle.com zzzzzzzzgoogle.com:80
       at errnoException (dns.js:28:10)
       at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:73:26)
     code: 'ENOTFOUND',
     errno: 'ENOTFOUND',
     syscall: 'getaddrinfo',
     hostname: 'zzzzzzzzgoogle.com',
     host: 'zzzzzzzzgoogle.com',
     port: 80 },
  error: 
   { Error: getaddrinfo ENOTFOUND zzzzzzzzgoogle.com zzzzzzzzgoogle.com:80
       at errnoException (dns.js:28:10)
       at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:73:26)
     code: 'ENOTFOUND',
     errno: 'ENOTFOUND',
     syscall: 'getaddrinfo',
     hostname: 'zzzzzzzzgoogle.com',
     host: 'zzzzzzzzgoogle.com',
     port: 80 },
  options: 
   { uri: 'http://zzzzzzzzgoogle.com',
     gzip: true,
     callback: [Function: RP$callback],
     transform: undefined,
     simple: true,
     resolveWithFullResponse: false,
     transform2xxOnly: false },
  response: undefined }
sleeping for 2000ms...
writing output2.html...
sleeping for 2000ms...
ERROR: { RequestError: Error: getaddrinfo ENOTFOUND zzzzzzzzgoogle.com zzzzzzzzgoogle.com:80
    at new RequestError (/Users/stevek/Documents/workspace/async-await/node_modules/request-promise-core/lib/errors.js:14:15)
    at Request.plumbing.callback (/Users/stevek/Documents/workspace/async-await/node_modules/request-promise-core/lib/plumbing.js:87:29)
    at Request.RP$callback [as _callback] (/Users/stevek/Documents/workspace/async-await/node_modules/request-promise-core/lib/plumbing.js:46:31)
    at self.callback (/Users/stevek/Documents/workspace/async-await/node_modules/request/request.js:188:22)
    at emitOne (events.js:96:13)
    at Request.emit (events.js:191:7)
    at Request.onRequestError (/Users/stevek/Documents/workspace/async-await/node_modules/request/request.js:884:8)
    at emitOne (events.js:96:13)
    at ClientRequest.emit (events.js:191:7)
    at Socket.socketErrorListener (_http_client.js:358:9)
    at emitOne (events.js:96:13)
    at Socket.emit (events.js:191:7)
    at connectErrorNT (net.js:1032:8)
    at _combinedTickCallback (internal/process/next_tick.js:80:11)
    at process._tickCallback (internal/process/next_tick.js:104:9)
  name: 'RequestError',
  message: 'Error: getaddrinfo ENOTFOUND zzzzzzzzgoogle.com zzzzzzzzgoogle.com:80',
  cause: 
   { Error: getaddrinfo ENOTFOUND zzzzzzzzgoogle.com zzzzzzzzgoogle.com:80
       at errnoException (dns.js:28:10)
       at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:73:26)
     code: 'ENOTFOUND',
     errno: 'ENOTFOUND',
     syscall: 'getaddrinfo',
     hostname: 'zzzzzzzzgoogle.com',
     host: 'zzzzzzzzgoogle.com',
     port: 80 },
  error: 
   { Error: getaddrinfo ENOTFOUND zzzzzzzzgoogle.com zzzzzzzzgoogle.com:80
       at errnoException (dns.js:28:10)
       at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:73:26)
     code: 'ENOTFOUND',
     errno: 'ENOTFOUND',
     syscall: 'getaddrinfo',
     hostname: 'zzzzzzzzgoogle.com',
     host: 'zzzzzzzzgoogle.com',
     port: 80 },
  options: 
   { uri: 'http://zzzzzzzzgoogle.com',
     gzip: true,
     callback: [Function: RP$callback],
     transform: undefined,
     simple: true,
     resolveWithFullResponse: false,
     transform2xxOnly: false },
  response: undefined }
all done
this should be the last line of output
```