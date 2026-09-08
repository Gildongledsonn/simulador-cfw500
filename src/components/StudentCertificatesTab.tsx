import React, { useState, useEffect } from 'react';
import { getStudentCertificates, deleteStudentCertificate, CertificateRecord } from '../services/certificateService';

interface StudentCertificatesTabProps {
  studentName: string;
  studentCpf?: string;
  onOpenExam?: () => void;
}

const GafLogo: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
  const scale = size === 'sm' ? 0.75 : 1;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: `${10 * scale}px` }}>
      <div
        style={{
          width: `${46 * scale}px`,
          height: `${46 * scale}px`,
          background: '#005ea6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: '0 2px 6px rgba(0,94,166,0.3)',
          border: '2px solid #003366',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: '900',
            fontSize: `${24 * scale}px`,
            lineHeight: 1,
            zIndex: 2,
          }}
        >
          G
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: `${6 * scale}px` }}>
          <span
            style={{
              fontFamily: 'Arial Black, Arial, sans-serif',
              fontWeight: '900',
              fontSize: `${24 * scale}px`,
              color: '#111827',
              letterSpacing: '1px',
              lineHeight: 1,
            }}
          >
            GAF
          </span>
          <span
            style={{
              fontFamily: 'Arial, sans-serif',
              fontWeight: '800',
              fontSize: `${13 * scale}px`,
              color: '#005ea6',
              letterSpacing: '1.5px',
              lineHeight: 1,
            }}
          >
            TREINAMENTOS
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: `${3 * scale}px` }}>
          <div style={{ width: `${20 * scale}px`, height: '1px', backgroundColor: '#64748b' }} />
          <span
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: `${8.5 * scale}px`,
              color: '#334155',
              fontWeight: '600',
              letterSpacing: '0.2px',
              whiteSpace: 'nowrap',
            }}
          >
            Capacitar | Prevenir | Transformar
          </span>
        </div>
      </div>
    </div>
  );
};

