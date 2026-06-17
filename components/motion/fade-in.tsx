"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/animations";

type FadeInProps = HTMLMotionProps<"div"> & {
  variant?: "fade" | "up";
  delay?: number;
};

export function FadeIn({
  children,
  variant = "up",
  delay = 0,
  className,
  ...props
}: FadeInProps) {
  const variants = variant === "fade" ? fadeIn : fadeUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} className={className} {...props}>
      {children}
    </motion.div>
  );
}
