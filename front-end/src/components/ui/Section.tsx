import { cn } from '../../lib/utils';
import ScrollReveal from './ScrollReveal';
export default function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={cn('scroll-mt-28 bg-white py-12', className)} id={id}>
      <ScrollReveal stagger className="container mx-auto min-w-0 px-4">
        {children}
      </ScrollReveal>
    </section>
  );
}