export const StudentCertificatesTabComponent: React.FC<StudentCertificatesTabProps> = ({
  studentName,
  studentCpf = '046.405.824-47',
  onOpenExam,
}) => {
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [selectedCert, setSelectedCert] = useState<CertificateRecord | null>(null);

  useEffect(() => {
    const list = getStudentCertificates(studentName);
    setCertificates(list);
    if (list.length > 0) {
      setSelectedCert(list[0]);
    } else {
      setSelectedCert(null);
    }
  }, [studentName]);

  const getDaysRemaining = (expDateIso: string): number => {
    const diff = new Date(expDateIso).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleDeleteCert = (certId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Deseja realmente excluir este certificado?')) {
      const remainingAll = deleteStudentCertificate(certId);
      const updatedList = remainingAll.filter((c) => c.studentName.toLowerCase() === studentName.toLowerCase());
      setCertificates(updatedList);
      if (selectedCert?.id === certId) {
        setSelectedCert(updatedList.length > 0 ? updatedList[0] : null);
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <strong style={{ fontSize: '15px', color: '#00e676' }}>
            📜 MEUS CERTIFICADOS PROFISSIONAIS (GAF TREINAMENTOS)
          </strong>
          <span style={{ fontSize: '11px', color: '#90a4ae', display: 'block', marginTop: '2px' }}>
            Emitidos para <strong>{studentName}</strong> (CPF: {studentCpf}) • Validade: 1 ano.
          </span>
        </div>

        {onOpenExam && (
          <button onClick={onOpenExam} style={btnExamTriggerStyle}>
            📝 Realizar Prova Final do CFW500
          </button>
        )}
      </div>

      {certificates.length === 0 ? (
        <div style={emptyStateBoxStyle}>
          <span style={{ fontSize: '32px' }}>🎓</span>
          <strong style={{ fontSize: '13px', color: '#cfd8dc' }}>Nenhum certificado emitido ainda</strong>
          <p style={{ fontSize: '11px', color: '#90a4ae', maxWidth: '450px', margin: '6px 0 14px 0' }}>
            Conclua as aulas práticas e teóricas do Inversor CFW500 e obtenha nota igual ou superior a 7.0 na avaliação final para emitir seu certificado oficial.
          </p>
          {onOpenExam && (
            <button onClick={onOpenExam} style={btnExamTriggerStyle}>
              🚀 Iniciar Avaliação Final Agora
            </button>
          )}
        </div>
      ) : (
        <div style={contentGridStyle}>
          <div style={certListColumnStyle}>
            <strong style={{ fontSize: '11px', color: '#81d4fa', marginBottom: '8px', display: 'block' }}>
              Seus Certificados ({certificates.length}):
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
                      <strong style={{ fontSize: '11px', color: '#fff' }}>Nota: {cert.score.toFixed(1)}</strong>
                      <button
                        onClick={(e) => handleDeleteCert(cert.id, e)}
                        style={btnDeleteCertItemStyle}
                        title="Excluir certificado"
                      >
                        🗑️
                      </button>
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

          {selectedCert && (
            <div style={certPreviewColumnStyle}>
              <div style={certificateDocumentStyle} id="certificate-print-view">
                <div style={certificateInnerBorder}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2.5px solid #005ea6', paddingBottom: '12px', marginBottom: '14px' }}>
                    <GafLogo size="md" />
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '10px', color: '#005ea6', fontWeight: 'bold', display: 'block' }}>
                        CERTIFICADO AUTÊNTICO
                      </span>
                      <span style={{ fontSize: '8px', color: '#64748b' }}>Registro: {selectedCert.authCode}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', margin: '14px 0' }}>
                    <h1 style={{ fontFamily: '"Cinzel", "Times New Roman", serif', fontSize: '32px', fontWeight: '700', color: '#004080', margin: '0 0 4px 0', letterSpacing: '4px' }}>
                      CERTIFICADO
                    </h1>
                    <span style={{ fontSize: '11px', color: '#475569', fontWeight: '800', letterSpacing: '3px', display: 'block', marginBottom: '14px' }}>
                      DE CONCLUSÃO E APROVEITAMENTO
                    </span>

                    <p style={{ fontSize: '11px', color: '#334155', margin: '0 0 6px 0' }}>Certificamos para os devidos fins que</p>

                    <div style={{ margin: '6px 0 8px 0', borderBottom: '2px solid #004080', display: 'inline-block', padding: '0 30px' }}>
                      <span style={{ fontFamily: '"Cinzel", "Times New Roman", serif', fontSize: '21px', fontWeight: '700', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {selectedCert.studentName}
                      </span>
                    </div>

                    <div style={{ fontSize: '11px', color: '#334155', marginTop: '4px' }}>
                      portador do CPF nº <strong>{selectedCert.studentCpf}</strong>,
                    </div>

                    <p style={{ fontSize: '11px', color: '#475569', margin: '6px 0 4px 0' }}>
                      concluiu com êxito e aproveitamento exemplar o curso profissionalizante de:
                    </p>

                    <h2 style={{ fontFamily: '"Cinzel", "Times New Roman", serif', fontSize: '19px', fontWeight: '700', color: '#004080', margin: '6px 0 14px 0', letterSpacing: '1px' }}>
                      {selectedCert.courseTitle}
                    </h2>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '12px 0' }}>
                      <div style={metaBadgeStyle}>
                        <span>⏱️ CARGA HORÁRIA: <strong>{selectedCert.workloadHours} HORAS</strong></span>
                      </div>
                      <div style={metaBadgeStyle}>
                        <span>📅 CONCLUSÃO: <strong>{new Date(selectedCert.issueDate).toLocaleDateString('pt-BR')}</strong></span>
                      </div>
                      <div style={metaBadgeStyle}>
                        <span>🏆 APROVAÇÃO: <strong>NOTA {selectedCert.score.toFixed(1)}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div style={programmaticBoxStyle}>
                    <strong style={{ fontSize: '9px', color: '#004080', display: 'block', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Conteúdo Programático Aplicado:
                    </strong>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px', fontSize: '8.5px', color: '#1e293b' }}>
                      <div>1. Introdução aos Inversores de Frequência PWM</div>
                      <div>7. Parâmetros de Proteção e Sobrecarga (Ixt)</div>
                      <div>2. Arquitetura e Circuito Intermediário (Link CC)</div>
                      <div>8. Comunicação Modbus RTU & Redes Industriais</div>
                      <div>3. Instalação Elétrica Industrial e Bornes I/O</div>
                      <div>9. Diagnóstico e Injeção de Falhas (F006, F021, F070)</div>
                      <div>4. Configuração de Rampas e Limites de Frequência</div>
                      <div>10. Comissionamento Prático em Malha Aberta/Fechada</div>
                      <div>5. Curva V/F e Boost de Torque Manual/Automático</div>
                      <div>11. Normas de Segurança NR-10 e NR-12 Aplicadas</div>
                      <div>6. Frenagem CC e Resistores de Frenagem</div>
                      <div>12. Encerramento e Avaliação de Competências Técnicas</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px', borderTop: '1px solid #cbd5e1', paddingTop: '10px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: '"Brush Script MT", cursive', fontSize: '19px', color: '#0f172a' }}>Gildongledson</div>
                      <div style={{ borderBottom: '1px solid #0f172a', width: '140px', marginBottom: '3px' }}></div>
                      <span style={{ fontSize: '8px', fontWeight: 'bold', color: '#1e293b', display: 'block' }}>Instrutor / Responsável Técnico</span>
                      <span style={{ fontSize: '6.5px', color: '#64748b' }}>Registro: 075.840.954-02</span>
                    </div>

                    <div style={{ transform: 'scale(0.85)', transformOrigin: 'bottom center' }}>
                      <GafLogo size="sm" />
                      <div style={{ textAlign: 'center', marginTop: '2px' }}>
                        <span style={{ fontSize: '6px', color: '#64748b' }}>CNPJ: 55.473.198/0001-12 • www.gaftreinamentos.com.br</span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: '"Brush Script MT", cursive', fontSize: '19px', color: '#0f172a' }}>Gildongledson</div>
                      <div style={{ borderBottom: '1px solid #0f172a', width: '140px', marginBottom: '3px' }}></div>
                      <span style={{ fontSize: '8px', fontWeight: 'bold', color: '#1e293b', display: 'block' }}>Coordenador Geral</span>
                      <span style={{ fontSize: '6.5px', color: '#64748b' }}>Autenticidade: {selectedCert.authCode}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <span style={{ fontSize: '10px', color: '#90a4ae' }}>
                  ℹ️ O certificado oficial pode ser salvo em formato PDF através da opção de impressão do navegador.
                </span>
                <button onClick={handleDownloadPdf} style={btnPrintStyle}>
                  🖨️ Baixar PDF do Certificado
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const StudentCertificatesTab = StudentCertificatesTabComponent;

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
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #21262d',
  paddingBottom: '10px',
  flexWrap: 'wrap',
  gap: '10px',
};

const btnExamTriggerStyle: React.CSSProperties = {
  background: '#00e676',
  color: '#000',
  border: 'none',
  borderRadius: '6px',
  padding: '7px 14px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
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

const btnDeleteCertItemStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '12px',
  padding: '0 2px',
};

const certPreviewColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const certificateDocumentStyle: React.CSSProperties = {
  background: '#ffffff',
  border: '4px double #005ea6',
  borderRadius: '12px',
  padding: '16px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
};

const certificateInnerBorder: React.CSSProperties = {
  border: '1px solid #cbd5e1',
  borderRadius: '6px',
  padding: '14px',
  background: '#ffffff',
};

const metaBadgeStyle: React.CSSProperties = {
  background: '#f8fafc',
  border: '1px solid #cbd5e1',
  borderRadius: '6px',
  padding: '4px 10px',
  fontSize: '9.5px',
  color: '#334155',
};

const programmaticBoxStyle: React.CSSProperties = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  padding: '8px 12px',
  marginTop: '8px',
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