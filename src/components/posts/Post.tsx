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
    <div className="bg-surface min-w-0 w-full rounded-2xl border border-border h-auto p-4 sm:p-5">
      <div className="w-full min-h-14 flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center">
          <img className="rounded-full w-10 h-10 mr-3 shrink-0 object-cover" src={post.user.photo} />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold break-words [overflow-wrap:anywhere]">{post.user.name}</h3>
            <p className="text-xs text-text-secondary">{formatRelativeTime(post.createdAt)}</p>
          </div>
        </div>
        {post.user._id === userData?._id && (
          <>
            <div className="flex shrink-0 flex-row justify-center items-center gap-2 text-text-secondary">
              <DeletePost postId={post._id} postIsDeleted={postIsDeleted}/>
              <Pen className="cursor-pointer rounded-lg p-2 w-9 h-9 hover:bg-elevated hover:text-secondary" onClick={() => setIsEditing(true)} />
            </div>
          </>
        )}
      </div>
      {isEditing ? <EditPost postId={post._id} body={post.body} onCancel={() => setIsEditing(false)} image={post.image} /> : post.body && <Link to={`/posts/${post._id}`} className="mt-3 block whitespace-pre-wrap break-words [overflow-wrap:anywhere] text-sm leading-7">{post.body}</Link>}
      {post.image && (
        <Link to={`/posts/${post._id}`}>
          <img src={post.image} className="w-full max-h-[560px] object-contain rounded-xl bg-background mt-4" alt={post.user.name} />
        </Link>
      )}
      <div className="w-full min-h-8 flex items-center my-3 text-xs sm:text-sm">
        <div className="bg-primary z-10 w-5 h-5 rounded-full flex items-center justify-center">
          <svg
            className="w-3 h-3 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
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
            width={18}
            height={18}
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
      <div className="grid grid-cols-3 gap-1 w-full my-3 border-t pt-3 border-border">
        <button className="flex min-w-0 flex-row justify-center items-center gap-1.5 rounded-lg py-2 cursor-pointer text-text-secondary hover:bg-elevated hover:text-secondary transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          <span className="font-medium text-xs sm:text-sm">Like</span>
        </button>
        <button className="flex min-w-0 flex-row justify-center items-center gap-1.5 rounded-lg py-2 cursor-pointer text-text-secondary hover:bg-elevated hover:text-secondary transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="font-medium text-xs sm:text-sm">Comment</span>
        </button>
        <button className="flex min-w-0 flex-row justify-center items-center gap-1.5 rounded-lg py-2 cursor-pointer text-text-secondary hover:bg-elevated hover:text-secondary transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
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
          <span className="font-medium text-xs sm:text-sm">Share</span>
        </button>
      </div>

      {post.topComment && showTopComment && <Comment comment={post.topComment} />}
    </div>
  )
}
