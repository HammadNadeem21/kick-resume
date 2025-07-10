import { Page, Text, View, Document, StyleSheet, Link } from "@react-pdf/renderer";


const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 12,
    fontFamily: "Helvetica",
    flexDirection: "row",
    backgroundColor: "#f8fafc",
  },
  left: {
    width: "35%",
    backgroundColor: "#193042",
    color: "white",
    padding: 16,
    minHeight: "100%",
  },
  right: {
    width: "65%",
    padding: 16,
    color: "#193042",
    minHeight: "100%",
  },
  heading: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 12,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#385b77",
    marginVertical: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    marginLeft: 0,
    marginTop: 2,
    fontSize: 10,
  },
  ExperienceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    marginLeft: 0,
    marginTop: 2,
    fontSize: 12,
    fontWeight: "bold",


  },
  bullet: {
    fontSize: 10,
    color: 'white',
    marginRight: 6,
    marginTop: 0,
    width: 14,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 1.2,
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
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  position: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#193042",
  },
  contact: {
    fontSize: 10,
    marginBottom: 2,
  },
  projectTitle: {
    fontWeight: "bold",
    fontSize: 12,
  },
  projectLink: {
    fontSize: 11,
    color: '#666',
    textDecoration: 'underline',
    marginRight: 15,
  },
  projectLinksContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
});

function getBulletChar(color: string = "white") {

  return "•";
}

export default function Template1PDF({ data }: { data: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Side */}
        <View style={styles.left}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.heading}>Education</Text>
            {data.education?.map((item: any, i: number) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>{getBulletChar()}</Text>
                <Text>{item.degree}</Text>
              </View>
            ))}
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.heading}>Skills</Text>
            {data.skills?.map((item: any, i: number) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>{getBulletChar()}</Text>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.heading}>Languages</Text>
            {data.languages?.map((item: any, i: number) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>{getBulletChar()}</Text>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.heading}>Certifications</Text>
            {data.certifications?.map((item: any, i: number) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>{getBulletChar()}</Text>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Right Side */}
        <View style={styles.right}>
          <Text style={styles.position}>{data.role}</Text>
          <View style={styles.section}>
            <Text style={styles.heading}>Contact</Text>
            {/* {data.phone && (
              <Text style={styles.contact}>Phone: {data.phone}</Text>
            )} */}
            <Text style={styles.contact}>Phone: {data.phone}</Text>
            {/* {data.email && (
              <Text style={styles.contact}>Email: {data.email}</Text>

            )} */}
            <Text style={styles.contact}>Email: {data.email}</Text>
            {/* <Text style={styles.contact}>LinkedIn: {data.linkdinUrl}</Text> */}
            {/* {data.address && (
              <Text style={styles.contact}>Address: {data.address}</Text>

            )} */}
            <Text style={styles.contact}>Address: {data.address}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.heading}>Summary</Text>
            <Text style={{ lineHeight: 1 }}>{data.summary}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.heading}>Experience</Text>
            {data.experience?.map((item: any, i: number) => (
              <View key={i} style={{ marginBottom: 8, flexDirection: "column" }}>
                <View style={styles.ExperienceItem}>
                  <Text style={styles.bulletRight}>{getBulletChar("#193042")}</Text>
                  <Text>
                    {item.title}
                  </Text>
                </View>

                <Text style={{ lineHeight: 1 }}>{item.description}</Text>
                <Text style={{ marginLeft: 8, fontStyle: "italic" }}>
                  ({item.startDate} - {item.endDate})
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.heading}>Projects</Text>
            {data.projects?.map((item: any, i: number) => (
              <View key={i} style={{ marginBottom: 8, flexDirection: "column" }}>
                <View style={styles.listItem}>
                  <Text style={styles.bulletRight}>{getBulletChar("#193042")}</Text>
                  <Text style={styles.projectTitle}>{item.name}</Text>
                </View>
                <Text style={{ lineHeight: 1 }}>{item.description}</Text>
                {/* <Text>GitHub: {item.github}</Text> */}
                <View style={styles.projectLinksContainer}>
                  <Link style={styles.projectLink} src={item.github}>
                    GitHub
                  </Link>
                  <Link style={styles.projectLink} src={item.live}>
                    Live Demo
                  </Link>
                </View>
                {/* <Text>Live: {item.live}</Text> */}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
