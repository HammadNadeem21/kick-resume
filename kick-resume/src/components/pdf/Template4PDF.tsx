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
import moment from "moment";
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#222",
    padding: 0,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#f96b07",
    padding: 14,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    width: "75%",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  role: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    color: "#fff",
    fontSize: 11,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  address: {
    color: "#fff",
    fontSize: 11,
    marginBottom: 2,
  },
  headerRight: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginRight: 4,
    // backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  sectionGrid: {
    flexDirection: "row",
    padding: 24,
    gap: 0,
  },
  leftCol: {
    width: "60%",
    paddingRight: 4,
  },
  rightCol: {
    width: "40%",
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
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
    flexDirection: "row",
    alignItems: "flex-start",
    fontSize: 10,
    marginBottom: 2,
    color: "#1f2937",
    marginLeft: 10,
  },
  bullet: {
    color: "#1f2937",
    marginRight: 6,
    fontSize: 12,
  },
  expTitle: {
    fontWeight: "bold",
    // color: '#f5b35d',
    fontSize: 10,
  },
  expCompany: {
    fontWeight: "400",
    color: "#888",
    fontSize: 9,
    marginTop: 2,
    marginBottom: 2,
  },
  expDate: {
    fontSize: 8,
    color: "#000",
    marginTop: 4,
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 10,
    color: "#1f2937",
    marginBottom: 4,
  },
  projectTitle: {
    fontWeight: "bold",
    // color: '#f5b35d',
    fontSize: 10,
  },
  projectDesc: {
    fontSize: 11,
    color: "#444",
    marginBottom: 2,
  },
  projectLinks: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 4,
  },
  projectLink: {
    fontSize: 10,
    color: "#1f2937",
    textDecoration: "none",
    marginRight: 12,
    marginTop: 4,
  },
  techStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 6,
    marginBottom: 10,
  },
  techItem: {
    // backgroundColor: '#f5b35d',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 11,
    marginRight: 4,
    // marginBottom: 2,
    color: "#fff",
  },
  summary: {
    fontSize: 11,
    color: "#222",
    marginBottom: 10,
    marginTop: 4,
    letterSpacing: 0.2,
    lineHeight: 1.2,
  },
});

