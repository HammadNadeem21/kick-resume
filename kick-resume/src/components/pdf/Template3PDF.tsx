import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    fontSize: 12,
    fontFamily: 'Helvetica',
    paddingHorizontal: 28,
    paddingVertical: 28,
    color: '#000', // Default text color
  },
  // Header Section
  headerContainer: {
    marginBottom: 20,
    width: '70%', // Matches Tailwind w-[70%]
  },
  fullName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  position: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a4a4a', // gray-700
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontSize: 11,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactIcon: {
    fontSize: 10,
    marginRight: 2,
  },
  // Main Divider
  mainDivider: {
    borderBottomWidth: 2,
    borderBottomColor: '#a0aec0', // gray-400
    marginVertical: 20,
  },
  // Grid Layout
  gridContainer: {
    flexDirection: 'row',
  },
  leftColumn: {
    width: '65%',
    paddingRight: 15,
  },
  rightColumn: {
    width: '35%',
    paddingLeft: 15,
  },
  // Section Titles
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748', // gray-800
    marginBottom: 8,
  },
  sectionTitleSmall: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2d3748', // gray-800
    marginBottom: 8,
  },
  // Summary
  summaryText: {
    fontSize: 11,
    color: '#000',
    lineHeight: 1.4,
  },
  // List Items (Education, Skills, Languages, Certifications)
  list: {
    marginBottom: 15,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 3,
    fontSize: 11,
    color: '#000',
  },
  bullet: {
    marginRight: 6,
    fontSize: 10,
    marginTop: 0,
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  educationDegree: {
    fontSize: 11,
  },
  educationYear: {
    fontSize: 10,
    color: '#718096',
  },
  // Experience
  experienceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  experienceDate: {
    fontSize: 10,
    color: '#000',
  },
  // Projects
  projectItem: {
    marginBottom: 15,
  },
  projectTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 11,
    marginBottom: 3,
  },
  projectLinkContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  projectLink: {
    fontSize: 11,
    color: '#000',
    textDecoration: 'underline',
    marginRight: 20,
  },
});

export default function Template3PDF({ data }: { data: any }) {
  if (!data) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.fullName}>{data.name}</Text>
          <Text style={styles.position}>{data.role}</Text>

          <View style={styles.contactRow}>
            <View style={styles.contactItem}>
              <Text>{data.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>{data.phone}</Text>
            </View>
          </View>
          <View style={styles.contactItem}>
            <Text>{data.address}</Text>
          </View>
        </View>

        {/* Main Divider */}
        <View style={styles.mainDivider} />

        {/* Two-Column Grid */}
        <View style={styles.gridContainer}>
          {/* Left Column (Summary, Experience, Projects) */}
          <View style={styles.leftColumn}>
            {/* Summary */}
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
            <View style={styles.mainDivider} /> {/* Internal Divider */}

            {/* Experience */}
            <Text style={styles.sectionTitle}>Experience</Text>
            <View style={styles.list}>
              {data.experience?.map((item: any, i: number) => (
                <View key={i} style={styles.experienceItem}>
                  <View style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.experienceTitle}>{item.title}</Text>
                  </View>
                  <Text style={styles.experienceDate}>
                    ({item.startDate} - {item.endDate})
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.mainDivider} /> {/* Internal Divider */}

            {/* Projects */}
            <Text style={styles.sectionTitle}>Projects</Text>
            <View style={styles.list}>
              {data.projects?.map((item: any, i: number) => (
                <View key={i} style={styles.projectItem}>
                  <Text style={styles.projectTitle}>{item.name}</Text>
                  <Text style={styles.projectDescription}>{item.description}</Text>
                  <View style={styles.projectLinkContainer}>
                    <Link style={styles.projectLink} src={item.github}>
                      GitHub
                    </Link>
                    <Link style={styles.projectLink} src={item.live}>
                      Live Demo
                    </Link>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Right Column (Education, Skills, Languages, Certifications) */}
          <View style={styles.rightColumn}>
            {/* Education */}
            <Text style={styles.sectionTitleSmall}>Education</Text>
            <View style={styles.list}>
              {data.education?.map((item: any, i: number) => (
                <View key={i} style={styles.educationItem}>
                  <View style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.educationDegree}>{item.degree}</Text>
                  </View>
                  <Text style={styles.educationYear}>
                    ({item.startYear} - {item.endYear})
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.mainDivider} /> {/* Internal Divider */}

            {/* Skills */}
            <Text style={styles.sectionTitleSmall}>Skills</Text>
            <View style={styles.list}>
              {data.skills?.map((item: string, i: number) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
            <View style={styles.mainDivider} /> {/* Internal Divider */}

            {/* Languages */}
            <Text style={styles.sectionTitleSmall}>Languages</Text>
            <View style={styles.list}>
              {data.languages?.map((item: string, i: number) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
            <View style={styles.mainDivider} /> {/* Internal Divider */}

            {/* Certifications */}
            <Text style={styles.sectionTitleSmall}>Certifications</Text>
            <View style={styles.list}>
              {data.certifications?.map((item: string, i: number) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
