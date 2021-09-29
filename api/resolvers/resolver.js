const Issue = require("../models/issues");
const User = require("../models/User");

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({});
      return users;
    },
    issues: async () => {
      const issues = await Issue.find({});
      return issues;
    },
    userByID: async (_, { _id }) => {
      const users = await User.find({ _id: _id });

      return users;
    },
    issueById: async (_, { _id }) => {
      const issues = await Issue.find({ userID: _id });

      return issues;
    },
    userByName: async (_, { username }) => {
      const users = await User.find({ username: username });

      return users;
    },
  },
  Mutation: {
    createUser: async (_, { username, password, admin, _id }) => {
      const user = new User({ username, password, admin, _id });
      await user.save();
      return user;
    },
    createIssue: async (
      _,
      { title, description, upvote, downvote, userID }
    ) => {
      const issue = new Issue({ title, description, upvote, downvote, userID });
      await issue.save();
      return issue;
    },
    deleteUser: async (_, { _id }) => {
      const deletedUser = await User.deleteOne({ _id: _id });
      if (deletedUser.deletedCount) {
        const deletedPosts = await Issue.deleteMany({ userID: _id });
        return true;
      }
      return false;
    },
    deleteIssue: async (_, { _id }) => {
      const deletedIssue = await Issue.deleteOne({ _id: _id });
      if (deletedIssue.deletedCount) {
        return true;
      }
      return false;
    },
    commentIssue: async (_, { _id, comment }) => {
      const issueComment = await Issue.updateOne(
        { _id: _id },
        { $push: { comments: comment } }
      );

      if (issueComment.modifiedCount) {
        return true;
      }

      return false;
    },
    commentIssue: async (_, { _id, comment }) => {
      const issueComment = await Issue.updateOne(
        { _id: _id },
        { $push: { comments: comment } }
      );

      if (issueComment.modifiedCount) {
        return true;
      }

      return false;
    },
    upvote: async (_, { _id, vote, userID }) => {
      const user = userID
      const before = await Issue.find({_id:_id, voted:userID})
      
     if(before.length >=1 ){
       return false; 
     }
      if (vote === 1) {
        const upvotes = await Issue.find({ _id: _id }, { upvote: 1 });
        console.log(upvotes[0].upvote);
        const voted = await Issue.updateOne(
          { _id: _id },
          { upvote: upvotes[0].upvote + 1, $push: { voted: userID } }
        );
      } else if (vote === 0) {
        const upvotes = await Issue.find({ _id: _id }, { downvote: 1 });
        console.log(upvotes[0].downvote);
        const voted = await Issue.updateOne(
          { _id: _id },
          { downvote: upvotes[0].downvote+ 1, $push: { voted: userID } }
        );
      }

     
      return true;
    },
  },
};

module.exports = resolvers;
