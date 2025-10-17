import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { PageProps } from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#eef5ff",
    fontSize: 12,
    fontFamily: "Helvetica",
    padding: 16,
    color: "#374151", // Default text color
  },
  headerDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#9ca3af",
    // marginBottom: 10,
    marginTop: 10,
  },
  topDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#9ca3af",
    marginBottom: 10,
    // marginTop: 4,
  },
  fullName: {
    fontSize: 34,
    color: "#374151",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  position: {
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: "row",
    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
  },
  leftColumn: {
    width: "35%",
    borderRightWidth: 1,
    borderRightColor: "#9ca3af",
    // padding: 10,
    paddingTop: 15,
  },
  rightColumn: {
    width: "65%",
    // padding: 10,
    paddingTop: 15,
    // paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
    // color: "#222",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    marginTop: 3,
  },
  contactText: {
    marginLeft: 5,
  },
  summaryText: {
    marginBottom: 10,
    marginTop: 4,
    fontSize: 11,
    lineHeight: 1.4,
    letterSpacing: 0.2,
    fontWeight: "300",
  },
  list: {
    marginBottom: 8,
    marginLeft: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  bullet: {
    fontSize: 14,
    marginRight: 6,
    marginTop: 1,
  },
  bulletRight: {
    fontSize: 14,
    color: "#193042",
    marginRight: 6,
    marginTop: 0,
    width: 14,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 1.2,
  },
  educationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    alignItems: "flex-start",
  },
  educationDegree: {
    fontSize: 12,
  },
  educationYear: {
    fontSize: 8,
    color: "#666",
  },
  experienceItem: {
    flexDirection: "column",
    alignItems: "flex-start",
    // gap: 4,
    marginBottom: 4,
    marginLeft: 0,
    marginTop: 4,
  },
  experienceTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  experienceDate: {
    fontSize: 10,
    color: "#666",
  },
  projectItem: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 10,
    lineHeight: 1.4,
    letterSpacing: 0.2,
  },
  projectLink: {
    fontSize: 11,
    color: "#666",
    textDecoration: "none",
    marginRight: 15,
  },
  projectLinksContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  rightdivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    marginBottom: 4,
    // marginTop: 4,
    // marginVertical: 6,
  },
  section: {
    marginBottom: 16,
    marginTop: 16,
  },
  ExperienceItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
    marginLeft: 0,
    marginTop: 2,
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 1.5,
    color: "#374151",
  },
});

function getBulletChar(color: string = "white") {
  return "•";
}

