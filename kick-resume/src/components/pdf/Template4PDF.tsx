import { Page, Text, View, Document, StyleSheet, Link, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: '#222',
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f96b07',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    width: '70%',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  role: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    color: '#fff',
    fontSize: 11,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  address: {
    color: '#fff',
    fontSize: 11,
    marginBottom: 2,
  },
  headerRight: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

  },
  sectionGrid: {
    flexDirection: 'row',
    padding: 24,
    gap: 2,
  },
  leftCol: {
    width: '60%',
    paddingRight: 12,
  },
  rightCol: {
    width: '40%',
    paddingLeft: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#f96b07',
    borderBottomWidth: 2,
    // borderBottomColor: '#f96b07',
    marginBottom: 8,
    paddingBottom: 2,
  },
  list: {
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    fontSize: 12,
    marginBottom: 2,
    color: '#222',
  },
  bullet: {
    color: '#1f2937',
    marginRight: 6,
    fontSize: 12,
  },
  expTitle: {
    fontWeight: 'bold',
    // color: '#f5b35d',
    fontSize: 13,
  },
  expCompany: {
    fontWeight: 'bold',
    color: '#888',
    fontSize: 10,
    marginBottom: 2,
  },
  expDate: {
    fontSize: 10,
    color: '#888',
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 11,
    color: '#444',
    marginBottom: 4,
  },
  projectTitle: {
    fontWeight: 'bold',
    // color: '#f5b35d',
    fontSize: 12,
  },
  projectDesc: {
    fontSize: 11,
    color: '#444',
    marginBottom: 2,
  },
  projectLinks: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 4,
  },
  projectLink: {
    fontSize: 11,
    color: '#222',
    textDecoration: 'underline',
    marginRight: 12,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
    marginBottom: 10,
  },
  techItem: {
    // backgroundColor: '#f5b35d',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 11,
    marginRight: 4,
    // marginBottom: 2,
    color: '#fff',
  },
  summary: {
    fontSize: 10,
    color: '#222',
    marginBottom: 10,
    marginTop: 4,
  },
});



export default function Template4PDF({ data, imageUrl, imageBgColor, color }: { data: any, imageUrl: string, imageBgColor?: string, color: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={{ ...styles.header, backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}>
          <View style={styles.headerLeft}>
            <Text style={{ ...styles.name }}>{data.name}</Text>
            <Text style={{ ...styles.role }}>{data.role}</Text>
            <View style={{ ...styles.contactRow }}>
              <View style={styles.contactItem}>
                <Text>Email: </Text>
                <Text>{data.email}</Text>
              </View>
              <View style={styles.contactItem}>
                <Text>Phone: </Text>
                <Text>+{data.phone}</Text>
              </View>
            </View>
            {/* <Text style={{ ...styles.address}}>{data.address}</Text> */}
            <View style={styles.contactItem}>
              <Text style={styles.address}>Address: </Text>
              <Text style={styles.address}>{data.address}</Text>
            </View>
          </View>
          <View style={{ ...styles.headerRight, backgroundColor: imageBgColor || styles.headerRight.backgroundColor }}>
            {imageUrl ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image
                src={imageUrl}
                style={{ width: 150, height: 150, borderRadius: 75, objectFit: "cover" }}
              />
            ) : (
              <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#eee' }} />
            )}
          </View>
        </View>

        {/* Main Grid */}
        <View style={{ ...styles.sectionGrid }}>
          {/* Left Column */}
          <View style={styles.leftCol}>
            {/* Experience */}
            <Text style={{ ...styles.sectionTitle, color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`, borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}>Experience</Text>
            <View style={styles.list}>
              {data.experience?.map((item: any, i: number) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={{ ...styles.expTitle, color: `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)` }}>{item.title}</Text>
                  {item.companyName && <Text style={styles.expCompany}>{item.companyName}</Text>}
                  <Text style={styles.expDate}>
                    ({item.startDate} - {item.endDate})
                  </Text>
                  <Text style={styles.expDesc}>{item.description}</Text>
                </View>
              ))}
            </View>

            {/* Projects */}
            <Text style={{ ...styles.sectionTitle, color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`, borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}>Projects</Text>
            <View style={styles.list}>
              {data.projects?.map((item: any, i: number) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={{ ...styles.projectTitle, color: `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)` }}>{item.name}</Text>
                  <Text style={styles.projectDesc}>{item.description}</Text>
                  <View style={styles.projectLinks}>
                    {item.github && (
                      <Link style={styles.projectLink} src={item.github}>
                        GitHub
                      </Link>
                    )}
                    {item.live && (
                      <Link style={styles.projectLink} src={item.live}>
                        Live Demo
                      </Link>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.rightCol}>
            {/* Summary */}
            <Text style={{ ...styles.sectionTitle, color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`, borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}>Summary</Text>
            <Text style={{ ...styles.summary }}>{data.summary}</Text>

            {/* Education */}
            <Text style={{ ...styles.sectionTitle, color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`, borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}>Education</Text>
            <View style={styles.list}>
              {data.education?.map((item: any, i: number) => (
                <View key={i} style={styles.listItem}>
                  <Text style={{ ...styles.bullet }}>•</Text>
                  <Text style={{ color: '#1f2937' }}>{item.degree}</Text>
                </View>
              ))}
            </View>

            {/* Languages */}
            <Text style={{ ...styles.sectionTitle, color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`, borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}>Languages</Text>
            <View style={styles.list}>
              {data.languages?.map((item: string, i: number) => (
                <View key={i} style={styles.listItem}>
                  <Text style={{ ...styles.bullet }}>•</Text>
                  <Text style={{ color: 'black' }}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Certifications */}
            <Text style={{ ...styles.sectionTitle, color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`, borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}>Certifications</Text>
            <View style={styles.list}>
              {data.certifications?.map((item: string, i: number) => (
                <View key={i} style={styles.listItem}>
                  <Text style={{ ...styles.bullet, color: 'black' }}>•</Text>
                  <Text style={{ color: 'black' }}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Tech Stack */}
            <Text style={{ ...styles.sectionTitle, color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`, borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)` }}>Tech Stack</Text>
            <View style={styles.techStack}>
              {data.skills?.map((item: string, i: number) => (
                <Text key={i} style={{ ...styles.techItem, backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)` }}>{item}</Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
