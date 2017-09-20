# firebase-rules

> Make your Firebase database rules readable and scalable. Using only javascript.

## Table of Contents

[Getting Started](#getting-started)

[Helpers](#helpers)
- [Accessing new data root](#accessing-new-data-root)
- [Conditions](#conditions)
- [CRUD](#crud)
- [Common](#common)

## Getting Started

The best way to understand how it works it's just by using it. Let's try it out in this quick demo.
Let's create some rules for an app that let users create their own 'user' object and then create/update their own posts.

The database should look something like this:

```
// database
{
  users: {
    $userId: {
      firstName: 'John'
    }
  },
  posts: {
    $postId: {
      title: 'My post title.',
      body: 'My post body.',
      createdAt: timestamp,
      createdBy: '$userId'
    }
  }
}

```

Let's first create our rules related to the user object.
The user must be able to create and update his profile.
Other users must be able to see his profile.
No users are ever removed from our app.

```javascript
// ./rules/modules/users.js

const { createRules } = require('firebase-rules');
const { isAuth, valueIsAuthUserId, newDataIsString, validate } = require('firebase-rules/helpers/common');
const { ifCondition } = require('firebase-rules/helpers/conditions');

const isUserAndIsNotRemoving = ifCondition(
  newDataExists,
  valueIsAuthUserId('$userId'),
  false
);

const userRules = createRules({
  'users/$userId': {
    read: isAuth,
    write: isUserAndIsNotRemoving,
    validate: newDataHasChildren(['firstName'])
  },
  'users/$userId/firstName': validate(newDataIsString),
  'users/$userId/$invalidProp': validate(false)
});

module.exports = userRules;
```

Next we can build our post object rules.
Any user can create posts. Only the post's creator may update or remove it.
Posts can be read by any of our app's users.

```javascript
// ./rules/modules/posts.js

const { createRules } = require('firebase-rules');
const { isAuth, valueIsAuthUserId, newDataIsString, newDataIsNow, validate } = require('firebase-rules/helpers/common');

const postRules = createRules({
  'posts/$postId': {
    read: isAuth,
    write: valueIsAuthUserId(newDataProp('createdBy')),
    validate: newDataHasChildren(['title', 'body', 'createdAt', 'createdBy'])
  },
  'posts/$postId/title': validate(newDataIsString),
  'posts/$postId/body': validate(newDataIsString),
  'posts/$postId/createdAt': validate(newDataIsNow),
  'posts/$postId/createdBy': validate(valueIsAuthUserId(newData)),
  'posts/$postId/$invalidProp': validate(false)
});

module.exports = userRules;
```

Now let's export this rules so we can import them to firebase.

```javascript
// ./rules/index.js

const { exportRules } = require('firebase-rules');

exportRules([
  require('./modules/users'),
  require('./modules/posts')
], 'database.rules.json');

```

Done! There is now a file named `database.rules.json` in our app's root folder.
We can now upload our app to Firebase using their CLI or even upload our file manually using their website.

## Helpers

We include many helpers that are commonly used when building a firebase ruleset.
They are divided into **conditions**, **crud** and **common** helpers.

### Accessing new data root

Apart from the helpers, we also provide a quick way for you to access the `root` path even when dealing with `newData`.
In the default firebase rules you can only access `root` when dealing with a `data` object.

All you have to do is use the `newDataRoot()` string inside your conditions.
So if you wanted to check if a post's 'createdBy' user exists in your application:

```
  ...
  'posts/$postId/createdBy': {
    validate: `newDataRoot().child('users/' + newData.val()`).exists()
  }
  ...
```

This is really useful when you're creating data on multiple locations that depend on each other.
As you can see in the example above, you can use normal strings side by side with our helper functions without no other configuration.

### Conditions

Using our conditions helpers will make writing your code more like writing normal code logic.

#### ifCondition

If the first condition is true, the second condition is checked.
If the first condition is false, the third condition is checked.
It works much like a ternary operator.

If the third condition is not provided, it defaults to 'false'.

```
ifCondition(
  ifUserIsAuth,
  alsoCheckIfHeIsValid,
  otherwiseCheckOtherCondition
)
```

#### anyCondition

Any of the passed conditions must be true for the rule to be accepted.
**It might also receive an array instead of a list of arguments**.

```
anyCondition(
  thisMustBeTrue,
  OR_thisMustBeTrue,
  OR_atLeastThisMustBeTrue,
  ...
)
```

#### everyCondition

Any of the passed conditions must be true for the rule to be accepted.
**It might also receive an array instead of a list of arguments**.

```
anyCondition(
  thisMustBeTrue,
  AND_thisTooMustBeTrue,
  AND_thisMustAlsoBeTrue,
  ...
)
```

### CRUD

Our CRUD helpers makes it easy to check for different rules in case of create/update/delete situations.

```
onCreate( checkIfAllChildrenArePresent ),
onUpdate( checkIfNoRequiredChildrenAreRemoved ),
onDelete( checkIfUserCanDeleteThis )
```

Not that `onDelete` is not called on `validate` rules since firebase bypasses validations on null values.

### Common

We also provide a lot of common snippets so you won't have to redo the basics everytime.

| **helper** | **example** | **output** |
|---------------|---------------------------------|------------------------------------|
|  |  |  |
| isAuth | read: isAuth | '.read': 'auth.uid != null' |
| valueIsAuthId | write: valueIsAuthId('$userId') | '.write': 'auth.uid == $userId' |
|  |  |  |
| data | write: valueIsAuthId(data) | '.write': 'auth.uid == data.val()' |
| dataExists | write: dataExists | '.write': 'data.val() != null' |
| valueIsData | read: valueIsData('$userId') | '.read': 'data.val() == $userId' |
|  |  |  |
| newData | write: newValueIsAuthId(data) | '.write': 'auth.uid == newData.val()' |
| newDataExists | write: newDataExists | '.write': 'newData.val() != null' |
| valueIsNewData | read: valueIsNewData('$userId') | '.read': 'newData.val() == $userId' |
|  |  |  |
| dataIsString | validate: dataIsString | '.validate': 'data.isString()' |
| newDataIsString | validate: newDataIsString | '.validate': 'newData.isString()' |
|  |  |  |
| dataIsNumber | validate: dataIsNumber | '.validate': 'data.isNumber()' |
| newDataIsNumber | validate: newDataIsNumber | '.validate': 'newData.isNumber()' |
|  |  |  |
| dataIsInteger | validate: dataIsInteger | '.validate': 'data.matches(/^-?\d+$/)' |
| newDataIsInteger | validate: newDataIsInteger | '.validate': 'newData.matches(/^-?\d+$/)' |
|  |  |  |
| dataIsBoolean | validate: dataIsBoolean | '.validate': 'data.isBoolean()' |
| newDataIsBoolean | validate: newDataIsBoolean | '.validate': 'newData.isBoolean()' |
|  |  |  |
| dataIsNow | validate: dataIsNow | '.validate': 'data.val() == now' |
| newDataIsNow | validate: newDataIsNow | '.validate': 'newData.val() == now' |
|  |  |  |
| hasChildren | validate: 'data.' + hasChildren(['a', 'b']) | '.validate': 'data.hasChildren([\'a\', \'b\'])' |
| dataHasChildren |  validate: dataHasChildren(['a', 'b']) | '.validate': 'data.hasChildren([\'a\', \'b\'])' |
| newDataHasChildren |  validate: newDataHasChildren(['a', 'b']) | '.validate': 'newData.hasChildren([\'a\', \'b\'])' |
|  |  |  |
