# firebase-rules

> Make your Firebase database rules readable and scalable. Using only javascript.

## Table of Contents

[Getting Started](#getting-started)

[Helpers](#helpers)
- [Conditions](#conditions)
- [CRUD](#crud)
- [Common](#common)
- [New Data Root](#new-data-root)

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
**Keep in mind that we're only generating strings. So you can quickly create helpers of your own. Check out our helpers source code, they're so simple it's ridiculous.**

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
everyCondition(
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

We also provide a lot of common snippets so you won't have to redo the basics.

**auth**

```
isAuth
isAuthId(any)
```

e.g. any authenticated user can read any post but only the owner can update it.

```
'posts/$userId/$postId':
  read: isAuth                // 'auth.uid != null',
  write: isAuthId('$userId')  // 'auth.uid == $userId'
```

**data**

```
data
isData(any)
dataExists
dataIsEmpty

newData
isNewData(any)
newDataExists
newDataIsEmpty
```

e.g. the path can only be created but not updated

```
$path:
  write: everyCondition( dataIsEmpty, newDataExists )
  // data.val() == null && newData.val() != null
```

**props**

```
prop(any) | child(any)
newProp(any) | newChild(any)
hasProp([]) | hasChildren([])
```

e.g. a post can only be created with all required fields filled. the createdBy must hold the userId

```
post:
  write: everyCondition(
    hasChildren(['title', 'body', 'createdBy']),
    isAuthId(newProp('createdBy'))
  )
  // newData.hasChildren(['title', 'body', 'createdBy']) && newData.child('createdBy').val() == auth.uid
```

**validation**

```
validate(conditions)

isString
isNumber
isInteger
isBoolean
isNow
```

A lot of paths will only hold validation rules so there's a short-hand function that helps with that.

```
posts/$postId/title:     validate(isString)
posts/$postId/likes:     validate(isNumber)
posts/$postId/archived:  validate(isBoolean)
posts/$postId/createdAt: validate(isNow)
posts/$postId/createdBy: validate(isAuthId(newData))
```

**transformers**

```
toData(string | function)
toNewData(string | function)
```

There will be a time when you want to duplicate a rule so it checks both data and newData.
This transformers will help you building code without having to duplicate it in these situations.

```
const userExists = (userId) => `root.child('users').child(${userId}).exists()`;
const userWillExist = toNewData(userExists);

userExists(child('createdBy')) // root.child('users').child(data.child('createdBy').val()).exists()
userWillExist('$userId') // newDataRoot().child(newData.child('createdBy').val()).exists()
```

See the `newDataRoot()` that appears on the output above? Read below to understand it better.


### New Data Root

Turns out you can't really use the `root` variable when you're dealing with the data that is being added to your database.
This can be a bit of a pain when you're defining reusable rules that will be used on a lot of different paths.

Let me show you what I mean.

```
users/$userId/numberOfPosts:
  validate: 'root.child('posts').child('$userId').numChildren() == newData.val()'
```

The above code would work perfectly if you are increasing the `user/numberOfPosts` prop *after* you've already created the post on the database. But if you're creating the post at the same time you're updating this counter it would not really work. `root` can't be used in the context of the data that is being added. To solve this you would have to do something like this:

```
users/$userId/numberOfPosts:
  validate: 'newData.parent().parent().child('posts').child('$userId').numChildren() == newData.val()'
```

Ugly as can be, right? Not only that you can't really reuse any rule throughout your application because things may be at different depths, so they will require a different number of `parent()` to be called.

Fear not. We've got your back. While we're parsing your rules, we will check for a special keyword `newDataRoot()` and we will replace it with the correct code regarding the path you're using it. Let's see it in action.

```
const numberOfPosts = userId => `newDataRoot().child('posts').child(${userId}).numChildren()`;

users/$userId
  validate: `${numberOfPosts('$userId')} == newData.child('numberOfPosts').val()'  

// 'newData.parent().child('posts').child('$userId').numChildren() == newData.val()'

users/$userId/numberOfPosts:
  validate: `${numberOfPosts('$userId')} == newData.val()'
  
// 'newData.parent().parent().child('posts').child('$userId').numChildren() == newData.val()'

```

This is *really* useful when you're creating data on multiple locations that depend on each other.

---

Created by Georges Boris @ [Tasking](keeptasking.com)