export default function Template4PDF({
  data,
  imageUrl,
  imageBgColor,
  color,
  size,
}: {
  data: any;
  imageUrl: string;
  imageBgColor?: string;
  color: any;
  size: PageProps["size"];
}) {
  return (
    <Document>
      <Page size={size} style={styles.page}>
        {/* Header */}
        <View
          style={{
            ...styles.header,
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
          }}
        >
          <View style={styles.headerLeft}>
            <Text style={{ ...styles.name }}>{data.name}</Text>
            <Text style={{ ...styles.role }}>{data.role}</Text>

            {data.personalInformation &&
              data.personalInformation.length > 0 && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    gap: 8,
                    width: "100%",
                  }}
                >
                  {data.personalInformation.map((item: any, i: number) => (
                    <View
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        width: item.title.toLowerCase().includes("address")
                          ? "100%"
                          : "48%",
                        color: "#fff",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "600",
                          textTransform: "capitalize",
                          marginRight: 4,
                        }}
                      >
                        {item.title}:
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "400",
                          flex: 1,
                        }}
                      >
                        {item.value}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
          </View>
          <View
            style={{
              ...styles.headerRight,
              backgroundColor: imageBgColor || styles.headerRight.alignItems,
            }}
          >
            {imageUrl ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image
                src={imageUrl}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 75,
                  objectFit: "cover",
                }}
              />
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: "#eee",
                }}
              />
            )}
          </View>
        </View>

        {/* Main Grid */}
        <View style={{ ...styles.sectionGrid }}>
          {/* Left Column */}
          <View style={styles.leftCol}>
            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <View>
                <Text
                  style={{
                    ...styles.sectionTitle,
                    color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                    borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                  }}
                >
                  Experience
                </Text>
                <View style={styles.list}>
                  {data.experience?.map((item: any, i: number) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          gap: 6,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.expTitle,
                            color: `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`,
                          }}
                        >
                          •
                        </Text>

                        <Text
                          style={{
                            ...styles.expTitle,
                            color: `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`,
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                      {item.companyName && (
                        <Text style={styles.expCompany}>
                          {item.companyName}
                        </Text>
                      )}
                      <Text style={styles.expDate}>
                        {`( ${moment(item.startDate).format("MMM YYYY")} - ${
                          item.endDate === "Currently Working"
                            ? "Currently Working"
                            : moment(item.endDate).isValid()
                            ? moment(item.endDate).format("MMM YYYY")
                            : ""
                        } )`}
                      </Text>
                      <Text style={styles.expDesc}>{item.description}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <View>
                <Text
                  style={{
                    ...styles.sectionTitle,
                    color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                    borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                  }}
                >
                  Projects
                </Text>
                <View style={styles.list}>
                  {data.projects?.map((item: any, i: number) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          gap: 6,
                        }}
                      >
                        <Text
                          style={{
                            ...styles.projectTitle,
                            color: `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`,
                          }}
                        >
                          •
                        </Text>
                        <Text
                          style={{
                            ...styles.projectTitle,
                            color: `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <Text style={styles.expDesc}>{item.description}</Text>
                      <View style={styles.projectLinks}>
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

            {/* Custom-Section */}
            {data.customSection2 && data.customSection2.length > 0 && (
              <View>
                {data.customSection2.map((item: any, index: number) => (
                  <View key={index}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        textTransform: "capitalize",
                        color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                        borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                      }}
                    >
                      {item.title}
                    </Text>
                    <View style={styles.list}>
                      {item.value.map((item: string, i: number) => (
                        <View key={i} style={styles.listItem}>
                          <Text style={{ ...styles.bullet, color: "black" }}>
                            •
                          </Text>
                          <Text
                            style={{
                              color: "#1f2937",
                              textTransform: "capitalize",
                            }}
                          >
                            {item}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightCol}>
            {/* Summary */}
            <Text
              style={{
                ...styles.sectionTitle,
                color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
              }}
            >
              Summary
            </Text>
            <Text style={{ ...styles.summary }}>{data.summary}</Text>

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <View>
                <Text
                  style={{
                    ...styles.sectionTitle,
                    color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                    borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                  }}
                >
                  Education
                </Text>
                <View style={styles.list}>
                  {data.education?.map((item: any, i: number) => (
                    <View key={i} style={styles.listItem}>
                      <Text style={{ ...styles.bullet }}>•</Text>
                      <Text style={{ color: "#1f2937" }}>{item.degree}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <View>
                <Text
                  style={{
                    ...styles.sectionTitle,
                    color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                    borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                  }}
                >
                  Languages
                </Text>
                <View style={styles.list}>
                  {data.languages?.map((item: string, i: number) => (
                    <View key={i} style={styles.listItem}>
                      <Text style={{ ...styles.bullet }}>•</Text>
                      <Text style={{ color: "#1f2937" }}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <View>
                <Text
                  style={{
                    ...styles.sectionTitle,
                    color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                    borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                  }}
                >
                  Certifications
                </Text>
                <View style={styles.list}>
                  {data.certifications?.map((item: string, i: number) => (
                    <View key={i} style={styles.listItem}>
                      <Text style={{ ...styles.bullet, color: "black" }}>
                        •
                      </Text>
                      <Text style={{ color: "#1f2937" }}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Tech Stack */}
            {data.skills && data.skills.length > 0 && (
              <View>
                <Text
                  style={{
                    ...styles.sectionTitle,
                    color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                    borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                  }}
                >
                  Tech Stack
                </Text>
                <View style={styles.techStack}>
                  {data.skills?.map((item: string, i: number) => (
                    <Text
                      key={i}
                      style={{
                        ...styles.techItem,
                        backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`,
                      }}
                    >
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Custom-Section */}
            {data.customSection && data.customSection.length > 0 && (
              <View>
                {data.customSection.map((item: any, index: number) => (
                  <View key={index}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        textTransform: "capitalize",
                        color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                        borderBottomColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                      }}
                    >
                      {item.title}
                    </Text>
                    <View style={styles.list}>
                      {item.value.map((item: string, i: number) => (
                        <View key={i} style={styles.listItem}>
                          <Text style={{ ...styles.bullet, color: "black" }}>
                            •
                          </Text>
                          <Text
                            style={{
                              color: "#1f2937",
                              textTransform: "capitalize",
                            }}
                          >
                            {item}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
