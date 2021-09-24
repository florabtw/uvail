# uvail

`uvail` is a js library to check username availability across multiple services.
At this time, you can check:

- google (gmail)

## Installation

```
yarn add uvail
```

or

```
npm install uvail
```

## Usage

Each method returns a promise, which resolves to either
`true` (available) or `false` (taken):

```js
import uvail from "uvail";

const username = "test_user";

await uvail.google(username); // google (gmail)
```

Some methods will throw an error if the username is invalid, so **be sure to catch
rejected promises!**

```
await uvail.google('cat').catch((e) => {
  console.log(e); // Sorry, your username must be between 6 and 30 characters long.
});
```
