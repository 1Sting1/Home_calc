import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

export function downloadAsImage(elementId: string, filename: string): void {
  import('html2canvas').then((html2canvas) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    html2canvas.default(element).then(canvas => {
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });
}

export function downloadAsPDF(elementId: string, filename: string): void {
  import('html2canvas').then((html2canvas) => {
    import('jspdf').then(({ jsPDF }) => {
      const element = document.getElementById(elementId);
      if (!element) return;
      
      html2canvas.default(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${filename}.pdf`);
      });
    });
  });
}
