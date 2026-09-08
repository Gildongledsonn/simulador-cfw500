export interface CertificateRecord {
  id: string;
  studentName: string;
  studentCpf: string;
  courseTitle: string;
  workloadHours: number;
  issueDate: string;
  expirationDate: string;
  score: number;
  authCode: string;
}

const STORAGE_KEY = '@GAF_STUDENT_CERTIFICATES_V2';

export const getStudentCertificates = (studentName: string): CertificateRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list: CertificateRecord[] = JSON.parse(raw);
    return list.filter((c) => c.studentName.toLowerCase() === studentName.toLowerCase());
  } catch {
    return [];
  }
};

export const saveStudentCertificate = (data: {
  studentName: string;
  studentCpf: string;
  courseTitle: string;
  workloadHours: number;
  score: number;
}): CertificateRecord => {
  const now = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(now.getFullYear() + 1);

  const newCert: CertificateRecord = {
    id: `cert_${Date.now()}`,
    studentName: data.studentName,
    studentCpf: data.studentCpf || '046.405.824-47',
    courseTitle: data.courseTitle,
    workloadHours: data.workloadHours,
    issueDate: now.toISOString(),
    expirationDate: oneYearLater.toISOString(),
    score: data.score,
    authCode: `GAF-${Math.floor(100000 + Math.random() * 900000)}`,
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: CertificateRecord[] = raw ? JSON.parse(raw) : [];
    list.unshift(newCert);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Erro ao salvar certificado', e);
  }

  return newCert;
};

export const deleteStudentCertificate = (certId: string): CertificateRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list: CertificateRecord[] = JSON.parse(raw);
    const updated = list.filter((c) => c.id !== certId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};