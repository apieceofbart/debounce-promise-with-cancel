# debounce-promise-with-cancel

A debounce utility for functions returning promises with an option to cancel

## Why?

I needed a simple utility for debouncing fetch calls with the ability to cancel requests in case of errors

## Instalation and usage

### Install:
```
npm install debounce-promise-with-cancel
``` 
### Import:
```
import { debounce } from 'debounce-promise-with-cancel'
```
or as default import
```
import debounce from 'debounce-promise-with-cancel'
```
or as commonjs
```
const debounce = require('debounce-promise-with-cancel')
```

### Usage:
```
const debouncedFetch = debounce(fetchData, 500)

...
// use debouncedFetch just as you would use fetchData
// when you need to cancel just 
debouncedFetch.cancel()
```
### Example
Please check this codesandbox for a an example (React + Typescript):
https://codesandbox.io/s/example-of-using-debounce-promise-with-cancel-91p6g
## Testing
```
npm run test
```
## Issues & Contributions
If you found a bug or would like to propose a feature please create an issue. If you'd like to contribute please create a PR with an explanation - make sure to add a test case.
## Similar solutions

* https://github.com/bjoerge/debounce-promise
Doesn't handle cancellation
* https://github.com/slorber/awesome-debounce-promise
Many dependencies, possible to cancel but using another lib
