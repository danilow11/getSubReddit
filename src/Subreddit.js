import React, { useState, useEffect, useMemo } from 'react';
import RedditPost from './RedditPost';

function Subreddit({ getThis }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${getThis}.json`)
      .then(res => res.json())
      .then(json => {
        if (json.data)
        setPosts(json.data.children.map(c => c.data))
        else console.log('no exists');
      })
      .catch((error) => {
        console.error('Errorrr:', error);
      });
  }, [getThis, setPosts]);

  const handleUpvote = postId => {
    setPosts(prevPosts => {
      const postIndex = prevPosts.findIndex(
        post => post.id === postId
      );

      const copyPosts = [...prevPosts];
      
      copyPosts[postIndex] = {
        ...copyPosts[postIndex],
        score: copyPosts[postIndex].score + 1
      };

      return copyPosts;
    });
  };

  const handleDownvote = postId => {
    setPosts(prevPosts => {
      const postIndex = prevPosts.findIndex(
        post => post.id === postId
      );

      const copyPosts = [...prevPosts];
      
      copyPosts[postIndex] = {
        ...copyPosts[postIndex],
        score: copyPosts[postIndex].score - 1
      };

      return copyPosts;
    });
  };

  const redditListing = useMemo(() => {
    return (
      <ul className="reddit-listing">
        {posts
          .sort((p1, p2) => p2.score - p1.score)
          .map(post =>
            <li key={post.id}>
              <RedditPost post={post}
                onUpvote={handleUpvote}
                onDownvote={handleDownvote}
              />
            </li>
        )}
      </ul>
    )
  }, [posts]);

  return redditListing;
}

export default Subreddit;
