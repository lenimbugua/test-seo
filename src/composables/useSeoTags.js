import { useHead, useSeoMeta } from "@unhead/vue";

export function useSeoTags({ title, description, canonicalUrl }) {
  useHead({
    htmlAttrs: { lang: "en" },
    link: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
    ],
  });

  useSeoMeta({
    title: title,
    titleTemplate: "%s | HakiBets",
    description: description,
  });
}
