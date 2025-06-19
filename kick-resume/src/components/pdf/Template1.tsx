import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import { ResumeData } from '@/types'; // If you have a type

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
});

export default function ResumePDF({ data }: { data: any }) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Name</Text>
          <Text>{data.name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Email</Text>
          <Text>{data.email}</Text>
        </View>
        {/* Add more fields like education, experience, etc. */}
      </Page>
    </Document>
  );
}
