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
    <section className={cn('py-12 bg-white', className)} id={id}>
      <ScrollReveal className="container mx-auto min-w-0 px-4">
        {children}
      </ScrollReveal>
    </section>
  );
}
