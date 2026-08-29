export interface CertificateRecord {
	id: string;
	studentName: string;
	courseTitle: string;
	score: number;
	issueDate: string;
	expirationDate: string;
	authCode: string;
}

const CERTIFICATES_STORAGE_KEY = 'simulador-cfw500-certificates';

export const getStudentCertificates = (studentName: string): CertificateRecord[] => {
	try {
		const storedCertificates = localStorage.getItem(CERTIFICATES_STORAGE_KEY);
		if (!storedCertificates) {
			return [];
		}

		const certificates = JSON.parse(storedCertificates) as CertificateRecord[];
		return certificates.filter((certificate) => certificate.studentName === studentName);
	} catch {
		return [];
	}
};
