//   // 2. Find all followers of the user
//   const followers = await Follows.find({ following: userId }).populate('user', '_id');

//   // 3. Create notifications for each follower
//   const notifications = followers.map(follower => ({
//     to: follower.user._id,   // The follower's ID
//     from: userId,            // The user who created the post
//     post: post._id,          // The newly created post
//     type: 'LIKE',            // Notification type, you can adjust it based on your needs
//     content: `${req.user.name} has created a new post.`,
//   }));

//   // 4. Insert notifications into the database
//   await Notifications.insertMany(notifications);