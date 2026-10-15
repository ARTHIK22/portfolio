import React from 'react';
import { Award, BriefcaseBusiness, CalendarDays, Download, ExternalLink, FileText } from 'lucide-react';
import {
  certificates,
  professionalDocuments,
  type CertificateRecord,
  type ProfessionalDocumentRecord,
} from '../data/certificates';

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
  const url = assetUrl(item.pdfPath);
  const isCertificate = item.kind === 'certificate';
  const viewLabel = isCertificate ? 'View Certificate' : 'View Document';

  return (
    <article className="pearl-card flex h-full min-w-0 flex-col rounded-3xl p-5 sm:p-6">
      <div className="flex min-w-0 items-start gap-3.5">
        <div
          role="img"
          aria-label={`PDF document icon for ${item.title}`}
          className="grid h-14 w-12 shrink-0 place-items-center rounded-xl border border-[#D6B574]/35 bg-gradient-to-br from-[#FFFDF8] via-white to-[#DCD7F5]/30 shadow-xs"
        >
          <FileText className="h-7 w-7 text-[#B89246]" strokeWidth={1.6} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-serif font-bold leading-snug text-[#263238] sm:text-lg">
            {item.title}
          </h3>
          {item.type && (
            <p className="mt-1.5 inline-flex rounded-full border border-[#82DAD1]/35 bg-[#82DAD1]/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#368F83]">
              <span className="sr-only">Type: </span>{item.type}
            </p>
          )}
          <dl className="mt-2 space-y-1.5 text-xs leading-relaxed text-[#5B646B]">
            {item.issuer && (
              <div className="flex items-start gap-2">
                <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B89246]" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Issuing organization</dt>
                  <dd>{item.issuer}</dd>
                </div>
              </div>
            )}
            {item.date && (
              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#368F83]" aria-hidden="true" />
                <div>
                  <dt className="sr-only">{item.dateLabel || 'Date'}</dt>
                  <dd>{item.dateLabel ? `${item.dateLabel} · ` : ''}{item.date}</dd>
                </div>
              </div>
            )}
          </dl>
          {(item.trainingDuration || item.grade) && (
            <p className="mt-2 text-[11px] leading-relaxed text-[#5B646B]">
              {item.trainingDuration && <span>Duration · {item.trainingDuration}</span>}
              {item.trainingDuration && item.grade && <span aria-hidden="true"> · </span>}
              {item.grade && <span>Grade · {item.grade}</span>}
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 border-t border-[#D6B574]/15 pt-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${viewLabel}: ${item.title} (opens in a new tab)`}
          className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full border border-[#D6B574]/50 bg-[#D6B574]/20 px-3 py-2.5 text-xs font-semibold text-[#263238] transition-colors hover:bg-[#D6B574]/35 focus-visible:ring-2 focus-visible:ring-[#D6B574]"
        >
          <span>{viewLabel}</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <a
          href={url}
          download={item.pdfPath.split('/').pop()}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#D6B574]/25 bg-white px-3 py-2.5 text-xs font-semibold text-[#5B646B] transition-colors hover:border-[#D6B574]/60 hover:text-[#263238] focus-visible:ring-2 focus-visible:ring-[#D6B574]"
          aria-label={`Download ${item.title} PDF`}
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Download</span>
        </a>
      </div>
    </article>
  );
};

const certificateCards: DocumentCardItem[] = certificates.map((certificate) => ({
  ...certificate,
  kind: 'certificate',
}));

export const Certifications: React.FC = () => (
  <section
    id="certifications"
    className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-32"
    aria-labelledby="certifications-heading"
  >
    <div className="mb-10 max-w-3xl sm:mb-12">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D6B574]/35 bg-white/80 px-3.5 py-1.5 shadow-xs">
        <Award className="h-3.5 w-3.5 text-[#B89246]" aria-hidden="true" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B646B]">
          Certificate Library
        </span>
      </div>
      <h2
        id="certifications-heading"
        className="text-3xl font-serif leading-tight tracking-tight text-[#263238] sm:text-4xl md:text-5xl"
      >
        Certifications <span className="champagne-gradient-text">&amp; Achievements</span>
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#5B646B] sm:text-base">
        Certificates and achievements with direct access to each original PDF.
      </p>
    </div>

    <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {certificateCards.map((item) => <CertificateCard key={item.id} item={item} />)}
    </div>

    <div className="mt-14 border-t border-[#D6B574]/20 pt-10 sm:mt-16 sm:pt-12">
      <div className="mb-6 flex items-center gap-2.5">
        <BriefcaseBusiness className="h-4 w-4 text-[#B89246]" aria-hidden="true" />
        <h3 className="text-xl font-serif font-bold text-[#263238] sm:text-2xl">
          Professional Document
        </h3>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-4 sm:max-w-xl sm:gap-5">
        {professionalDocuments.map((document) => (
          <CertificateCard key={document.id} item={toProfessionalCard(document)} />
        ))}
      </div>
    </div>
  </section>
);
