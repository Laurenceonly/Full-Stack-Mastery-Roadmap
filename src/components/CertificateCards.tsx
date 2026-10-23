import { Award, ArrowUpRight } from 'lucide-react';
import type { LearningResource } from '../types/roadmap';

export function CertificateCards({ resources }: { resources: readonly LearningResource[] }) {
  return (
    <div className="certificate-list">
      {resources.map((resource) => (
        <article className="certificate-card" key={resource.id}>
          <div className="certificate-heading"><Award size={19} /><span>Free certificate</span></div>
          <a className="certificate-title" href={resource.url} target="_blank" rel="noopener noreferrer">
            {resource.title}<ArrowUpRight size={14} />
          </a>
          <span className="certificate-provider">{resource.provider}</span>
          <p>{resource.certificateRequirements}</p>
          <a className="verification-link" href={resource.verificationUrl} target="_blank" rel="noopener noreferrer">
            Provider requirements · Checked {resource.verifiedAt}<ArrowUpRight size={11} />
          </a>
        </article>
      ))}
    </div>
  );
}
