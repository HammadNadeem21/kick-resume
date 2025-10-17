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
    backgroundColor: "#fff",
    fontSize: 12,
    fontFamily: "Helvetica",
    paddingHorizontal: 28,
    paddingVertical: 28,
    color: "#000", // Default text color
  },
  // Header Section
  headerContainer: {
    marginBottom: 20,
    width: "100%", // Matches Tailwind w-[70%]
  },
  fullName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  position: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a4a4a", // gray-700
    marginBottom: 10,
    marginTop: 8,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 11,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  contactIcon: {
    fontSize: 10,
    marginRight: 2,
  },
  // Main Divider
  mainDivider: {
    borderBottomWidth: 2,
    borderBottomColor: "#a0aec0", // gray-400
    marginVertical: 10,
  },
  // Grid Layout
  gridContainer: {
    flexDirection: "row",
  },
  leftColumn: {
    width: "65%",
    paddingRight: 10,
  },
  rightColumn: {
    width: "35%",
    paddingLeft: 10,
  },
  // Section Titles
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937", // gray-800
    marginBottom: 8,
  },
  sectionTitleSmall: {
    fontSize: 11,
    fontWeight: "700",
    color: "#000", // gray-800
    marginBottom: 8,
  },
  // Summary
  summaryText: {
    fontSize: 11,
    color: "#000",
    lineHeight: 1.4,
  },
  // List Items (Education, Skills, Languages, Certifications)
  list: {
    marginBottom: 15,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
    fontSize: 10,
    color: "#000",
    marginTop: 4,
    marginLeft: 8,
  },
  bullet: {
    marginRight: 6,
    fontSize: 10,
    marginTop: 0,
  },
  educationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    alignItems: "flex-start",
  },
  educationDegree: {
    fontSize: 10,
  },
  educationYear: {
    fontSize: 10,
    color: "#718096",
  },
  // Experience
  experienceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000",
  },
  experienceDate: {
    fontSize: 10,
    color: "#000",
  },
  // Projects
  projectItem: {
    // marginBottom: 15,
    marginTop: 17,
  },
  projectTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 11,
    marginBottom: 3,
    marginTop: 2,
  },
  projectLinkContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  projectLink: {
    fontSize: 10,
    fontWeight: "600",
    color: "#000",
    textDecoration: "none",
    marginRight: 20,
  },
});

export default function Template3PDF({
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
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.fullName}>{data.name}</Text>
          <Text style={styles.position}>{data.role}</Text>

          {data.personalInformation && data.personalInformation.length > 0 && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
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
                    justifyContent: "flex-start",
                    gap: 2,
                    width: "50%",
                    marginTop: 6,
                    color: "#374151",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.title}:{" "}
                  </Text>
                  <Text
                    style={{ fontSize: 10, fontWeight: "400", width: "80%" }}
                  >
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          )}
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
            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <View>
                <View style={styles.mainDivider} /> {/* Internal Divider */}
                <Text style={styles.sectionTitle}>Experience</Text>
                <View style={styles.list}>
                  {data.experience?.map((item: any, i: number) => (
                    <View
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 10,
                      }}
                    >
                      <View style={styles.experienceItem}>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 12,
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.experienceTitle}>
                              {item.companyName}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: "500",
                              color: "#000",
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>
                        {/* <Text style={styles.experienceDate}>
                      ({item.startDate} - {item.endDate})
                    </Text> */}
                      </View>
                      <Text style={styles.projectDescription}>
                        {item.description}
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        {item.startDate && item.endDate && (
                          <Text
                            style={{
                              marginLeft: 4,
                              // fontStyle: "italic",
                              fontSize: 9,
                              marginTop: 4,
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
            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <View>
                <View style={styles.mainDivider} /> {/* Internal Divider */}
                <Text style={styles.sectionTitle}>Projects</Text>
                <View style={styles.list}>
                  {data.projects?.map((item: any, i: number) => (
                    <View key={i} style={styles.projectItem}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          gap: 7,
                        }}
                      >
                        <Text style={styles.projectTitle}>•</Text>
                        <Text style={styles.projectTitle}>{item.name}</Text>
                      </View>
                      <Text style={styles.projectDescription}>
                        {item.description}
                      </Text>
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
            )}

            {/* Custom-Section */}
            {data.customSection2 && data.customSection2.length > 0 && (
              <View>
                {data.customSection2.map((item: any, i: number) => (
                  <View key={i}>
                    <View style={styles.mainDivider} />
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        textTransform: "capitalize",
                      }}
                    >
                      {item.title}
                    </Text>
                    {item.value.map((item: any, i: number) => (
                      <View
                        key={i}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          gap: 4,
                          marginLeft: 6,
                          fontSize: 12,
                          fontWeight: "400",
                        }}
                      >
                        <Text>•</Text>
                        <Text style={{}}>{item}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column (Education, Skills, Languages, Certifications) */}
          <View style={styles.rightColumn}>
            {/* Education */}
            {data.education && data.education.length > 0 && (
              <View>
                <Text style={styles.sectionTitleSmall}>Education</Text>
                <View style={styles.list}>
                  {data.education?.map((item: any, i: number) => (
                    <View key={i} style={styles.educationItem}>
                      <View style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.educationDegree}>
                          {item.degree}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <View>
                <View style={styles.mainDivider} /> {/* Internal Divider */}
                <Text style={styles.sectionTitleSmall}>Skills</Text>
                <View style={styles.list}>
                  {data.skills?.map((item: string, i: number) => (
                    <View key={i} style={styles.listItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {/* Languages */}
            {data.language && data.language.length > 0 && (
              <View>
                <View style={styles.mainDivider} /> {/* Internal Divider */}
                <Text style={styles.sectionTitleSmall}>Languages</Text>
                <View style={styles.list}>
                  {data.languages?.map((item: string, i: number) => (
                    <View key={i} style={styles.listItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <View>
                <View style={styles.mainDivider} /> {/* Internal Divider */}
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
            )}

            {/* custom section */}
            {data.customSection && data.customSection.length > 0 && (
              <View>
                {data.customSection.map((item: any, i: number) => (
                  <View key={i}>
                    <View style={styles.mainDivider} />

                    <Text
                      style={{
                        ...styles.sectionTitleSmall,
                        textTransform: "capitalize",
                      }}
                    >
                      {item.title}
                    </Text>
                    <View style={styles.list}>
                      {item.value.map((item: string, i: number) => (
                        <View key={i} style={styles.listItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={{ textTransform: "capitalize" }}>
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
