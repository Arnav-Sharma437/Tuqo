/**
 * Utility functions for parsing, validating, and embedding product videos
 * Supports YouTube (watch, embed, shorts, youtu.be), Vimeo, and direct MP4/WebM video files.
 */

export interface ParsedVideo {
  type: "youtube" | "vimeo" | "direct" | "unknown";
  embedUrl: string;
  originalUrl: string;
  videoId?: string;
  thumbnailUrl?: string;
}

export function parseVideoUrl(url?: string): ParsedVideo | null {
  if (!url || typeof url !== "string") return null;
  const cleanUrl = url.trim();
  if (!cleanUrl) return null;

  // 1. YouTube formats:
  // - youtube.com/watch?v=ID
  // - youtu.be/ID
  // - youtube.com/embed/ID
  // - youtube.com/shorts/ID
  // - m.youtube.com/watch?v=ID
  const ytMatch = cleanUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
      originalUrl: cleanUrl,
      videoId,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    };
  }

  // 2. Vimeo formats:
  // - vimeo.com/ID
  // - player.vimeo.com/video/ID
  const vimeoMatch = cleanUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    const videoId = vimeoMatch[1];
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`,
      originalUrl: cleanUrl,
      videoId,
    };
  }

  // 3. Direct video file (mp4, webm, ogg, mov, or Cloudinary /video/ URL)
  if (
    cleanUrl.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) ||
    (cleanUrl.includes("res.cloudinary.com") && cleanUrl.includes("/video/"))
  ) {
    return {
      type: "direct",
      embedUrl: cleanUrl,
      originalUrl: cleanUrl,
    };
  }

  // Fallback for general http/https link
  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    return {
      type: "direct",
      embedUrl: cleanUrl,
      originalUrl: cleanUrl,
    };
  }

  return null;
}
