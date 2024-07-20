import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Duurzaaminvesteren.nl tracker",
    short_name: "Duurzaaminvesteren.nl tracker",
    description: "Keep an eye on your project on Duurzaaminvesteren.nl",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#f5fcf9",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
