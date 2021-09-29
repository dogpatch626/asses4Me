// assessment #4 - MERN-QL

// You must complete the assessment by the beginning of class Tuesday 
// September 21th @ 10:00am est. Handed in via github classroom: https://classroom.github.com/a/UoxAtcd-
// Once finished, please book your code review with me via the following link: https://calendly.com/patrick-morgan-bkny/c136-assessment-4
// AND email or DM me that you have finished and merged your final branch

// Section One: Climate Action 101
// Focused => User Oriented, User Friendly, Developer Friendly, Stability, Completion

// Purpose: Create a full-stack application with user authentication created with Node, React, Express, GraphQL & Apollo, Mongoose & Mongodb, Jest & Mocha & Chai & Enzyme.
// that allows users to post and upvote or downvote climate issues.

// This is a fully functional front-end and back-end application including a persistent database and user authentication. 
// It will push you to create a fully responsive user-driven application.

// Getting Started:
// Step-1: Plan It
// Create a component tree mock up or wireframe outlining your project, include all associated 
// directories, external node modules, routes, schemas, programs you will need ... etc. Screenshot/videocast/gif or hand these 
// in via your PR or assets folder.

// Step-2: Backend Routes & ORM
// Using Node.js, Express.js, Mongoose, MongoDB, GraphQL, Apollo, and Postman create all CRUD routes
// Follow TDD by testing only ONE router using Mocha and Chai, I will leave the database and query design up to you.
// Screenshot, videocast/screen-record, or gif these routes working and include them in your PR or assets folder.

// Step-3: Consuming Your API Client Side
// Within a Client folder create a font end application using React.js that allows for:
//   A login/signup page that is required to visit any part of the application.
//   A web page that shows a list of climate issues.
//        Each issue will have a title.
//        Each issue will have a description.
//        Each issue can be upvoted or downvoted.
//             Users should only be able to upvote/downvote once per issue.
//        Issues will be ordered by upvotes (the most being at the top).
//        Each issue should show the total number of votes.
//   Include a page that will allow logged-in users to add new issues.
//   Include a page that will allow logged-in users to view all issues they personally made.
//   Users can comment on issues (unlimited number of comments per issue).
// Follow TDD by testing some components with Jest, try for at least one non-shallow render. Look for places you would want to
// add documentation (https://jestjs.io/docs/tutorial-react, https://www.smashingmagazine.com/2020/06/practical-guide-testing-react-applications-jest/)

// Step-4: Styling
// Make you entire application fully-styled and responsive per the past requirements.

// Outcome:
// A login/signup page that is required to visit any part of the application.
// A web page that shows a list of climate issues.
//   Each issue will have a title.
//   Each issue will have a description.
//   Each issue can be upvoted or downvoted.
//        Users should only be able to upvote/downvote once per issue.
//   Issues will be ordered by upvotes (the most being at the top).
//   Each issue should show the total number of votes
// Include a page that will allow logged-in users to add new issues.
// Include a page that will allow logged-in users to view all issues they personally made.
// Users can comment on issues (unlimited number of comments per post)
// You will create a back end so that all topics, comments, and votes are persistent.
// Use React for the front-end
// Use Node/Express for the back-end
// Use MongoDB and Mongoose for your database and models
// Use GraphQL & Apollo for querying
// Use dotenv, jsonwebtoken, expressJwt, & bcrypt to manage user authentication
// The application must be fully styled & responsive


// Suggestions:

// Models
// Consider making the following models:
//   User.js
//   Issue.js (related to the user that created it)
//   Comment.js (related to the issue it was commented on, and related to the user that created the comment)

// Context
// Due to the amount of functionality, consider using 2 context providers. One that manages the authentication/user functionality of the app, 
// and another that manages the issues and comments.

// State
// Due to the amount of state and state update operations, you may need, consider using useReducer to manage context state. Using useState will work as well.

// Relationships
// You will need to manage one to many & many to many database relationships. 
//   The one to many relationships will be relating the user to issues, and relating the comments to users and to issues. 
//   The many to many relationships will be part of the upvote/downvote process as issues can be upvoted/downvoted by many users, 
//   and many users can upvote/downvote many issues. This will be needed to make sure that an "issue" can only be upvoted/downvoted once per user.