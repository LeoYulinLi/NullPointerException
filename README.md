# NullPointerException
NullPointerException is a Q&A web application tailored towards software developers based off of [Stack Overflow](http://stackoverflow.com/).
Main features include asking question, answer questions, improving each other's posts, and voting.

## Live Demo
https://npe-app.herokuapp.com/

## Technologies
- Ruby on Rails
- React
- Redux
- PostgreSQL
- Webpack

## Features
### User Auth
- Signup
![SignUp](github/signup.gif)
- Login
- Login as demo

### Ask Question
![Ask](github/ask.gif)

### Answer Question
![Answer](github/answer.gif)

### Edit Posts
![Edit](github/edit.gif)
- Can edit own post
- Can edit other people's post
- Editing is actually creating a new revision rather then overwriting the original one


### Vote on Posts
![Vote](github/vote.gif)

### Search
![Search](github/search.gif)

## Random Stuff

### What is up with the name `NullPointerException`?
`StackOverflow` is a common runtime error in programs, and `NullPointerException` is even more prominent.
It happens when the program try to access some properties of null objects.
The name `NullPointerException` is specific to JVM languages, and it is similar to
`TypeError: Cannot read property 'foo' of undefined` in JavaScript or
`NoMethodError: undefined method 'foo' for nil:NilClass` in ruby. 
