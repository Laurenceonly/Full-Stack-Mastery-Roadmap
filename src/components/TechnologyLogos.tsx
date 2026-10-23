import { technologies } from '../data/technologies';

export function TechnologyLogos({ topicId, compact = false }: { topicId: string; compact?: boolean }) {
  return (
    <span className={`technology-logos ${compact ? 'compact-logos' : ''}`} aria-hidden="true">
      {technologies[topicId].map((technology) => (
        <img key={technology.name} src={`${import.meta.env.BASE_URL}logos/${technology.logo}.svg`}
          alt="" title={technology.name} width={compact ? 15 : 28} height={compact ? 15 : 28} />
      ))}
    </span>
  );
}
