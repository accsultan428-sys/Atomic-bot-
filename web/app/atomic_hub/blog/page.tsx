/*
 * Atomicals Bot for Discord
 * Copyright (C) 2026 Atomicals LancarJaya
 *
 * Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * You may not use this file except in compliance with the License.
 * See the LICENSE file for more information.
 */

import { Metadata }          from "next"
import { BlogList }           from "@/components/features/blog/blog_list"
import { get_all_blog_posts } from "@/lib/blog"

// !!! metadata !!! \\

export const metadata: Metadata = {
  title      : "Blog — Atomic",
  description: "Development updates, system breakdowns, and engineering notes from the Atomic team.",
}

// !!! page !!! \\

export default async function BlogListPage() {
  const posts = await get_all_blog_posts()

  return <BlogList posts={posts} />
}
