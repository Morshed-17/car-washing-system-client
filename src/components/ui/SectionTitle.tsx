// SectionTitle.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle,
  className,
  centered = true
}) => {
  return (
    <div className={cn(
      'space-y-4',
      centered && 'text-center',
      className
    )}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        className={cn(
          "h-1 w-20 bg-primary/30 rounded-full",
          centered ? "mx-auto" : "ml-0"
        )}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;