import { useEffect, useRef, useState } from 'react';
import {
  ReactFlow, Background, Controls, MarkerType, type Node, type Edge,
} from '@xyflow/react';
import {
  ArrowRight, Award, BookOpen, Check, CheckCircle2, ChevronRight, Circle, Code2,
  Database, Layers, LayoutGrid, Map, Search, Server, ShieldCheck,
  Smartphone, X,
} from 'lucide-react';
import '@xyflow/react/dist/style.css';
import './App.css';
import { catalog } from './data/catalog';
import { tracks } from './data/tracks';
import { summarizeProgress } from './domain/progress';
import { getRoadmapPositions } from './features/roadmap/graph';
import { TopicDetails } from './components/TopicDetails';
import { TechnologyLogos } from './components/TechnologyLogos';
import { CertificateCards } from './components/CertificateCards';

const icons = {
  foundations: BookOpen, frontend: Code2, backend: Server,
  database: Database, mobile: Smartphone, delivery: ShieldCheck,
};
const positions = getRoadmapPositions(catalog);
const edges: Edge[] = catalog.topics.flatMap((topic) =>
  topic.prerequisiteIds.map((id) => ({
    id: `${id}-${topic.id}`, source: id, target: topic.id,
    type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed },
  })),
);

function readProgress(): { records: Record<string, boolean>; error: string } {
  try {
    const value: unknown = JSON.parse(localStorage.getItem('roadmap-progress') ?? '{}');
    if (!value || typeof value !== 'object' || Array.isArray(value)
      || Object.values(value).some((item) => typeof item !== 'boolean')) {
      throw new Error('Invalid progress');
    }
    return { records: value as Record<string, boolean>, error: '' };
  } catch {
    return {
      records: {},
      error: 'Saved progress could not be read. Your stored data has been kept. Changes will replace it.',
    };
  }
}