export default function Template2PDF({
  data,
  size,
}: {
  data: any;
  size: PageProps["size"];
}) {
  if (!data) return null;

  return (
    <Document>
      <Page size={size} style={styles.page}>
        <View style={styles.topDivider} />
        <Text style={styles.fullName}>{data.name}</Text>
        <Text style={styles.position}>{data.role}</Text>
        <View style={styles.headerDivider} />

        <View style={styles.gridContainer}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {data.personalInformation &&
              data.personalInformation.length > 0 && (
                <View>
                  <Text style={styles.sectionTitle}>Contact</Text>
                  {data.personalInformation.map((item: any, i: number) => (
                    <View key={i} style={styles.contactItem}>
                      <Text
                        style={{
                          ...styles.contactText,
                          fontWeight: "bold",
                          fontSize: 10,
                          textTransform: "capitalize",
                        }}
                      >
                        {item.title}:{" "}
                      </Text>
                      <Text
                        style={{
                          ...styles.contactText,
                          fontWeight: "normal",
                          fontSize: 10,
                        }}
                      >
                        {item.value}
                      </Text>
                    </View>
                  ))}
                  {/* <View style={{ marginBottom: 15 }}>
            
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>Email: {data.email}</Text>
              </View>
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>Address: {data.address}</Text>
              </View>
            </View> */}
                </View>
              )}

            {data.education && data.education.length > 0 && (
              <View>
                <View style={styles.headerDivider} />
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Text style={styles.sectionTitle}>Education</Text>
                  <View style={styles.list}>
                    {data.education?.map((item: any, i: number) => (
                      <View key={i} style={styles.educationItem}>
                        <View style={{ ...styles.listItem, width: "70%" }}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.educationDegree}>
                            {item.degree}
                          </Text>
                        </View>
                        {/* <Text style={styles.educationYear}>
                        ({item.startYear} - {item.endYear})
                      </Text> */}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {data.skills && data.skills.length > 0 && (
              <View>
                <View style={styles.headerDivider} />

                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Text style={styles.sectionTitle}>Skills</Text>
                  <View style={styles.list}>
                    {data.skills?.map((item: string, i: number) => (
                      <View
                        key={i}
                        style={{ ...styles.listItem, width: "70%" }}
                      >
                        <Text style={styles.bullet}>•</Text>
                        <Text>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {data.languages && data.languages.length > 0 && (
              <View>
                <View style={styles.headerDivider} />

                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Text style={styles.sectionTitle}>Languages</Text>
                  <View style={styles.list}>
                    {data.languages?.map((item: string, i: number) => (
                      <View
                        key={i}
                        style={{ ...styles.listItem, width: "70%" }}
                      >
                        <Text style={styles.bullet}>•</Text>
                        <Text>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {data.certifications && data.certifications.length > 0 && (
              <View>
                <View style={styles.headerDivider} />

                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Text style={styles.sectionTitle}>Certifications</Text>
                  <View style={styles.list}>
                    {data.certifications?.map((item: string, i: number) => (
                      <View
                        key={i}
                        style={{ ...styles.listItem, width: "70%" }}
                      >
                        <Text style={styles.bullet}>•</Text>
                        <Text>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {data.customSection && data.customSection.length > 0 && (
              <View>
                {data.customSection?.map((item: any, i: number) => (
                  <View key={i}>
                    <View style={styles.headerDivider} />

                    <View
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <Text style={styles.sectionTitle}>{item.title}</Text>
                      <View style={styles.list}>
                        {item.value.map((item: any, i: number) => (
                          <View
                            key={i}
                            style={{ ...styles.listItem, width: "70%" }}
                          >
                            <Text style={styles.bullet}>•</Text>
                            <Text style={{ textTransform: "capitalize" }}>
                              {item}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* <View style={styles.headerDivider} /> */}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.sectionTitle}>Profile Summary</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>

            {data.experience && data.experience.length > 0 && (
              <View style={styles.headerDivider} />
            )}

            {data.experience && data.experience.length > 0 && (
              <View style={{ marginLeft: 8, marginTop: 8 }}>
                <Text style={styles.sectionTitle}>Work Experience</Text>
                <View style={styles.list}>
                  {data.experience?.map((item: any, i: number) => (
                    <View key={i} style={styles.experienceItem}>
                      <View style={styles.listItem}>
                        <Text style={styles.bulletRight}>•</Text>
                        <Text style={styles.experienceTitle}>{item.title}</Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 10,
                            lineHeight: 1.4,
                            letterSpacing: 0.2,
                          }}
                        >
                          {item.description}
                        </Text>
                        {item.startDate && item.endDate && (
                          <Text
                            style={{
                              marginLeft: 8,
                              fontStyle: "italic",
                              fontSize: 8,
                            }}
                          >
                            {`(${moment(item.startDate).format("MMM YYYY")} - ${
                              item.endDate === "Currently Working"
                                ? "Currently Working"
                                : moment(item.endDate).isValid()
                                ? moment(item.endDate).format("MMM YYYY")
                                : ""
                            })`}
                          </Text>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data.projects && data.projects.length && (
              <View style={styles.headerDivider} />
            )}

            {data.projects && data.projects.length > 0 && (
              <View style={{ marginLeft: 8, marginTop: 8 }}>
                <Text style={styles.sectionTitle}>Projects</Text>
                <View style={styles.list}>
                  {data.projects?.map((item: any, i: number) => (
                    <View key={i} style={styles.projectItem}>
                      <Text style={styles.projectTitle}>{item.name}</Text>
                      <Text style={styles.projectDescription}>
                        {item.description}
                      </Text>
                      <View
                        style={{ ...styles.projectLinksContainer, fontSize: 8 }}
                      >
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
            )}

            {data.customSection2 && data.customSection2.length > 0 && (
              <View>
                {data.customSection2.map((item: any, i: number) => (
                  <View key={i}>
                    <View style={styles.headerDivider} />

                    <View style={{ marginLeft: 8, marginTop: 8 }}>
                      <Text style={styles.sectionTitle}>Projects</Text>
                      {item.value.map((item: any, i: number) => (
                        <View
                          key={i}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            // gap: 2,
                          }}
                        >
                          <Text style={styles.bulletRight}>•</Text>
                          <Text style={styles.projectDescription}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* <View style={styles.headerDivider} /> */}
          </View>
        </View>
        <View style={styles.headerDivider} />
      </Page>
    </Document>
  );
}
