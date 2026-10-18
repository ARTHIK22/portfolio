import React, { useRef, useState } from 'react';
import { Award, BriefcaseBusiness, CalendarDays, Download, ExternalLink } from 'lucide-react';
import {
  certificates,
  professionalDocuments,
  type CertificateRecord,
  type ProfessionalDocumentRecord,
} from '../data/certificates';
import { useScrollReveal } from '../lib/useScrollReveal';

type DocumentCardItem = Pick<CertificateRecord, 'id' | 'title' | 'issuer' | 'type' | 'pdfPath'> & {
  date?: string;
  dateLabel?: 'Issued' | 'Completed' | 'Dated';
  trainingDuration?: string;
  grade?: string;
  kind: 'certificate' | 'professional-document';
};

const assetUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path.split('/').filter(Boolean).map(encodeURIComponent).join('/')}`;

const toProfessionalCard = (document: ProfessionalDocumentRecord): DocumentCardItem => ({
  ...document,
  date: document.date,
  dateLabel: document.dateLabel,
  kind: 'professional-document',
});

const CertificateCard: React.FC<{ item: DocumentCardItem }> = ({ item }) => {
  const [previewMissing, setPreviewMissing] = useState(false);
  const url = assetUrl(item.pdfPath);
  const previewUrl = `${import.meta.env.BASE_URL}document-previews/${encodeURIComponent(item.id)}.png`;
  const viewLabel = item.kind === 'certificate' ? 'View Certificate' : 'View Document';

  return (
    <article data-scroll-reveal={item.id !== 'odnest-letter-of-recommendation' ? '' : undefined} className={`certificate-card certificate-card--${item.id}`}>
      <a className="certificate-preview" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${viewLabel}: ${item.title}`}>
        {!previewMissing ? (
          <img src={previewUrl} alt={`First-page preview of ${item.title}`} loading="lazy" decoding="async" onError={() => setPreviewMissing(true)} />
        ) : (
          <span className="certificate-preview-fallback" aria-hidden="true">PDF · FIRST PAGE</span>
        )}
        <span className="certificate-preview-label">OPEN ORIGINAL PDF ↗</span>
      </a>
      <div className="certificate-card-body">
        <div className="certificate-card-heading">
          <h3 title={item.title}>{item.title}</h3>
          {item.type && <p className="certificate-type">{item.type}</p>}
        </div>
        <dl>
          {item.issuer && <div><dt>Issuer</dt><dd><Award aria-hidden="true" />{item.issuer}</dd></div>}
          {item.date && <div><dt>{item.dateLabel || 'Date'}</dt><dd><CalendarDays aria-hidden="true" />{item.date}</dd></div>}
        </dl>
        {(item.trainingDuration || item.grade) && (
          <p className="certificate-extra">
            {item.trainingDuration && <span>{item.trainingDuration}</span>}
            {item.trainingDuration && item.grade && <span aria-hidden="true"> · </span>}
            {item.grade && <span>{item.grade}</span>}
          </p>
        )}
      </div>
      <div className="certificate-actions">
        <a data-hover-text={viewLabel} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${viewLabel}: ${item.title} (opens in a new tab)`}>
          <span>{viewLabel}</span><ExternalLink aria-hidden="true" />
        </a>
        <a data-hover-text="Download" href={url} download={item.pdfPath.split('/').pop()} aria-label={`Download ${item.title} PDF`}>
          <Download aria-hidden="true" /><span>Download</span>
        </a>
      </div>
    </article>
  );
};

const certificateCards: DocumentCardItem[] = certificates.map((certificate) => ({
  ...certificate,
  kind: 'certificate',
}));

export const Certifications: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="certifications" data-nav-theme="light" ref={sectionRef} className="certifications-section" aria-labelledby="certifications-heading">
      <div className="certifications-inner">
        <div className="certifications-heading" data-scroll-reveal>
          <p className="eyebrow">CERTIFICATE LIBRARY</p>
          <h2 id="certifications-heading">Certificates <em>&amp; Documents</em></h2>
          <p>Certificates and professional documents with direct access to each original PDF.</p>
        </div>
        <div className="certificate-grid">
          {certificateCards.map((item) => <CertificateCard key={item.id} item={item} />)}
        </div>
        <section className="professional-documents" aria-labelledby="professional-documents-heading">
          <div className="professional-documents-heading" data-scroll-reveal>
            <BriefcaseBusiness aria-hidden="true" />
            <h3 id="professional-documents-heading">Professional document</h3>
          </div>
          <div className="professional-documents-grid">
            {professionalDocuments.map((document) => <CertificateCard key={document.id} item={toProfessionalCard(document)} />)}
          </div>
        </section>
      </div>
    </section>
  );
};
