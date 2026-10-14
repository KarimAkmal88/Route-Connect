import { Pen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import formatRelativeTime from "../../helpers/timeFormat";
import { useAuth } from "../../hooks/useAuth";
import type { PostI } from "../../interfaces/postI";
import Comment from "../Comment";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";



export default function Post({ post, showTopComment, postIsDeleted }: { post: PostI; showTopComment: boolean; postIsDeleted?: () => void }) {

  const { userData } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="bg-elevated w-full rounded-md shadow-md h-auto py-3 my-3">
      <div className="w-full h-16 flex items-center justify-between">
        <div className="flex">
          <img className="rounded-full w-10 h-10 mr-3" src={post.user.photo} />
          <div>
            <h3 className="text-medium font-semibold">{post.user.name}</h3>
            <p className="text-xs text-text-secondary">{formatRelativeTime(post.createdAt)}</p>
          </div>
        </div>
        {post.user._id === userData?._id && (
          <>
            <div className="flex flex-row justify-center items-center gap-3.5">
              <DeletePost postId={post._id} postIsDeleted={postIsDeleted}/>
              <Pen className="cursor-pointer" onClick={() => setIsEditing(true)} />
            </div>
          </>
        )}
      </div>
      {isEditing ? <EditPost postId={post._id} body={post.body} onCancel={() => setIsEditing(false)} image={post.image} /> : post.body && <Link to={`/posts/${post._id}`} className="mt-4">{post.body}</Link>}
      {post.image && (
        <Link to={`/posts/${post._id}`}>
          <img src={post.image} className="w-full object-cover mt-2" alt={post.user.name} />
        </Link>
      )}
      <div className="w-full h-8 flex items-center px-3 my-3">
        <div className="bg-primary z-10 w-5 h-5 rounded-full flex items-center justify-center">
          <svg
            className="w-3 h-3 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
        </div>
        <div className="bg-secondary w-5 h-5 rounded-full flex items-center justify-center -ml-1">
          <svg
            className="w-3 h-3 fill-current stroke-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <div className="w-full flex justify-between">
          <p className="ml-3 text-text-secondary">{post.likesCount} {post.likesCount === 1 ? `Like` : `Likes`}</p>
          <p className="ml-3 text-text-secondary">{post.commentsCount} {post.commentsCount === 1 ? `Comment` : `Comments`}</p>
        </div>
      </div>
      <div className="flex justify-around w-full px-5 my-3 border-t pt-4 border-divider ">
        <button className="flex flex-row justify-center items-center space-x-3 cursor-pointer w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#838383"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          <span className="font-semibold text-lg text-gray-600">Like</span>
        </button>
        <button className="flex flex-row justify-center items-center space-x-3 cursor-pointer w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#838383"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="font-semibold text-lg text-gray-600">Comment</span>
        </button>
        <button className="flex flex-row justify-center items-center space-x-3 cursor-pointer w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#838383"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <circle cx={18} cy={5} r={3} />
            <circle cx={6} cy={12} r={3} />
            <circle cx={18} cy={19} r={3} />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span className="font-semibold text-lg text-gray-600">Share</span>
        </button>
      </div>

      {post.topComment && showTopComment && <Comment comment={post.topComment} />}
    </div>
  )
}
