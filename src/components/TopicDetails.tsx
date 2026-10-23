import { useState } from 'react';
import { Award, BookOpen, Check, Circle, Code2, ExternalLink, ListChecks } from 'lucide-react';
import { catalog } from '../data/catalog';
import type { RoadmapTopic } from '../types/roadmap';
import { TechnologyLogos } from './TechnologyLogos';
import { CertificateCards } from './CertificateCards';

interface Props {
  topic: RoadmapTopic;
  progress: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export function TopicDetails({ topic, progress, onToggle }: Props) {
  const [tab, setTab] = useState<'overview' | 'resources' | 'practice' | 'certificates'>('overview');
  const complete = progress[topic.id] === true;
  const topicResources = topic.resourceIds.map((id) => catalog.resources.find((item) => item.id === id)!);
  const certificates = topicResources.filter((resource) => resource.certificateStatus === 'free');
  const resources = (
    <section className="detail-section">
      <h3><BookOpen size={16} />Learning resources <span className="section-count">{topicResources.length}</span></h3>
      <div className="resource-list">
        {topicResources.map((resource) => (
          <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer">
            <span className="resource-symbol">
              {resource.provider === 'freeCodeCamp'
                ? <img src={`${import.meta.env.BASE_URL}logos/freecodecamp.svg`} width={18} height={18} alt="" />
                : <BookOpen size={17} />}
            </span>
            <span><strong>{resource.title}</strong><small>{resource.provider}</small>
              {resource.certificateStatus === 'free' && <span className="free-certificate-badge">Free certificate</span>}
            </span>
            <ExternalLink size={14} aria-label="Opens in a new tab" />
          </a>
        ))}
      </div>
    </section>
  );

  return (
    <div className="topic-details">
      <div className="detail-heading">
        <span className="technology-symbol"><TechnologyLogos topicId={topic.id} /></span>
        <div><h2>{topic.title}</h2><span className="detail-category">{topic.category}</span></div>
        {topic.optional && <span className="optional-tag">Optional</span>}
      </div>
      <div className="detail-tabs" role="group" aria-label="Topic sections">
        {(['overview', 'resources', 'practice', 'certificates'] as const).map((item) => (
          <button key={item} onClick={() => setTab(item)} aria-pressed={tab === item}
            className={tab === item ? 'active' : ''}>
            {item === 'certificates' ? 'Certificates' : item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
      <div className="detail-scroll">
        {tab === 'overview' && (
          <>
            <p className="detail-summary">{topic.summary}</p>
            <section className="detail-section">
              <h3><ListChecks size={16} />Learning objectives</h3>
              <ul>{topic.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
            </section>
            {resources}
          </>
        )}
        {tab === 'resources' && resources}
        {tab === 'practice' && (
          <section className="detail-section practice-section">
            <h3><Code2 size={16} />Practice</h3>
            {topic.practiceTasks.map((task) => <p key={task}>{task}</p>)}
            <h4>Completion criteria</h4>
            <ul>{topic.acceptanceCriteria.map((criterion) => <li key={criterion}>{criterion}</li>)}</ul>
          </section>
        )}
        {tab === 'certificates' && (
          <section className="detail-section">
            <h3><Award size={16} />Free certificates</h3>
            {certificates.length ? <CertificateCards resources={certificates} />
              : <p>No verified free certificate is linked to this topic yet.</p>}
          </section>
        )}
      </div>
      <button className={`completion-button ${complete ? 'is-complete' : ''}`}
        onClick={() => onToggle(topic.id)} aria-pressed={complete}>
        {complete ? <Check size={16} /> : <Circle size={16} />}
        {complete ? 'Completed' : 'Mark as completed'}
      </button>
    </div>
  );
}
