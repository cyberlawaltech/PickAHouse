"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="preloader">
          <div className="flex flex-col items-center gap-4">
            {/* eBay-style colorful logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-baseline"
            >
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.5, delay: 0, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5 }}
                className="text-4xl font-bold text-ebay-red"
              >
                p
              </motion.span>
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.5, delay: 0.1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5 }}
                className="text-4xl font-bold text-ebay-blue"
              >
                i
              </motion.span>
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.5, delay: 0.2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5 }}
                className="text-4xl font-bold text-ebay-yellow"
              >
                c
              </motion.span>
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.5, delay: 0.3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5 }}
                className="text-4xl font-bold text-ebay-green"
              >
                k
              </motion.span>
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.5, delay: 0.4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5 }}
                className="text-4xl font-bold text-ebay-red"
              >
                a
              </motion.span>
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.5, delay: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5 }}
                className="text-4xl font-bold text-ebay-blue"
              >
                h
              </motion.span>
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.5, delay: 0.6, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5 }}
                className="text-4xl font-bold text-ebay-yellow"
              >
                o
              </motion.span>
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.5, delay: 0.7, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5 }}
                className="text-4xl font-bold text-ebay-green"
              >
                u
              </motion.span>
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.5, delay: 0.8, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5 }}
                className="text-4xl font-bold text-ebay-red"
              >
                s
              </motion.span>
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.5, delay: 0.9, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5 }}
                className="text-4xl font-bold text-ebay-blue"
              >
                e
              </motion.span>
            </motion.div>

            {/* Loading spinner */}
            <div className="preloader-spinner" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
