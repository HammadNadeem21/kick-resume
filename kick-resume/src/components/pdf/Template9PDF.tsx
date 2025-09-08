import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";
import type { PageProps } from "@react-pdf/renderer";

const PRIMARY_BLUE = "#004aad";
const LIGHT_BLUE_BG = "#eef3f7"; // Approximate light blue from image
const DARK_TEXT = "#222";
const GRAY_TEXT = "#555";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontSize: 12,
    fontFamily: "Helvetica",
    color: DARK_TEXT,
    padding: 30, // Global padding
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    // backgroundColor: LIGHT_BLUE_BG, // Header background color
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  imageContainer: {
    width: 130,
    height: 130,
    borderRadius: 75,
    overflow: "hidden",
    marginRight: 20,
    backgroundColor: "#eee",
  },
  headerContent: {
    flexGrow: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: PRIMARY_BLUE,
    marginBottom: 2,
  },
  role: {
    fontSize: 18,
    fontWeight: "bold",
    color: PRIMARY_BLUE,
    marginBottom: 10,
  },
  contactGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderTopColor: PRIMARY_BLUE,
    marginTop: 5,
    paddingTop: 5,
  },
  contactItem: {
    paddingLeft: 5,
    paddingRight: 5,
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    textAlign: "center",
    width: 100,
  },
  contactText: {
    fontSize: 9,
    color: DARK_TEXT,
    textAlign: "center",
  },
  verticalDivider: {
    width: 2,
    backgroundColor: PRIMARY_BLUE,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: PRIMARY_BLUE,
    textTransform: "uppercase",
    marginRight: 10,
  },
  sectionTitleDivider: {
    flexGrow: 1,
    height: 2,
    backgroundColor: PRIMARY_BLUE,
  },
  summaryText: {
    fontSize: 11,
    color: DARK_TEXT,
    lineHeight: 1.4,
    fontStyle: "italic",
  },
  list: {
    // Re-added for education and general lists
    marginBottom: 10,
    paddingLeft: 12, // Indent for bullets
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 3,
    fontSize: 11,
    marginBottom: 4,
  },
  bullet: {
    color: DARK_TEXT,
    marginRight: 6,
    fontSize: 11,
    marginTop: -1,
  },
  expBlock: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  expTitleCompany: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  expTitle: {
    fontWeight: "bold",
    fontSize: 12,
    color: DARK_TEXT,
    marginRight: 5,
  },
  expCompany: {
    fontSize: 11,
    color: DARK_TEXT,
  },
  expDates: {
    fontSize: 9,
    color: GRAY_TEXT,
  },
  expDesc: {
    fontSize: 10,
    color: DARK_TEXT,
    marginLeft: 12,
    lineHeight: 1.3,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  skillItem: {
    width: "33%", // 3 columns
    marginBottom: 5,
  },
  certGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  certItem: {
    width: "100%", // 2 columns
    marginBottom: 5,
  },
  projectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 5,
  },
  projectBlock: {
    width: "48%", // Two columns with some gap
    marginBottom: 15,
  },
  projectName: {
    fontWeight: "bold",
    fontSize: 12,
    color: DARK_TEXT,
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 10,
    color: DARK_TEXT,
    lineHeight: 1.3,
    marginBottom: 5,
  },
  projectLinks: {
    flexDirection: "row",
    gap: 20,
  },
  projectLink: {
    fontSize: 10,
    color: PRIMARY_BLUE,
    textDecoration: "underline",
  },
});

