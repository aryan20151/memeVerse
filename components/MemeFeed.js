"use client";

import React, { useState, useEffect, useRef } from "react";

const MemeFeed = () => {
  const [memes, setMemes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    fetchMemes(page);
  }, [page]);

  const fetchMemes = async (pageNumber) => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/memes?page=${pageNumber}`);
      const data = await res.json();

      if (data.memes.length > 0) {
        setMemes((prev) => [...prev, ...data.memes]);
        setPage(data.nextPage ? data.nextPage : null);
        setHasMore(!!data.nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch memes:", error);
    }
    setLoading(false);
  };

  const lastMemeRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => (prev ? prev + 1 : null));
        }
      },
      { threshold: 1 }
    );
    if (node) observer.current.observe(node);
  };

  return (
    <div className="w-full flex flex-col items-center text-white">
      <div className="w-full max-w-lg">
        {memes.map((meme, index) => (
          <div
            key={meme._id}
            ref={index === memes.length - 1 ? lastMemeRef : null}
            className="w-full p-4"
          >
            <img
              src={meme.imageUrl}
              alt={meme.caption}
              className="rounded-lg w-full shadow-md"
            />
            <p className="text-gray-300 mt-2">{meme.caption}</p>
            <p className="text-sm text-gray-500">
              Uploaded by {meme.uploaderName}
            </p>
          </div>
        ))}
      </div>

      {loading && <p className="text-gray-400 mt-4">Loading more memes...</p>}
      {!hasMore && <p className="text-gray-400 mt-4">No more memes to show.</p>}
    </div>
  );
};

export default MemeFeed;
