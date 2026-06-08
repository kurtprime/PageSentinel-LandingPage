'use client'

import { motion } from 'framer-motion'
import { PostCard } from '@/components/blog/post-card'
import type { PostMeta } from '@/lib/post-types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

interface BlogGridProps {
  posts: PostMeta[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </motion.div>
  )
}