export default function Template9PDF({
  data,
  imageUrl,
  imageBgColor,
  size,
}: {
  data: any;
  imageUrl?: string;
  imageBgColor?: string;
  size: PageProps["size"];
}) {
  return (
    <Document>
      <Page size={size} style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View
            style={{
              ...styles.imageContainer,
              backgroundColor:
                imageBgColor || styles.imageContainer.backgroundColor,
            }}
          >
            {imageUrl ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image
                src={imageUrl}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#eee",
                }}
              />
            )}
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.role}>{data.role}</Text>
            <View style={styles.contactGrid}>
              <View
                style={{
                  ...styles.contactItem,
                  flexShrink: 1,
                  flexGrow: 1,
                  minWidth: 0,
                }}
              >
                <Text style={{ ...styles.contactText, flexWrap: "wrap" }}>
                  {data.email !== "" ? data.email : "Email"}
                </Text>
              </View>
              <View style={styles.verticalDivider} />
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>
                  {data.phone && data.phone !== 0 ? `+${data.phone}` : "Phone"}
                </Text>
              </View>
              <View style={styles.verticalDivider} />
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>
                  {data.address !== "" ? data.address : "Address"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Profile Summary */}
        {data.summary && (
          <>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitleText}>PROFILE SUMMARY</Text>
              <View style={styles.sectionTitleDivider} />
            </View>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitleText}>EDUCATION</Text>
              <View style={styles.sectionTitleDivider} />
            </View>
            <View style={styles.list}>
              {data.education.map((item: any, i: number) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>{item.degree}</Text>
                  {item.startDate && item.endDate && (
                    <Text
                      style={{
                        fontSize: 9,
                        color: GRAY_TEXT,
                        marginLeft: "auto",
                      }}
                    >
                      ({item.startDate} - {item.endDate})
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </>
        )}

        {/* Work Experience */}
        {data.experience?.length > 0 && (
          <>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitleText}>WORK EXPERIENCE</Text>
              <View style={styles.sectionTitleDivider} />
            </View>
            <View>
              {data.experience.map((item: any, i: number) => (
                <View key={i} style={styles.expBlock}>
                  <View style={styles.expHeader}>
                    <View style={styles.expTitleCompany}>
                      <Text style={styles.expTitle}>{item.title}</Text>
                      <Text style={styles.expCompany}>
                        | {item.companyName}
                      </Text>
                    </View>
                    <Text style={styles.expDates}>
                      ({item.startDate} - {item.endDate})
                    </Text>
                  </View>
                  {item.description && (
                    <View style={styles.listItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.expDesc}>{item.description}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </>
        )}

        {/* Professional Skill & Certifications */}
        {(data.skills?.length > 0 || data.certifications?.length > 0) && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            {/* Professional Skill */}
            {data.skills?.length > 0 && (
              <View style={{ width: "50%" }}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitleText}>
                    PROFESSIONAL SKILL
                  </Text>
                  <View style={styles.sectionTitleDivider} />
                </View>
                <View style={styles.skillsGrid}>
                  {data.skills.map((item: string, i: number) => (
                    <View key={i} style={styles.skillItem}>
                      <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text>{item}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Certifications */}
            {data.certifications?.length > 0 && (
              <View style={{ width: "50%", paddingLeft: 10 }}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitleText}>CERTIFICATIONS</Text>
                  <View style={styles.sectionTitleDivider} />
                </View>
                <View style={styles.certGrid}>
                  {data.certifications.map((item: string, i: number) => (
                    <View key={i} style={styles.certItem}>
                      <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text>{item}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitleText}>PROJECTS</Text>
              <View style={styles.sectionTitleDivider} />
            </View>
            <View style={styles.projectGrid}>
              {data.projects.map((item: any, i: number) => (
                <View key={i} style={styles.projectBlock}>
                  <View style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.projectName}>{item.name}</Text>
                  </View>
                  <Text style={styles.projectDesc}>{item.description}</Text>
                  {(item.github || item.live) && (
                    <View style={styles.projectLinks}>
                      {item.github && (
                        <Link src={item.github} style={styles.projectLink}>
                          GitHub
                        </Link>
                      )}
                      {item.live && (
                        <Link src={item.live} style={styles.projectLink}>
                          live demo
                        </Link>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </Page>
    </Document>
  );
}
