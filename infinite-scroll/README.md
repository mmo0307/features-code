# Infinite Scroll

*Install*
> npm install --save react-infinite-scroll-component

```
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

const App = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 500) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setItems((prevItems) => prevItems.concat(Array.from({ length: 20 })));
    }, 500);
  };

  return (
    <div>
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height={400}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((i, index) => (
          <div style={style} key={index}>
            div - #{index}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default App;
```

Create Infinite Scroll Component

```
import { useCallback, useEffect, useRef, useState } from "react"
import "./styles.css"

export function parseLinkHeader(linkHeader) {
  if (!linkHeader) return {}
  const links = linkHeader.split(",")
  const parsedLinks = {}
  links.forEach(link => {
    const url = link.match(/<(.*)>/)[1]
    const rel = link.match(/rel="(.*)"/)[1]
    parsedLinks[rel] = url
  })
  return parsedLinks
}

const LIMIT = 50

export default function App() {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const nextPhotoUrlRef = useRef()

  async function fetchPhotos(url, { overwrite = false } = {}) {
    setIsLoading(true)
    try {
      await new Promise(res => setTimeout(res, 2000))
      const res = await fetch(url)
      nextPhotoUrlRef.current = parseLinkHeader(res.headers.get("Link")).next
      const photos = await res.json()
      if (overwrite) {
        setPhotos(photos)
      } else {
        setPhotos(prevPhotos => {
          return [...prevPhotos, ...photos]
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const imageRef = useCallback(image => {
    if (image == null || nextPhotoUrlRef.current == null) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchPhotos(nextPhotoUrlRef.current)
        observer.unobserve(image)
      }
    })

    observer.observe(image)
  }, [])

  useEffect(() => {
    fetchPhotos(
      `http://localhost:3000/photos-short-list?_page=1&_limit=${LIMIT}`,
      {
        overwrite: true,
      }
    )
  }, [])

  return (
    <div className="grid">
      {photos.map((photo, index) => (
        <img
          src={photo.url}
          key={photo.id}
          ref={index === photos.length - 1 ? imageRef : undefined}
        />
      ))}
      {isLoading &&
        Array.from({ length: LIMIT }, (_, index) => index).map(n => {
          return (
            <div key={n} className="skeleton">
              Loading...
            </div>
          )
        })}
    </div>
  )
}
```