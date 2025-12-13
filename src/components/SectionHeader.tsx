type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-dark-blue">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-24 h-1 bg-primary rounded-full"></div>
    </div>
  );
}
