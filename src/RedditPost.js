import React from 'react';
import Thumbnail from './Thumbnail';
import Time from './Time';
import Voting from './Voting';

function RedditPost({ post, onUpvote, onDownvote }) {

  return (
    <div className="reddit-post">
      <Voting post={post}
        onUpvote={() => onUpvote(post.id)}
        onDownvote={() => onDownvote(post.id)} />
      <Thumbnail post={post}/>
      <div className="content">
        <h3 className="title">
          <a href={post.url} target="_blank" rel="noreferrer">{post.title}</a>
        </h3>
        <div className="submitted">
          Submitted <Time time={post.created} isUnixTime={true}/>
        </div>
        <a className="comments" href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noreferrer">
          {post.num_comments} comments
        </a>
        <span className="action">share</span>
        <span className="action">save</span>
        <span className="action">hide</span>
      </div>
    </div>
  );
}

export default RedditPost;
