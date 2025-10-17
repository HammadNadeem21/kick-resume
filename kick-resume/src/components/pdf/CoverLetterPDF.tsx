import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 500,
    color: "#1e293b",
  },
  content: {
    marginTop: 10,
    lineHeight: 1,
  },
});

interface CoverLetterPDFProps {
  coverLetter: string;
}

const CoverLetterPDF: React.FC<CoverLetterPDFProps> = ({ coverLetter }) => (
  <Document>
    <Page style={styles.page}>
      {/* <Text style={styles.title}>AI Suggested Cover Letter</Text> */}
      <Text style={styles.content}>{coverLetter}</Text>
    </Page>
  </Document>
);

export default CoverLetterPDF;
