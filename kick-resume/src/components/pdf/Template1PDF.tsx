import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";


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
    marginTop: 0,
  },
  bullet: {
    fontSize: 14,
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
});

function getBulletChar(color: string = "white") {
  // Try bullet, fallback to dash if not rendered
  // You can also try '\u2022' or '\u25CF' or '*'
  // If you want to guarantee a visible bullet, use '-'
  // If you want to try the bullet, use '\u2022'
  // If you want to use asterisk, use '*'
  // You can also try '\u25AA' (small square)
  // Here, we use dash for maximum compatibility
  return "•";
}

export default function Template1PDF({ data }: { data: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Side */}
        <View style={styles.left}>
          <Text style={styles.name}>{data.fullName}</Text>
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
          <Text style={styles.position}>{data.position}</Text>
          <View style={styles.section}>
            <Text style={styles.heading}>Contact</Text>
            <Text style={styles.contact}>Phone: {data.phone}</Text>
            <Text style={styles.contact}>Email: {data.email}</Text>
            <Text style={styles.contact}>LinkedIn: {data.linkdinUrl}</Text>
            <Text style={styles.contact}>Address: {data.address}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.heading}>Summary</Text>
            <Text>{data.summary}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.heading}>Experience</Text>
            {data.experience?.map((item: any, i: number) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bulletRight}>{getBulletChar("#193042")}</Text>
                <Text>
                  {item.title} 
                </Text>
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
                <Text>{item.description}</Text>
                {/* <Text>GitHub: {item.github}</Text> */}
                {/* <Text>Live: {item.live}</Text> */}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
