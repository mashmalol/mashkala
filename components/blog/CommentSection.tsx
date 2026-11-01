"use client";

import { useState, type FormEvent } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface Comment {
  id: string;
  name: string;
  text: string;
  date: string;
}

/** Seeded with nothing — replace with your own comment source. */
const INITIAL_COMMENTS: Comment[] = [];

export interface CommentSectionProps {
  articleId: string;
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !text.trim()) {
      setError("لطفاً نام و متن دیدگاه را وارد کنید");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    window.setTimeout(() => {
      setComments((current) => [
        { id: `${articleId}-${Date.now()}`, name: name.trim(), text: text.trim(), date: "همین الان" },
        ...current,
      ]);
      setName("");
      setText("");
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <section className="comment-section">
      <h2>دیدگاه‌ها ({comments.length.toLocaleString("fa-IR")})</h2>

      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="comment-form-row">
          <label htmlFor="comment-name">نام</label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="نام خود را وارد کنید"
          />
        </div>
        <div className="comment-form-row">
          <label htmlFor="comment-text">دیدگاه شما</label>
          <textarea
            id="comment-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="نظر خود را بنویسید..."
            rows={4}
          />
        </div>
        {error ? (
          <p className="comment-form-error" role="alert">
            {error}
          </p>
        ) : null}
        <button type="submit" className="comment-form-submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner" aria-hidden="true" />
              در حال ارسال...
            </>
          ) : (
            "ارسال دیدگاه"
          )}
        </button>
      </form>

      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-list-item">
            <div className="comment-avatar">
              <MaterialIcon name="account_circle" />
            </div>
            <div className="comment-body">
              <div className="comment-heading">
                <span className="comment-author">{comment.name}</span>
                <span className="comment-date">{comment.date}</span>
              </div>
              <p>{comment.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
