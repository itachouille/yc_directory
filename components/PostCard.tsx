import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Author, Post } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";

export type PostTypeCard = Omit<Post, "author"> & { author?: Author };

const PostCard = ({ post }: { post: PostTypeCard }) => {
  const {
    _id,
    image,
    _createdAt,
    views,
    author,
    title,
    category,
    description,
  } = post;

  return (
    <li className="post-card group">
      <div className="flex-between">
        <p className="post-card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary group-hover:text-black" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/post/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`user/${author?._id}`}>
          <Image
            src={author?.image}
            alt={author?.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/post/${_id}`}>
        <p className="post-card_desc">{description}</p>
        <img src={image} alt="post image" className="post-card_img" />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="post-card_btn" asChild>
          <Link href={`/post/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default PostCard;

export const PostCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="post-card_skeleton" />
      </li>
    ))}
  </>
);
