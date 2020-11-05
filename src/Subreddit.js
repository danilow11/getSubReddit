import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import RedditPost from './RedditPost';
import ErrorMessage from './ErrorMessage';

function Subreddit({ getThis }) {
  const [posts, setPosts] = useState([]);
  const [errorMsg, setDisErrorMsg] = useState(false);
  const errorText = "There was a problem trying to get the subreddit or it doesn't exist, please try again.";

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${getThis}.json`)
      .then(res => res.json())
      .then(json => {
        if (json.data) {
          setPosts(json.data.children.map(c => c.data));
          setDisErrorMsg(false);
        } else {
          setDisErrorMsg(true);
        }
      })
      .catch((error) => {
        setDisErrorMsg(true);
        console.error(error);
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
    return errorMsg ?
      <ErrorMessage text={errorText}/> :
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
      </ul>;
  }, [posts, errorMsg]);

  return redditListing;
}
Subreddit.propTypes = {
  getThis: PropTypes.string.isRequired
};

export default Subreddit;
