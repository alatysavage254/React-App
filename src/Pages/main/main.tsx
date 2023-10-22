import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState, useCallback } from 'react';
import { db } from '../../config/firebase';
import { Post } from './post'

interface PostInterface {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<PostInterface[] | null>(null);
  const postRef = collection(db, "posts"); 

  const getPosts = useCallback(async () => {
    const data = await getDocs(postRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostInterface[]
    );
  }, [postRef]);
 
    useEffect (() => {
      getPosts();
    }, [getPosts]);

    return (
      <div> 
        {postsList?.map((post) => (
          <Post post={post} />
        ))} 
      </div>
    );
  }

  export type { PostInterface };
