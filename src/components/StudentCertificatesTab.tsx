import React, { useState, useEffect } from 'react';
import { getStudentCertificates, CertificateRecord } from '../services/certificateService';

interface StudentCertificatesTabProps {
  studentName: string;
}

export const StudentCertificatesTab: React.FC<StudentCertificatesTabProps> = ({ studentName }) => {
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [selectedCert, setSelectedCert] = useState<CertificateRecord | null>(null);

  useEffect(() => {
    const list = getStudentCertificates(studentName);
    setCertificates(list);
    if (list.length > 0) {
      setSelectedCert(list[0]);
    }
  }, [studentName]);

  const getDaysRemaining = (expDateIso: string): number => {
    const diff = new Date(expDateIso).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <strong style={{ fontSize: '15px', color: '#00e676' }}>
            📜 MEUS CERTIFICADOS PROFISSIONAIS
          </strong>
          <span style={{ fontSize: '11px', color: '#90a4ae', display: 'block', marginTop: '2px' }}>
            Emissões registradas para <strong>{studentName}</strong> • Política de Retenção: Disponível para download durante <strong>1 ano</strong>.
          </span>
        </div>
      </div>

      {certificates.length === 0 ? (
        <div style={emptyStateBoxStyle}>
          <span style={{ fontSize: '32px' }}>🎓</span>
          <strong style={{ fontSize: '13px', color: '#cfd8dc' }}>Nenhum certificado ativo no momento</strong>
          <p style={{ fontSize: '11px', color: '#90a4ae', maxWidth: '450px', margin: '6px 0 0 0' }}>
            Conclua as aulas práticas e atinja nota igual ou superior a 7.0 na avaliação técnica para emitir seu certificado oficial.
          </p>
        </div>
      ) : (
        <div style={contentGridStyle}>
          {/* LISTA LATERAL DE CERTIFICADOS */}
          <div style={certListColumnStyle}>
            <strong style={{ fontSize: '11px', color: '#81d4fa', marginBottom: '8px', display: 'block' }}>
              Certificados Emitidos ({certificates.length}):
            </strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {certificates.map((cert) => {
                const isSelected = selectedCert?.id === cert.id;
                const daysLeft = getDaysRemaining(cert.expirationDate);

                return (
                  <div
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    style={{
                      ...certCardItemStyle,
                      borderColor: isSelected ? '#00e676' : '#30363d',
                      background: isSelected ? '#12251a' : '#161b22',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '11px', color: '#fff' }}>Média: {cert.score.toFixed(1)}</strong>
                      <span style={{ fontSize: '9px', color: '#00e676', fontWeight: 'bold' }}>✓ VÁLIDO</span>
                    </div>
                    <span style={{ fontSize: '10px', color: '#cfd8dc', margin: '4px 0', display: 'block' }}>
                      {cert.courseTitle}
                    </span>
                    <span style={{ fontSize: '9px', color: '#ffb74d' }}>
                      ⏳ Expira em {daysLeft} dias
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* VISUALIZAÇÃO E DOWNLOAD DO CERTIFICADO SELECIONADO */}
          {selectedCert && (
            <div style={certPreviewColumnStyle}>
              <div style={certificateDocumentStyle} id="certificate-print-view">
                <div style={certificateInnerBorder}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #00e676', paddingBottom: '10px' }}>
                    <div>
                      <strong style={{ fontSize: '20px', color: '#fff', letterSpacing: '1px' }}>GAF TREINAMENTOS</strong>
                      <span style={{ fontSize: '10px', color: '#81d4fa', display: 'block' }}>
                        Centro Integrado de Especialização em Automação & Acionamentos
                      </span>
                    </div>
                    <span style={{ fontSize: '32px' }}>🏆</span>
                  </div>

                  <div style={{ textAlign: 'center', margin: '24px 0' }}>
                    <span style={{ fontSize: '11px', color: '#b0bec5', textTransform: 'uppercase', letterSpacing: '3px' }}>
                      Certificado de Qualificação Técnica
                    </span>
                    <h1 style={{ fontSize: '24px', color: '#00e676', margin: '10px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {selectedCert.studentName}
                    </h1>
                    <p style={{ fontSize: '12px', color: '#eceff1', lineHeight: '1.7', maxWidth: '620px', margin: '0 auto' }}>
                      Certificamos que o profissional concluiu com êxito os ensaios práticos e a avaliação teórica de
                      <strong> {selectedCert.courseTitle}</strong>, demonstrando proficiência no comissionamento de
                      inversores, sintonia de curvas de conforto Jerk e controle de segurança, atingindo a média <strong>{selectedCert.score.toFixed(1)}</strong>.
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #374151', paddingTop: '12px' }}>
                    <div style={{ fontSize: '9px', color: '#90a4ae', lineHeight: '1.5' }}>
                      <div>Data de Emissão: {new Date(selectedCert.issueDate).toLocaleDateString('pt-BR')}</div>
                      <div>Válido até: {new Date(selectedCert.expirationDate).toLocaleDateString('pt-BR')} (1 Ano)</div>
                      <div>Registro de Autenticidade: <strong style={{ color: '#81d4fa' }}>{selectedCert.authCode}</strong></div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ borderBottom: '1px solid #fff', width: '170px', marginBottom: '4px' }}></div>
                      <span style={{ fontSize: '10px', color: '#cfd8dc', fontWeight: 'bold', display: 'block' }}>Prof. Gil Fernandes</span>
                      <span style={{ fontSize: '8px', color: '#90a4ae' }}>Responsável Técnico</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <span style={{ fontSize: '10px', color: '#90a4ae' }}>
                  ℹ️ O arquivo digital permanecerá acessível nesta aba por 365 dias a partir da data de conclusão.
                </span>
                <button onClick={() => window.print()} style={btnPrintStyle}>
                  🖨️ Baixar / Imprimir PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px solid #30363d',
  borderRadius: '12px',
  padding: '14px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  width: '100%',
  boxSizing: 'border-box',
};

const headerStyle: React.CSSProperties = {
  borderBottom: '1px solid #21262d',
  paddingBottom: '10px',
};

const emptyStateBoxStyle: React.CSSProperties = {
  background: '#161b22',
  border: '1px dashed #30363d',
  borderRadius: '8px',
  padding: '40px 20px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const contentGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '260px 1fr',
  gap: '14px',
};

const certListColumnStyle: React.CSSProperties = {
  background: '#11151a',
  border: '1px solid #21262d',
  borderRadius: '8px',
  padding: '10px',
  height: 'fit-content',
};

const certCardItemStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '6px',
  padding: '8px 10px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const certPreviewColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const certificateDocumentStyle: React.CSSProperties = {
  background: '#070b0e',
  border: '2px solid #00e676',
  borderRadius: '10px',
  padding: '14px',
  boxShadow: '0 8px 24px rgba(0, 230, 118, 0.15)',
};

const certificateInnerBorder: React.CSSProperties = {
  border: '2px dashed #1b5e20',
  borderRadius: '6px',
  padding: '16px',
  background: 'linear-gradient(180deg, #0b1510 0%, #060b08 100%)',
};

const btnPrintStyle: React.CSSProperties = {
  background: '#00e676',
  color: '#000',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 16px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};