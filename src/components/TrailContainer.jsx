"use client";

import React, { useEffect, useRef } from "react";

const TrailContainer = () => {
  const trailContainerRef = useRef(null);
  const animationRef = useRef(0);
  const trailRef = useRef([]);
  const currentImageIndex = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const interpMousePos = useRef({ x: 0, y: 0 });
  const isDesktop = useRef(false);

  

  useEffect(() => {
    const config = {
      imageLifeSpan: 1000,
      mouseThreshold: 80,
      inDuration: 600,
      outDuration: 800,
      staggerIn: 30,
      staggerOut: 20,
      slideDuration: 1000,
      slideEasing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      easing: "cubic-bezier(0.87, 0, 0, 0.13, 1)",
    };

    const trailImageCount = 20;
    const images = Array.from(
      { length: trailImageCount },
      (_, i) => `/trail-image/img${i + 1}.jpg`
    );

    const container = trailContainerRef.current;
    if (!container) return;

    isDesktop.current = window.innerWidth > 1000;

    const lerp = (a, b, n) => (1 - n) * a + n * b;
    const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

    const getMouseDistance = () =>
      distance(mousePos.current.x, mousePos.current.y, lastMousePos.current.x, lastMousePos.current.y);

    const isInContainer = (x, y) => {
      const rect = container.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    const createTrailImage = () => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("trail-img");

      const imgSrc = images[currentImageIndex.current];
      currentImageIndex.current = (currentImageIndex.current + 1) % trailImageCount;

      const rect = container.getBoundingClientRect();
      const startX = interpMousePos.current.x - rect.left - 87.5;
      const startY = interpMousePos.current.y - rect.top - 87.5;
      const targetX = mousePos.current.x - rect.left - 87.5;
      const targetY = mousePos.current.y - rect.top - 87.5;

      imgContainer.style.left = `${startX}px`;
      imgContainer.style.top = `${startY}px`;
      imgContainer.style.transition = `left ${config.slideDuration}ms ${config.slideEasing}, top ${config.slideDuration}ms ${config.slideEasing}`;

      const maskLayers = [];
      const imgLayers = [];

      for (let i = 0; i < 10; i++) {
        const layer = document.createElement("div");
        layer.classList.add("mask-layer");

        const imgLayer = document.createElement("div");
        imgLayer.classList.add("image-layer");
        imgLayer.style.backgroundImage = `url(${imgSrc})`;

        const y1 = i * 10;
        const y2 = (i + 1) * 10;

        layer.style.clipPath = `polygon(50% ${y1}%, 50% ${y1}%, 50% ${y2}%, 50% ${y2}%)`;
        layer.style.transition = `clip-path ${config.inDuration}ms ${config.easing}`;
        layer.style.backfaceVisibility = "hidden";
        layer.style.transform = "translateZ(0)";

        layer.appendChild(imgLayer);
        imgContainer.appendChild(layer);
        maskLayers.push(layer);
        imgLayers.push(imgLayer);
      }

      container.appendChild(imgContainer);

      requestAnimationFrame(() => {
        imgContainer.style.left = `${targetX}px`;
        imgContainer.style.top = `${targetY}px`;

        maskLayers.forEach((layer, i) => {
          const y1 = i * 10;
          const y2 = (i + 1) * 10;
          const delay = Math.abs(i - 4.5) * config.staggerIn;

          setTimeout(() => {
            layer.style.clipPath = `polygon(0% ${y1}%, 100% ${y1}%, 100% ${y2}%, 0% ${y2}%)`;
          }, delay);
        });
      });

      trailRef.current.push({
        element: imgContainer,
        maskLayers,
        imgLayers,
        removeTime: Date.now() + config.imageLifeSpan,
      });
    };

    const removeOldImages = () => {
      const now = Date.now();
      if (!trailRef.current.length) return;

      const oldest = trailRef.current[0];
      if (now >= oldest.removeTime) {
        trailRef.current.shift();

        oldest.maskLayers.forEach((layer, i) => {
          const y1 = i * 10;
          const y2 = (i + 1) * 10;
          const delay = (4.5 - Math.abs(i - 4.5)) * config.staggerOut;

          layer.style.transition = `clip-path ${config.outDuration}ms ${config.easing}`;
          setTimeout(() => {
            layer.style.clipPath = `polygon(50% ${y1}%, 50% ${y1}%, 50% ${y2}%, 50% ${y2}%)`;
          }, delay);
        });

        oldest.imgLayers.forEach((img) => {
          img.style.transition = `opacity ${config.outDuration}ms ${config.easing}`;
          img.style.opacity = "0.2";
        });

        setTimeout(() => {
          if (oldest.element.parentNode) {
            oldest.element.parentNode.removeChild(oldest.element);
          }
        }, config.outDuration + 100);
      }
    };

    const render = () => {
      if (!isDesktop.current) return;

      interpMousePos.current.x = lerp(interpMousePos.current.x, mousePos.current.x, 0.15);
      interpMousePos.current.y = lerp(interpMousePos.current.y, mousePos.current.y, 0.15);

      const dist = getMouseDistance();
      if (dist > config.mouseThreshold && isInContainer(mousePos.current.x, mousePos.current.y)) {
        createTrailImage();
        lastMousePos.current = { ...mousePos.current };
      }

      removeOldImages();
      animationRef.current = requestAnimationFrame(render);
    };

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const start = () => {
      document.addEventListener("mousemove", handleMouseMove);
      animationRef.current = requestAnimationFrame(render);
    };

    const stop = () => {
      cancelAnimationFrame(animationRef.current);
      document.removeEventListener("mousemove", handleMouseMove);
      trailRef.current.forEach((item) => {
        item.element?.parentNode?.removeChild(item.element);
      });
      trailRef.current.length = 0;
    };

    const onResize = () => {
      const wasDesktop = isDesktop.current;
      isDesktop.current = window.innerWidth > 1000;
      if (isDesktop.current && !wasDesktop) {
        start();
      } else if (!isDesktop.current && wasDesktop) {
        stop();
      }
    };

    window.addEventListener("resize", onResize);
    if (isDesktop.current) start();

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <div className="trail-container" ref={trailContainerRef}></div>;
};

export default TrailContainer;
