import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    fontSize: 12,
    fontFamily: 'Helvetica',
    padding: 20,
    color: '#4a4a4a', // Default text color
  },
  headerDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  fullName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  position: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
  },
  leftColumn: {
    width: '35%',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    padding: 10,
    paddingTop: 15,
  },
  rightColumn: {
    width: '65%',
    padding: 10,
    paddingTop: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    fontSize: 11,
  },
  contactText: {
    marginLeft: 5,
  },
  summaryText: {
    marginBottom: 10,
    fontSize: 12,
  },
  list: {
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  bullet: {
    fontSize: 10,
    marginRight: 6,
    marginTop: 1,
  },
  bulletRight: {
        fontSize: 14,
    color: '#193042',
    marginRight: 6,
    marginTop: 0,
    width: 14,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 1.2,
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  educationDegree: {
    fontSize: 10,
  },
  educationYear: {
    fontSize: 8,
    color: '#666',
  },
  experienceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    marginLeft: 0,
    marginTop: 0,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  experienceDate: {
    fontSize: 10,
    color: '#666',
  },
  projectItem: {
    marginBottom: 10,
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
  projectLink: {
    fontSize: 11,
    color: '#1d4ed8',
    textDecoration: 'underline',
    marginRight: 15,
  },
  projectLinksContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default function Template2PDF({ data }: { data: any }) {
  if (!data) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerDivider} />
        <Text style={styles.fullName}>{data.fullName}</Text>
        <Text style={styles.position}>{data.position}</Text>
        <View style={styles.headerDivider} />

        <View style={styles.gridContainer}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <View style={{ marginBottom: 15 }}>
              <View style={styles.contactItem}>
                {/* <Text>📞</Text> */}
                <Text style={styles.contactText}>{data.phone}</Text>
              </View>
              <View style={styles.contactItem}>
                {/* <Text>📧</Text> */}
                <Text style={styles.contactText}>{data.email}</Text>
              </View>
              <View style={styles.contactItem}>
                {/* <Text>📍</Text> */}
                <Text style={styles.contactText}>{data.address}</Text>
              </View>
            </View>

        <View style={styles.headerDivider} />


            <Text style={styles.sectionTitle}>Education</Text>
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
        <View style={styles.headerDivider} />


            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.list}>
              {data.skills?.map((item: string, i: number) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
        <View style={styles.headerDivider} />


            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.list}>
              {data.languages?.map((item: string, i: number) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
        <View style={styles.headerDivider} />


            <Text style={styles.sectionTitle}>Certifications</Text>
            <View style={styles.list}>
              {data.certifications?.map((item: string, i: number) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
        {/* <View style={styles.headerDivider} /> */}

          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            <Text style={styles.sectionTitle}>Profile Summary</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>

            <Text style={styles.sectionTitle}>Work Experience</Text>
            <View style={styles.list}>
              {data.experience?.map((item: any, i: number) => (
                <View key={i} style={styles.experienceItem}>
                  <View style={styles.listItem}>
                    <Text style={styles.bulletRight}>•</Text>
                    <Text style={styles.experienceTitle}>{item.title}</Text>
                  </View>
                  <Text style={{ marginLeft: 8, fontStyle: "italic" }}>
                  ({item.startDate} - {item.endDate})
                 </Text>   
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Projects</Text>
            <View style={styles.list}>
              {data.projects?.map((item: any, i: number) => (
                <View key={i} style={styles.projectItem}>
                  <Text style={styles.projectTitle}>{item.name}</Text>
                  <Text style={styles.projectDescription}>{item.description}</Text>
                  <View style={styles.projectLinksContainer}>
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
        {/* <View style={styles.headerDivider} /> */}

          </View>

        </View>
        <View style={styles.headerDivider} />

      </Page>
    </Document>
  );
}