export default function App() {
  const [initial] = useState(readProgress);
  const [progress, setProgress] = useState(initial.records);
  const [storageError, setStorageError] = useState(initial.error);
  const [selected, setSelected] = useState('javascript');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [activeTrack, setActiveTrack] = useState('all');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [view, setView] = useState<'groups' | 'map' | 'certificates'>('groups');
  const searchRef = useRef<HTMLInputElement>(null);
  const summary = summarizeProgress(catalog.topics, progress);
  const percent = Math.round(summary.required.completed / summary.required.total * 100);
  const completedCount = summary.required.completed + summary.optional.completed;
  const topic = catalog.topics.find((item) => item.id === selected)!;
  const selectedTrack = tracks.find((track) =>
    (track.stageIds as readonly string[]).includes(topic.stageId),
  )!;
  const next = catalog.topics.find((item) => !item.optional && !progress[item.id]
    && item.prerequisiteIds.every((id) => progress[id]));

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  const matching = catalog.topics.filter((item) => {
    const track = tracks.find((group) =>
      (group.stageIds as readonly string[]).includes(item.stageId),
    )!;
    const text = `${item.title} ${item.category} ${item.summary}`.toLowerCase();
    return (activeTrack === 'all' || activeTrack === track.id)
      && text.includes(query.trim().toLowerCase())
      && (status === 'all' || (status === 'completed'
        ? progress[item.id] === true : progress[item.id] !== true));
  });
  const visibleGroups = tracks.map((track) => ({
    ...track,
    topics: matching.filter((item) =>
      (track.stageIds as readonly string[]).includes(item.stageId),
    ).sort((left, right) => Number(left.optional) - Number(right.optional)),
  })).filter((track) => track.topics.length);
  const visibleIds = new Set(matching.map((item) => item.id));
  const certificates = catalog.resources.filter((resource) => resource.certificateStatus === 'free'
    && `${resource.title} ${resource.provider}`.toLowerCase().includes(query.trim().toLowerCase()));
  const nodes: Node[] = matching.map((item) => ({
    id: item.id, position: positions[item.id], selected: item.id === selected,
    data: { label: `${item.title}${item.optional ? ' (optional)' : ''}${progress[item.id] ? ' · Completed' : ''}` },
    className: progress[item.id] ? 'topic-node completed-node' : 'topic-node',
  }));

  function toggleCompletion(id: string) {
    const updated = { ...progress, [id]: !progress[id] };
    setProgress(updated);
    try {
      localStorage.setItem('roadmap-progress', JSON.stringify(updated));
      setStorageError('');
    } catch {
      setStorageError('Progress changed for this session, but your browser could not save it.');
    }
  }

  function revealTopic(id: string) {
    setSelected(id);
    setExpandedTopic(id);
    setActiveTrack('all');
    setQuery('');
    setStatus('all');
  }

  function openTrack(id: string) {
    const track = tracks.find((item) => item.id === id)!;
    setActiveTrack(id);
    setView('groups');
    setExpandedTopic(null);
    if (!(track.stageIds as readonly string[]).includes(topic.stageId)) {
      const firstTopic = catalog.topics.find((item) => !item.optional
        && (track.stageIds as readonly string[]).includes(item.stageId));
      if (firstTopic) setSelected(firstTopic.id);
    }
  }

  const details = (
    <TopicDetails key={topic.id} topic={topic} progress={progress} onToggle={toggleCompletion} />
  );

  return (
    <div className="workspace">
      <a className="skip-link" href="#roadmap-content">Skip to roadmap</a>
      <header className="app-header">
        <a className="brand" href="./" aria-label="Full-Stack Mastery home">
          <Layers size={34} className="brand-symbol" />
          <span>Full-Stack <strong>Mastery Roadmap</strong></span>
        </a>
        <label className="search-input">
          <Search size={17} />
          <input ref={searchRef} aria-label="Search topics"
            placeholder="Search technologies or topics..." value={query}
            onChange={(event) => setQuery(event.target.value)} />
          {query ? (
            <button onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>
          ) : <kbd>Ctrl K</kbd>}
        </label>
        <section className="header-progress" aria-label="Learning progress">
          <span className="progress-ring" role="progressbar" aria-valuenow={percent}
            aria-valuemin={0} aria-valuemax={100} aria-label="Core topic completion">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="17" className="ring-track" />
              <circle cx="20" cy="20" r="17" className="ring-value"
                strokeDasharray={`${percent * 1.068} 106.8`} />
            </svg>
            <span>{percent}%</span>
          </span>
          <span>Overall progress<small>{summary.required.completed} / {summary.required.total} core topics</small></span>
        </section>
      </header>

      <aside className="navigation-rail">
        <nav aria-label="Learning tracks">
          <button className={`nav-item ${activeTrack === 'all' && view !== 'certificates' ? 'active' : ''}`}
            onClick={() => { setActiveTrack('all'); setView('groups'); }} aria-current={activeTrack === 'all' && view !== 'certificates' ? 'page' : undefined}>
            <Map size={18} /><span>Roadmap</span><span className="nav-count">{catalog.topics.length}</span>
          </button>
          {tracks.map((track) => {
            const Icon = icons[track.id];
            return (
              <button key={track.id} className={`nav-item ${activeTrack === track.id ? 'active' : ''}`}
                onClick={() => openTrack(track.id)} aria-current={activeTrack === track.id ? 'page' : undefined}>
                <Icon size={18} /><span>{track.title}</span>
              </button>
            );
          })}
          <button className={`nav-item ${view === 'certificates' ? 'active' : ''}`}
            onClick={() => { setView('certificates'); setActiveTrack('all'); setQuery(''); }}
            aria-current={view === 'certificates' ? 'page' : undefined}>
            <Award size={18} /><span>Free certificates</span>
          </button>
        </nav>
        <div className="rail-filters">
          <h2>Progress</h2>
          <label htmlFor="status-filter">Show topics</label>
          <select id="status-filter" aria-label="Filter by completion" value={status}
            onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All progress</option>
            <option value="incomplete">To learn</option>
            <option value="completed">Completed</option>
          </select>
          <div className="filter-count"><CheckCircle2 size={14} /><span>Completed</span><strong>{completedCount}</strong></div>
          <div className="filter-count"><Circle size={14} /><span>To learn</span><strong>{catalog.topics.length - completedCount}</strong></div>
          <div className="filter-count optional-count"><Circle size={14} /><span>Optional</span><strong>{summary.optional.total}</strong></div>
        </div>
        <div className="rail-bottom"><span className="storage-dot" />Saved on this device</div>
      </aside>

      <main id="roadmap-content" className="learning-content">
        <div className="canvas-toolbar">
          <div className="canvas-title"><h1>{view === 'certificates' ? 'Free certificates' : tracks.find((track) => track.id === activeTrack)?.title ?? 'Learning roadmap'}</h1><span>{view === 'certificates' ? `${certificates.length} courses` : `${matching.length} topics`}</span></div>
          <div className="view-switch" role="group" aria-label="Roadmap view">
            <button aria-pressed={view === 'groups'} className={view === 'groups' ? 'active' : ''}
              onClick={() => setView('groups')}><LayoutGrid size={14} />Grouped path</button>
            <button aria-pressed={view === 'map'} className={view === 'map' ? 'active' : ''}
              onClick={() => setView('map')}><Map size={14} />Dependencies</button>
          </div>
        </div>
        {storageError && <p className="storage-error" role="status">{storageError}</p>}
        {view === 'certificates' ? (
          <div className="all-certificates">
            {certificates.length ? <CertificateCards resources={certificates} /> : (
              <div className="empty-state"><h2>No matching certificates</h2>
                <button onClick={() => setQuery('')}>Show all certificates</button></div>
            )}
          </div>
        ) : !matching.length ? (
          <div className="empty-state"><Search size={26} /><h2>No matching topics</h2>
            <p>Try another search or clear your filters.</p>
            <button onClick={() => { setQuery(''); setStatus('all'); setActiveTrack('all'); }}>Show all topics</button>
          </div>
        ) : view === 'groups' ? (
          <div className={`track-grid ${activeTrack !== 'all' ? 'focused-track-grid' : ''}`}>
            {visibleGroups.map((track) => {
              const Icon = icons[track.id];
              const allTopics = catalog.topics.filter((item) =>
                (track.stageIds as readonly string[]).includes(item.stageId),
              );
              const completed = allTopics.filter((item) => progress[item.id]).length;
              return (
                <section className={`track-group track-${track.color}`} key={track.id}
                  aria-labelledby={`track-${track.id}`}>
                  <div className="track-summary">
                    <Icon size={29} className="track-icon" />
                    <h2 id={`track-${track.id}`}>{track.title}</h2>
                    <span className="track-topic-count">{allTopics.length} {allTopics.length === 1 ? 'topic' : 'topics'}</span>
                    <div className="track-progress">
                      <progress value={completed} max={allTopics.length}
                        aria-label={`${track.title} completion`} />
                      <span>{completed}/{allTopics.length}</span>
                    </div>
                  </div>
                  <ul className="topic-list">
                    {track.topics.map((item) => (
                      <li key={item.id}>
                        <button className={`topic-row ${selected === item.id ? 'selected' : ''} ${progress[item.id] ? 'topic-complete' : ''}`}
                          onClick={() => { setSelected(item.id); setExpandedTopic(expandedTopic === item.id ? null : item.id); }}
                          aria-current={selected === item.id ? 'true' : undefined}>
                          <TechnologyLogos topicId={item.id} compact />
                          <span className="topic-row-title">{item.title}</span>
                          {item.optional && <span className="optional-tag">Optional</span>}
                          {progress[item.id] && <CheckCircle2 className="completed-mark" size={13} aria-label="Completed" />}
                          <ChevronRight size={12} />
                        </button>
                      </li>
                    ))}
                  </ul>
                  {expandedTopic && track.topics.some((item) => item.id === expandedTopic)
                    && selected === expandedTopic && <div className="inline-details">{details}</div>}
                </section>
              );
            })}
          </div>
        ) : (
          <div className="dependency-map">
            <ReactFlow key={`${activeTrack}-${query}-${status}`} nodes={nodes}
              edges={edges.filter((edge) => visibleIds.has(edge.source) && visibleIds.has(edge.target))}
              nodesDraggable={false} nodesConnectable={false}
              onNodeClick={(_, node) => setSelected(node.id)}
              onSelectionChange={({ nodes: selectedNodes }) => { if (selectedNodes[0]) setSelected(selectedNodes[0].id); }}
              fitView minZoom={0.1} fitViewOptions={{ padding: 0.2 }} colorMode="dark">
              <Background gap={22} size={1} /><Controls />
            </ReactFlow>
          </div>
        )}
        {view === 'map' && <div className="inline-details map-details">{details}</div>}
        <div className="continue-footer">
          {next ? <button onClick={() => { revealTopic(next.id); setView('groups'); }}>
            Continue with {next.title}<ArrowRight size={14} />
          </button> : <span><Check size={14} />All core topics completed</span>}
          <span>{summary.optional.completed}/{summary.optional.total} optional topics completed separately</span>
        </div>
      </main>

      <aside className={`details-panel track-${selectedTrack.color}`} aria-label="Selected topic">
        {details}
      </aside>
    </div>
  );
}
